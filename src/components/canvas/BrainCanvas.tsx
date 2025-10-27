import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { BrainModel } from "./BrainModel";
import { Suspense } from "react";

const BrainCanvas = () => {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 35 }}
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
                <BrainModel />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
    );
};

export default BrainCanvas;