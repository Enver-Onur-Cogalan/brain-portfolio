/* eslint-disable prefer-const */
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { BrainModel } from "./BrainModel";
import { Suspense, useEffect, useRef, useState } from "react";
import useUI from "../../store/useUI";
import * as THREE from 'three';
import { PostProcessing } from "./PostProcessing";

const CameraAnimator = () => {
    const { currentSection } = useUI();
    const groupRef = useRef<THREE.Group>(null!);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useFrame((state) => {
        // Mobile için farklı değerler
        const cameraDistance = isMobile ? 7 : 5;
        const groupOffset = isMobile ? -2 : -1.5;

        let targetPosition = new THREE.Vector3(0, 0, cameraDistance);
        let targetGroupPosition = new THREE.Vector3(groupOffset, -1, 0);
        let targetRotation = new THREE.Euler(0, 0, 0);

        if (currentSection === 'about') {
            targetPosition.set(0, 0, cameraDistance + 1);
            targetGroupPosition.set(groupOffset, -1, 0);
            targetRotation.set(0, Math.PI / 4, 0);
        } else if (currentSection === 'skills') {
            targetPosition.set(0, 0, cameraDistance + 1.5);
            targetGroupPosition.set(groupOffset, -1, 0);
            targetRotation.set(0.2, -Math.PI / 4, 0.1);
        } else if (currentSection === 'projects') {
            targetPosition.set(0, 0, cameraDistance + 1.2);
            targetGroupPosition.set(groupOffset, -1.2, 0);
            targetRotation.set(-0.1, Math.PI / 3, -0.1);
        } else if (currentSection === 'contact') {
            targetPosition.set(0, 0, cameraDistance + 1.5);
            targetGroupPosition.set(groupOffset, -0.8, 0);
            targetRotation.set(0.1, -Math.PI / 2, 0);
        }

        const targetQuaternion = new THREE.Quaternion().setFromEuler(targetRotation);
        state.camera.position.lerp(targetPosition, 0.05);
        if (groupRef.current) {
            groupRef.current.position.lerp(targetGroupPosition, 0.05);
            groupRef.current.quaternion.slerp(targetQuaternion, 0.05);
        }
        state.camera.lookAt(0, -1, 0);
    });

    return (
        <>
            <group ref={groupRef} position={[0, -1, 0]}>
                <BrainModel />
            </group>
            <PostProcessing />
        </>
    );
};

const BrainCanvas = () => {
    const [fov, setFov] = useState(35);
    const [pixedRatio, setPixedRatio] = useState(1);

    useEffect(() => {
        const updateCanvasSettings = () => {
            const width = window.innerWidth;
            // Mobile için daha geniş fov
            setFov(width < 768 ? 50 : 35);
            // Mobile için pixel ratio
            setPixedRatio(Math.min(window.devicePixelRatio, width < 768 ? 1.5 : 2));
        };

        updateCanvasSettings();
        window.addEventListener('resize', updateCanvasSettings);
        return () => window.removeEventListener('resize', updateCanvasSettings);
    }, []);

    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov, near: 0.1, far: 1000 }}
            dpr={pixedRatio}
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0 }}
        >
            <ambientLight intensity={1.5} />
            <directionalLight position={[3, 2, 5]} intensity={1} />
            <Suspense fallback={null}>
                <CameraAnimator />
            </Suspense>
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableDamping={true}
                dampingFactor={0.05}
                touches={{
                    ONE: THREE.TOUCH.ROTATE,
                    TWO: THREE.TOUCH.DOLLY_PAN
                }}
            />
        </Canvas>
    );
};

export default BrainCanvas;