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
  uniform float uDisintegration;
  uniform float uFallOffset;
  uniform float uBreathing;
  uniform vec2 uTrailPositions[10];
  uniform float uTrailStrengths[10];

  varying float vTrailIntensity;

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

    // BREATHING EFFECT - Idle durumda hafif pulse
    float breathingPulse = sin(uTime * 1.5) * 0.5 + 0.5;
    displacedPos += normal * uBreathing * breathingPulse * 0.02;
    
    // DALGALANMA EFFECT 
    vec3 randomDir = normalize(vec3(
      rand(position.yz) - 0.5, 
      rand(position.xz) - 0.5, 
      rand(position.xy) - 0.5
    ));
    
    float waveNoise = snoise(position.xy * 2.0 + uTime * 0.5);
    displacedPos += normal * uDisintegration * waveNoise * 0.3;
    
    // Hafif aşağı hareket
    displacedPos.y -= uFallOffset;
    
    // PROJECT TO NDC for mouse interaction
    vec4 projectedPos = projectionMatrix * viewMatrix * modelMatrix * vec4(displacedPos, 1.0);
    vec2 ndc = projectedPos.xy / projectedPos.w;
    
    // MAGNETIC ATTRACTION 
    float dist = distance(ndc, uPointer);
    float force = 1.0 - smoothstep(0.0, uRadius, dist);
    float smoothForce = pow(force, 2.0); 
    
    vec2 attactDir = normalize(uPointer - ndc);
    vec3 attactDir3D = vec3(attactDir.x, attactDir.y * 0.5, 0.0);
    
    // Hafif manyetik çekiş
    displacedPos += attactDir3D * smoothForce * uStrength * 0.4;
    
    // MOUSE TRAIL EFFECT - İz bırakma
    float trailForce = 0.0;
    for(int i = 0; i < 10; i++) {
      float trailDist = distance(ndc, uTrailPositions[i]);
      float trailEffect = (1.0 - smoothstep(0.0, uRadius * 1.5, trailDist)) * uTrailStrengths[i];
      trailForce += trailEffect;
    }

    vTrailIntensity = trailForce;
    
    // Trail renk ve hafif ripple efekti
    displacedPos += normal * trailForce * 0.008;
    
    // Point size - Trail ve mouse etkisiyle büyür
    float totalForce = max(smoothForce, trailForce * 0.5);
    gl_PointSize = 1.5 + uDisintegration * 2.0 + totalForce * 0.08;
    
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(displacedPos, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;

  varying float vTrailIntensity;

  void main() {
    if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.475) discard;

    vec3 neonPink = vec3(1.0, 0.2, 0.8);
    vec3 finalColor = mix(uColor, neonPink, vTrailIntensity * 0.6);

    gl_FragColor = vec4(finalColor, uOpacity);
  }
`;

const ParticlesMaterial = shaderMaterial({
  uTime: 0, uAmplitude: 0.006, uFrequency: 3.0,
  uColor: new THREE.Color(0.6, 0.8, 1.0),
  uPointer: new THREE.Vector2(0, 0),
  uRadius: 0.1, uStrength: 0.2,
  uOpacity: 1.0,
  uDisintegration: 0.0,
  uFallOffset: 0.0,
  uBreathing: 1.0,
  uTrailPositions: new Array(10).fill(0).map(() => new THREE.Vector2(0, 0)),
  uTrailStrengths: new Array(10).fill(0)
}, vertexShader, fragmentShader);

extend({ ParticlesMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    particlesMaterial: JSX.IntrinsicElements['shaderMaterial'] & {
      uTime?: number; uColor?: THREE.Color; uPointer?: THREE.Vector2;
      uAmplitude?: number; uFrequency?: number;
      uOpacity?: number; uDisintegration?: number; uFallOffset?: number;
      uBreathing?: number; uTrailPositions?: THREE.Vector2[]; uTrailStrengths?: number[];
    }
  }
}

export function BrainModel() {
  const { scene } = useGLTF('/brain_hologram.glb');
  const { isSceneLoaded, setSceneLoaded, transitionPhase } = useUI();

  const delayedPointer = useRef(new THREE.Vector2(0, 0));

  const trailPositions = useRef<THREE.Vector2[]>(new Array(10).fill(null).map(() => new THREE.Vector2(0, 0)));
  const trailStrengths = useRef<number[]>(new Array(10).fill(0));
  const trailIndex = useRef(0);

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
    const prevPointer = delayedPointer.current.clone();
    delayedPointer.current.lerp(state.pointer, lerpFactor);

    const pointerMoved = prevPointer.distanceTo(state.pointer) > 0.001;
    if (pointerMoved) {
      trailPositions.current[trailIndex.current].copy(state.pointer);
      trailStrengths.current[trailIndex.current] = 1.0;
      trailIndex.current = (trailIndex.current + 1) % 10;
    }

    for (let i = 0; i < 10; i++) {
      trailStrengths.current[i] *= 0.92;
    }

    const blueColor = new THREE.Color(0.6, 0.8, 1.0);
    const lightPurpleColor = new THREE.Color(0.75, 0.65, 0.95);

    points.children.forEach(child => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const material = (child as THREE.Points).material as any;
      if (material) {
        material.uTime = state.clock.getElapsedTime();
        material.uPointer = state.pointer;
        material.uTrailPositions = trailPositions.current;
        material.uTrailStrengths = trailStrengths.current;

        let targetOpacity = 1.0;
        let targetDisintegration = 0.0;
        let targetFallOffset = 0.0;
        let targetBreathing = 1.0;
        let targetColor = blueColor;

        if (transitionPhase === 'dissolving') {
          targetOpacity = 1.0;
          targetDisintegration = 0.5;
          targetFallOffset = 0.0;
          targetBreathing = 0.0;
          targetColor = lightPurpleColor;

        } else if (transitionPhase === 'gathering') {
          targetOpacity = 1.0;
          targetDisintegration = 0.0;
          targetFallOffset = 0.0;
          targetBreathing = 1.0;
          targetColor = blueColor;

        } else {
          targetOpacity = 1.0;
          targetDisintegration = 0.0;
          targetFallOffset = 0.0;
          targetBreathing = 1.0;
          targetColor = blueColor;
        }

        const opacitySpeed = 0.05
        const disintSpeed = transitionPhase === 'dissolving' ? 0.08 : 0.06;
        const fallSpeed = 0.06;

        material.uOpacity = THREE.MathUtils.lerp(material.uOpacity, targetOpacity, opacitySpeed);
        material.uDisintegration = THREE.MathUtils.lerp(material.uDisintegration || 0, targetDisintegration, disintSpeed);
        material.uFallOffset = THREE.MathUtils.lerp(material.uFallOffset || 0, targetFallOffset, fallSpeed);
        material.uBreathing = THREE.MathUtils.lerp(material.uBreathing || 1, targetBreathing, 0.03);
        material.uColor.lerp(targetColor, 0.04);
      }
    });
  });

  if (!isSceneLoaded) {
    setSceneLoaded(true);
  }


  return <primitive object={points} />;
}

useGLTF.preload('/brain_hologram.glb');