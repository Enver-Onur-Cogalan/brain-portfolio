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
        let targetPosition = new THREE.Vector3(0, 0, 5); // Default Hero
        let targetGroupPosition = new THREE.Vector3(0, -1, 0); // Default Hero

        let targetRotation = new THREE.Euler(0, 0, 0);

        if (currentSection === 'about') {
            targetPosition = new THREE.Vector3(0, 0, 6);
            targetGroupPosition = new THREE.Vector3(-1.5, -1, 0);

            targetRotation.set(0, Math.PI / 4, 0);
        } else if (currentSection === 'skills') {
            targetPosition = new THREE.Vector3(0, 0, 6);
            targetGroupPosition = new THREE.Vector3(1.5, -1, 0);

            targetRotation.set(0, -Math / 4, 0);
        }
        // Diğer bölümler içinde gelicek

        // Eular açısını Quaternion'a çevir
        const targetQuaternion = new THREE.Quaternion().setFromEuler(targetRotation);

        // Kameranın pozisyonunu hedefle (lerp)
        state.camera.position.lerp(targetPosition, 0.05);

        // Beynin modelini hedefe doğru haraket ettir
        groupRef.current.position.lerp(targetGroupPosition, 0.05);

        // Beynin modelini rotasyonunu hedefe doğru çevir
        groupRef.current.quaternion.slerp(targetQuaternion, 0.05);

        // Kameranın her zaman beynin merkezine bakmasını sağla
        state.camera.lookAt(0, -1, 0);
    });

    return (
        <group ref={groupRef}>
            <BrainModel />
        </group>
    );
};

const BrainCanvas = () => {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 35, near: 0.1, far: 1000 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                zIndex: -1,
            }}
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