import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";

export function PostProcessing() {
    return (
        <EffectComposer>
            <Bloom
                intensity={1.2}
                kernelSize={KernelSize.LARGE}
                luminanceThreshhold={0.2}
                luminanceSmoothing={0.7}
                mipmapBlur={true}
                radius={0.85}
            />
        </EffectComposer>
    )
}