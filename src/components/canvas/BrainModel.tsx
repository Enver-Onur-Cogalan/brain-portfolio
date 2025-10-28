import { shaderMaterial, useGLTF } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useMemo, type JSX } from "react";
import * as THREE from 'three';
import useUI from "../../store/useUI";

// GLSL Shader Kodu 
const vertexShader = `
  uniform float uTime;
  uniform float uAmplitude;
  uniform float uFrequency;
  // ... (içerik aynı kaldığı için kısa kesiyorum)
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    float noise = snoise(position.xy * uFrequency + uTime * 0.2);
    vec3 displacedPosition = position + normal * noise * uAmplitude;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  void main() {
    gl_FragColor = vec4(uColor, 0.4);
  }
`;

const PulsatingMaterial = shaderMaterial(
    { uTime: 0, uAmplitude: 0.01, uFrequency: 2.0, uColor: new THREE.Color(0.4, 0.6, 1.0) },
    vertexShader,
    fragmentShader
);

extend({ PulsatingMaterial });

declare module '@react-three/fiber' {
    interface ThreeElements {
        pulsatingMaterial: JSX.IntrinsicElements['shaderMaterial'] & { uTime?: number; uColor?: THREE.Color; }
    }
}

export function BrainModel() {
    const { scene } = useGLTF('/brain_hologram.glb');
    const { isSceneLoaded, setSceneLoaded } = useUI();

    const pulsatingMaterial = useMemo(() => new PulsatingMaterial(), []);

    // Sahnedeki tüm mesh'lerin materyalini bizim özel materyalimizle değiştiriyoruz
    useMemo(() => {
        scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = pulsatingMaterial;
            }
        });
    }, [scene, pulsatingMaterial]);

    useFrame(({ clock }) => {
        pulsatingMaterial.uTime = clock.getElapsedTime();
    });

    if (!isSceneLoaded) {
        setSceneLoaded(true);
    }

    return <primitive object={scene} />;
}

useGLTF.preload('/brain_hologram.glb');