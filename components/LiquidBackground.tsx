"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

/* Domain-warped fbm height field, lit like glossy black liquid. */
const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uScroll;
uniform vec2 uMouse;
uniform float uStir;

vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash(i), f), dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)), dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
    u.y);
}

const mat2 ROT = mat2(1.6, 1.2, -1.2, 1.6);

float fbm(vec2 p) {
  float f = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    f += a * noise(p);
    p = ROT * p;
    a *= 0.42;
  }
  return f;
}

float height(vec2 p) {
  float t = uTime * 0.045 + uScroll;
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t * 0.8));
  vec2 r = vec2(
    fbm(p + 3.2 * q + vec2(1.7, 9.2) + 0.6 * t),
    fbm(p + 3.2 * q + vec2(8.3, 2.8) - 0.45 * t));
  return fbm(p + 3.6 * r);
}

void main() {
  float aspect = uRes.x / uRes.y;
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = vec2(uv.x * aspect, uv.y) * 0.5;

  vec2 m = vec2(uMouse.x * aspect, uMouse.y) * 0.5;
  vec2 d = p - m;
  float pull = exp(-dot(d, d) * 22.0) * uStir;
  p += vec2(-d.y, d.x) * pull * 0.9;

  float e = 0.002;
  float h = height(p);
  float hx = height(p + vec2(e, 0.0));
  float hy = height(p + vec2(0.0, e));
  vec3 n = normalize(vec3(-(hx - h) / e * 0.55, -(hy - h) / e * 0.55, 1.0));

  vec3 v = vec3(0.0, 0.0, 1.0);
  vec3 r = reflect(-v, n);
  vec3 l1 = normalize(vec3(-0.55, 0.6, 0.65));
  vec3 l2 = normalize(vec3(0.7, -0.25, 0.55));
  vec3 l3 = normalize(vec3(0.1, 0.9, 0.4));

  float s1 = pow(max(dot(r, l1), 0.0), 70.0);
  float s2 = pow(max(dot(r, l2), 0.0), 26.0) * 0.45;
  float s3 = pow(max(dot(r, l3), 0.0), 140.0) * 0.8;
  float fres = pow(1.0 - max(n.z, 0.0), 2.6);
  float env = smoothstep(-0.2, 0.9, r.y) * 0.06;

  vec3 col = vec3(0.006, 0.006, 0.009);
  col += vec3(0.014, 0.013, 0.020) * (h + 0.5);
  col += fres * vec3(0.13, 0.125, 0.18);
  col += env * vec3(0.4, 0.4, 0.52);
  col += s1 * vec3(0.9, 0.9, 1.0);
  col += s2 * 0.6 * vec3(0.5, 0.48, 0.66);
  col += s3 * vec3(1.0);

  float vig = smoothstep(1.25, 0.25, length((uv - 0.5) * vec2(aspect * 0.8, 1.0)));
  col *= mix(0.55, 1.0, vig);
  col = pow(col, vec3(0.92));
  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || "shader");
  return s;
}

export default function LiquidBackground({ paused = false }: { paused?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "high-performance" });
    if (!gl) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uScroll = gl.getUniformLocation(prog, "uScroll");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uStir = gl.getUniformLocation(prog, "uStir");

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Rendered below native resolution: the liquid is soft, and this keeps the shader cheap.
    const quality = window.innerWidth < 768 ? 0.45 : 0.6;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2) * quality;
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      gl!.viewport(0, 0, canvas.width, canvas.height);
      gl!.uniform2f(uRes, canvas.width, canvas.height);
    }
    resize();
    window.addEventListener("resize", resize);

    const target = { x: 0.5, y: 0.5 };
    const mouse = { x: 0.5, y: 0.5 };
    let stir = 0;
    let moved = 0;
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX / window.innerWidth;
      target.y = 1 - e.clientY / window.innerHeight;
      moved = 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    let time = 0;
    let last = performance.now();
    let flow = 0;
    let lastY = window.scrollY;

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const y = window.scrollY;
      flow += (y - lastY) * 0.0009;
      lastY = y;
      if (pausedRef.current || document.hidden) return;

      time += dt * (calm ? 0.25 : 1);
      mouse.x += (target.x - mouse.x) * 0.06;
      mouse.y += (target.y - mouse.y) * 0.06;
      stir += (moved - stir) * 0.04;
      moved *= 0.96;

      gl!.uniform1f(uTime, time);
      gl!.uniform1f(uScroll, flow);
      gl!.uniform2f(uMouse, mouse.x, mouse.y);
      gl!.uniform1f(uStir, stir);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 w-screen h-screen pointer-events-none bg-black"
    />
  );
}
