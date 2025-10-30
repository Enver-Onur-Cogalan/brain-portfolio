/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef } from "react";
import * as THREE from 'three';
import { useFrame } from "@react-three/fiber";
import useUI from "../../store/useUI";

type Mode = 'none' | 'dissolving' | 'gathering';

const COUNT = 2500;
const DISSOLVE_MS = 800;
const GATHER_MS = 800;

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }
function easeInOut(t: number) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

export default function TransitionParticles({ brainRef }: { brainRef: THREE.Group | null }) {
    const { transitionPhase } = useUI();

    const modeRef = useRef<Mode>('none');
    const startTimeRef = useRef(0);
    const durationRef = useRef(1000);

    const positions = useMemo(() => new Float32Array(COUNT * 3), []);
    const starts = useRef<Float32Array>(new Float32Array(COUNT * 3));
    const ends = useRef<Float32Array>(new Float32Array(COUNT * 3));

    const geoRef = useRef<THREE.BufferGeometry>(null);
    const matRef = useRef<THREE.PointsMaterial>(null);
    const tmpVec = useRef(new THREE.Vector3());

    const markNeedsUpdate = () => {
        const g = geoRef.current;
        if (g && g.attributes && g.attributes.position) {
            (g.attributes.position as THREE.BufferAttribute).needsUpdate = true;
        }
    };

    // world center helper
    const getBrainCenter = () => {
        const out = tmpVec.current.set(0, 0, 0);
        if (brainRef) brainRef.getWorldPosition(out);
        return out;
    };

    useEffect(() => {
        const center = getBrainCenter().clone();

        if (transitionPhase === 'dissolving') {
            modeRef.current = 'dissolving';
            startTimeRef.current = performance.now();
            durationRef.current = DISSOLVE_MS;
            if (matRef.current) matRef.current.opacity = 1;

            // start around brain, end downwards
            for (let i = 0; i < COUNT; i++) {
                const si = i * 3;
                // start in small sphere around brain
                const r = 0.6 * Math.cbrt(Math.random());
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                const sx = center.x + r * Math.sin(phi) * Math.cos(theta);
                const sy = center.y + r * Math.cos(phi);
                const sz = center.z + r * Math.sin(phi) * Math.sin(theta);
                starts.current[si] = sx; starts.current[si + 1] = sy; starts.current[si + 2] = sz;

                // end: flow down
                const ex = center.x + (Math.random() - 0.5) * 0.8;
                const ey = center.y - 2.2 - Math.random() * 1.2;
                const ez = center.z + (Math.random() - 0.5) * 0.8;
                ends.current[si] = ex; ends.current[si + 1] = ey; ends.current[si + 2] = ez;

                positions[si] = sx; positions[si + 1] = sy; positions[si + 2] = sz;
            }
            markNeedsUpdate();
        } else if (transitionPhase === 'gathering') {
            modeRef.current = 'gathering';
            startTimeRef.current = performance.now();
            durationRef.current = GATHER_MS;
            if (matRef.current) matRef.current.opacity = 1;

            // start above, end at brain center with small jitter
            for (let i = 0; i < COUNT; i++) {
                const si = i * 3;

                const sx = center.x + (Math.random() - 0.5) * 2.0;
                const sy = center.y + 2.5 + Math.random() * 1.5;
                const sz = center.z + (Math.random() - 0.5) * 2.0;
                starts.current[si] = sx; starts.current[si + 1] = sy; starts.current[si + 2] = sz;

                const ex = center.x + (Math.random() - 0.5) * 0.2;
                const ey = center.y + (Math.random() - 0.5) * 0.2;
                const ez = center.z + (Math.random() - 0.5) * 0.2;
                ends.current[si] = ex; ends.current[si + 1] = ey; ends.current[si + 2] = ez;

                positions[si] = sx; positions[si + 1] = sy; positions[si + 2] = sz;
            }
            markNeedsUpdate();
        } else {
            // idle -> hide
            modeRef.current = 'none';
            if (matRef.current) matRef.current.opacity = 0;
        }
    }, [transitionPhase, brainRef, positions]);

    useFrame(() => {
        if (modeRef.current === 'none') return;

        const now = performance.now();
        const t = Math.min(1, (now - startTimeRef.current) / durationRef.current);
        const f = modeRef.current === 'dissolving' ? easeOutCubic(t) : easeInOut(t);

        // interpolate positions
        for (let i = 0; i < COUNT; i++) {
            const si = i * 3;
            positions[si] = starts.current[si] + (ends.current[si] - starts.current[si]) * f;
            positions[si + 1] = starts.current[si + 1] + (ends.current[si + 1] - starts.current[si + 1]) * f;
            positions[si + 2] = starts.current[si + 2] + (ends.current[si + 2] - starts.current[si + 2]) * f;
        }
        markNeedsUpdate();

        // opaklık eğrisi
        if (matRef.current) {
            if (modeRef.current === 'dissolving') {
                const alpha = 1 - f;
                matRef.current.opacity = THREE.MathUtils.lerp(matRef.current.opacity, alpha, 0.4);
                if (t >= 1) { modeRef.current = 'none'; matRef.current.opacity = 0; }
            } else {
                const fadeStart = 0.85;
                const alpha = t < fadeStart ? 1 : 1 - (t - fadeStart) / (1 - fadeStart);
                matRef.current.opacity = THREE.MathUtils.lerp(matRef.current.opacity, alpha, 0.4);
                if (t >= 1) { modeRef.current = 'none'; matRef.current.opacity = 0; }
            }
        }
    });

    return (
        <points renderOrder={10}>
            <bufferGeometry ref={geoRef}>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                    usage={THREE.DynamicDrawUsage}
                />
            </bufferGeometry>
            <pointsMaterial
                ref={matRef}
                color={new THREE.Color(0.65, 0.85, 1.0)}
                size={0.02}
                sizeAttenuation
                transparent
                opacity={0}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}