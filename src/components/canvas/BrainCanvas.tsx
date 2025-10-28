/* eslint-disable prefer-const */
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { BrainModel } from "./BrainModel";
import { Suspense, useRef } from "react";
import useUI from "../../store/useUI";
import * as THREE from 'three';

const CameraAnimator = () => {
    const { currentSection } = useUI();
    const groupRef = useRef<THREE.Group>(null!);

    useFrame((state) => {
        let targetPosition = new THREE.Vector3(0, 0, 5);
        let targetGroupPosition = new THREE.Vector3(-1.5, -1, 0);
        let targetRotation = new THREE.Euler(0, 0, 0);

        if (currentSection === 'about') {
            targetPosition.set(0, 0, 6);
            targetGroupPosition.set(-1.5, -1, 0);
            targetRotation.set(0, Math.PI / 4, 0);
        } else if (currentSection === 'skills') {
            targetPosition.set(0, 0, 6.5);
            targetGroupPosition.set(-1.5, -1, 0);
            targetRotation.set(0.2, -Math.PI / 4, 0.1);
        } else if (currentSection === 'projects') {
            targetPosition.set(0, 0, 6.2);
            targetGroupPosition.set(-1.5, -1.2, 0);
            targetRotation.set(-0.1, Math.PI / 3, -0.1);
        } else if (currentSection === 'contact') {
            targetPosition.set(0, 0, 6.5);
            targetGroupPosition.set(-1.5, -0.8, 0);
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
        <group ref={groupRef} position={[0, -1, 0]}>
            <BrainModel />
        </group>
    );
};

const BrainCanvas = () => {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 35, near: 0.1, far: 1000 }}
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0 }}
        >
            <ambientLight intensity={1.5} />
            <directionalLight position={[3, 2, 5]} intensity={1} />
            <Suspense fallback={null}>
                <CameraAnimator />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
    );
};

export default BrainCanvas;