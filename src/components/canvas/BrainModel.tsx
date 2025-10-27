import { useGLTF } from "@react-three/drei";
import type { JSX } from "react";
import * as THREE from 'three';

type GLTFResult = {
    nodes: {
        Icosphere001_Particle_1_0: THREE.Mesh;
        Icosphere001_Particle_1_0_1: THREE.Mesh;
        Icosphere001_Particle_1_0_2: THREE.Mesh;
        Icosphere001_Particle_2_0: THREE.Mesh;
        Icosphere001_Particle_2_0_1: THREE.Mesh;
        Icosphere001_Particle_2_0_2: THREE.Mesh;
    };
    materials: {
        Particle_1: THREE.MeshStandardMaterial;
        Particle_2: THREE.MeshStandardMaterial;
    };
}

export function BrainModel(props: JSX.IntrinsicElements['group']) {
    const { nodes, materials } = useGLTF("/brain_hologram.glb") as unknown as GLTFResult;
    // console.log("Model Nodes:", nodes);
    // console.log("Model Metarials:", metarials);


    return (
        <group {...props} dispose={null}>
            <mesh
                geometry={nodes.Icosphere001_Particle_1_0.geometry}
                material={materials.Particle_1}
            />
            <mesh
                geometry={nodes.Icosphere001_Particle_1_0_1.geometry}
                material={materials.Particle_1}
            />
            <mesh
                geometry={nodes.Icosphere001_Particle_1_0_2.geometry}
                material={materials.Particle_1}
            />
            <mesh
                geometry={nodes.Icosphere001_Particle_2_0.geometry}
                material={materials.Particle_2}
            />
            <mesh
                geometry={nodes.Icosphere001_Particle_2_0_1.geometry}
                material={materials.Particle_2}
            />
            <mesh
                geometry={nodes.Icosphere001_Particle_2_0_2.geometry}
                material={materials.Particle_2}
            />
        </group>
    );
}

useGLTF.preload("/brain_hologram.glb");
