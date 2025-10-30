import { shaderMaterial, useGLTF } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useMemo, useRef, type JSX } from "react";
import * as THREE from 'three';
import useUI from "../../store/useUI";

// GLSL Shader Kodu
const vertexShader = `
  uniform float uTime;
  uniform float uAmplitude;
  uniform float uFrequency;
  uniform vec2 uPointer;
  uniform float uRadius;
  uniform float uStrength;

  float rand(vec2 co){ return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453); }
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
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
    vec3 displacedPos = position + normal * noise * uAmplitude;
    vec4 projectedPos = projectionMatrix * viewMatrix * modelMatrix * vec4(displacedPos, 1.0);
    vec2 ndc = projectedPos.xy / projectedPos.w;
    float dist = distance(ndc, uPointer);
    float force = 1.0 - smoothstep(0.0, uRadius, dist);
    float sharpenedForce = pow(force, 3.0);
    vec3 randomDir = normalize(vec3(rand(position.yz) - 0.5, rand(position.xz) - 0.5, rand(position.xy) - 0.5));
    displacedPos += randomDir * sharpenedForce * uStrength;
    gl_PointSize = 1.5 + (1.0 - sharpenedForce) * 2.0;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(displacedPos, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  void main() {
    if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.475) discard;
    gl_FragColor = vec4(uColor, uOpacity);
  }
`;

const ParticlesMaterial = shaderMaterial({
  uTime: 0, uAmplitude: 0.006, uFrequency: 3.0,
  uColor: new THREE.Color(0.6, 0.8, 1.0),
  uPointer: new THREE.Vector2(0, 0),
  uRadius: 0.1, uStrength: 0.2,
  uOpacity: 1.0
}, vertexShader, fragmentShader);

extend({ ParticlesMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    particlesMaterial: JSX.IntrinsicElements['shaderMaterial'] & {
      uTime?: number; uColor?: THREE.Color; uPointer?: THREE.Vector2;
      uAmplitude?: number; uFrequency?: number;
      uOpacity?: number;
    }
  }
}

export function BrainModel() {
  const { scene } = useGLTF('/brain_hologram.glb');
  const { isSceneLoaded, setSceneLoaded, transitionPhase } = useUI();

  const delayedPointer = useRef(new THREE.Vector2(0, 0));

  const points = useMemo(() => {
    const pointsArray: THREE.Points[] = [];
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Her mesh'i bir points objesine dönüştür
        const pointsInstance = new THREE.Points(
          child.geometry,
          new ParticlesMaterial()
        );
        pointsArray.push(pointsInstance);
      }
    });
    // Sahnedeki tüm mesh'leri içeren bir grup döndür
    const group = new THREE.Group();
    group.add(...pointsArray);
    return group;
  }, [scene]);

  useFrame((state) => {
    // Gecikme faktörü
    const lerpFactor = 0.05

    delayedPointer.current.lerp(state.pointer, lerpFactor);

    points.children.forEach(child => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const material = (child as THREE.Points).material as any;
      if (material) {
        material.uTime = state.clock.getElapsedTime();
        material.uPointer = state.pointer;

        const target = (transitionPhase === 'dissolving' || transitionPhase === 'gathering') ? 0.0 : 1.0;
        material.uOpacity = THREE.MathUtils.lerp(material.uOpacity, target, 0.15);
      }
    })
  });

  if (!isSceneLoaded) {
    setSceneLoaded(true);
  }


  return <primitive object={points} />;
}

useGLTF.preload('/brain_hologram.glb');