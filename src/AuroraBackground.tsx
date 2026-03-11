import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ── GLSL: organic drifting mesh gradient with delayed mouse-follow glow ───────
const fragmentShader = `
precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse; // 0..1 normalised, lazily follows cursor

vec3 mod289(vec3 x){ return x - floor(x*(1./289.))*289.; }
vec4 mod289(vec4 x){ return x - floor(x*(1./289.))*289.; }
vec4 permute(vec4 x){ return mod289(((x*34.)+1.)*x); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314*r; }

float snoise(vec3 v){
  const vec2 C = vec2(1./6., 1./3.);
  const vec4 D = vec4(0., .5, 1., 2.);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1. - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0., i1.z, i2.z, 1.))
    + i.y + vec4(0., i1.y, i2.y, 1.))
    + i.x + vec4(0., i1.x, i2.x, 1.));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.*floor(p*ns.z*ns.z);
  vec4 x_ = floor(j*ns.z);
  vec4 y_ = floor(j - 7.*x_);
  vec4 x = x_*ns.x + ns.yyyy;
  vec4 y = y_*ns.x + ns.yyyy;
  vec4 h = 1. - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.+1.;
  vec4 s1 = floor(b1)*2.+1.;
  vec4 sh = -step(h, vec4(0.));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m = max(.5 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)), 0.);
  m = m*m;
  return 42.*dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  // Ambient organic noise
  float n1 = snoise(vec3(uv * 0.7, u_time * 0.04));
  float n2 = snoise(vec3(uv * 1.4 + 0.5, u_time * 0.06));
  float noise = (n1 + n2 * 0.4 + 1.6) * 0.35;

  // Mouse glow: a radial spotlight that drifts toward lazy mouse pos
  vec2 mouseUV = vec2(u_mouse.x, 1.0 - u_mouse.y); // flip Y for WebGL coords
  float mouseDist = length(uv - mouseUV);
  float mouseGlow = smoothstep(0.55, 0.0, mouseDist) * 0.55;

  vec3 orange = vec3(0.0, 0.0, 0.502);    // #000080 navy blue
  vec3 black  = vec3(0.0);
  vec3 deepAmber = vec3(0.0, 0.0, 0.22);   // dark navy anchor colour

  // Base gradient from noise
  vec3 col = mix(black, deepAmber, noise);
  // Add bright orange where mouse glow peaks
  col = mix(col, orange, mouseGlow);
  // Darken toward screen edges for vignette
  float vignette = 1.0 - smoothstep(0.3, 1.0, length(uv - 0.5) * 1.4);
  col *= vignette;

  gl_FragColor = vec4(col, 1.0);
}
`;

const vertexShader = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

// ─── Inner Three.js mesh — receives lazy mouse uniform ───────────────────────
type AuroraMaterialProps = { lazyMouse: React.MutableRefObject<THREE.Vector2> };

const AuroraMesh = ({ lazyMouse }: AuroraMaterialProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      u_time:       { value: 0 },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_mouse:      { value: new THREE.Vector2(0.5, 0.5) },
    }),
    []
  );

  useFrame((state) => {
    const mat = meshRef.current?.material as THREE.ShaderMaterial | undefined;
    if (!mat) return;
    mat.uniforms.u_time.value = state.clock.elapsedTime;
    // Lerp toward the lazy mouse target (high latency = slow lerp)
    mat.uniforms.u_mouse.value.lerp(lazyMouse.current, 0.025);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

// ─── Exported component ───────────────────────────────────────────────────────
export const AuroraBackground = () => {
  // Raw mouse position target — updated on every mousemove, read lazily by shader
  const lazyMouse = useRef(new THREE.Vector2(0.5, 0.5));

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      lazyMouse.current.set(
        e.clientX / window.innerWidth,
        e.clientY / window.innerHeight
      );
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none bg-black">
      <Canvas
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        gl={{ antialias: false }}
      >
        <AuroraMesh lazyMouse={lazyMouse} />
      </Canvas>
      {/* Film-grain noise overlay — CSS pseudo-element via inline SVG feTurbulence */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          opacity: 0.05,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
};
