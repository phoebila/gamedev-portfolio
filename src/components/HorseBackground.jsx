import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { clone as skeletonClone } from 'three/examples/jsm/utils/SkeletonUtils';

const ASCII_CHARS = ' .:-=+*#%@';

// Each horse instance: z depth, x offset at rest, scroll speed multiplier,
// animation time offset (seconds), and scale tweak.
// Closer horses (higher z) scroll faster → parallax.
// Spread across left, center, and right to fill the screen without overcrowding.
const HORSE_INSTANCES = [
  // --- Front row (closest) ---
  { z: 0,   xOff: -0.5, scrollSpeed: 1.0,  timeOff: 0,    scaleMul: 1.0  },  // front center-left
  { z: -1,  xOff: 3.8,  scrollSpeed: 0.95, timeOff: 0.3,  scaleMul: 1.0  },  // front right
  // --- Mid row ---
  { z: -3,  xOff: -3.5, scrollSpeed: 0.7,  timeOff: 0.18, scaleMul: 1.0  },  // mid far-left
  { z: -4,  xOff: 2.0,  scrollSpeed: 0.6,  timeOff: 0.42, scaleMul: 1.0  },  // mid right
  // --- Back row (farthest) ---
  { z: -5.5, xOff: -3.8, scrollSpeed: 0.45, timeOff: 0.35, scaleMul: 1.0  },  // back left
  { z: -8,   xOff: 4.0,  scrollSpeed: 0.35, timeOff: 0.08, scaleMul: 1.0  },  // back right
];

const HorseBackground = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: false });
    const RENDER_W = 200;
    const RENDER_H = 100;
    renderer.setSize(RENDER_W, RENDER_H);
    renderer.setClearColor(0x000000, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, RENDER_W / RENDER_H, 0.1, 1000);
    camera.position.set(0, 1.2, 5);
    camera.lookAt(0, 0.8, 0);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(2, 5, 5);
    scene.add(dir);
    const backLight = new THREE.DirectionalLight(0xffffff, 0.4);
    backLight.position.set(-2, 3, -3);
    scene.add(backLight);

    // Each horse gets: { pivot, mixer }
    const horses = [];
    const clock = new THREE.Clock();
    const loader = new GLTFLoader();

    // Lane / scroll constants
    const VISIBLE_HALF = 4.2;
    const HORSE_HALF = 1.5;
    const LANE_LEFT = -(VISIBLE_HALF + HORSE_HALF);
    const LANE_RIGHT = VISIBLE_HALF + HORSE_HALF;
    const LANE_WIDTH = LANE_RIGHT - LANE_LEFT;
    const SCROLL_LAPS = 3;

    loader.load(
      process.env.PUBLIC_URL + '/realistic_animated_horse.glb',
      (gltf) => {
        const sourceModel = gltf.scene;

        // Compute scale/centering from the original model once
        const box = new THREE.Box3().setFromObject(sourceModel);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const baseScale = 3.0 / maxDim;

        // Prepare stripped animation clip once
        let runClip =
          gltf.animations.find((a) => /G3_Gallop_Horse$/i.test(a.name)) ||
          gltf.animations.find((a) => /sprint/i.test(a.name)) ||
          gltf.animations.find((a) => /gallop/i.test(a.name)) ||
          gltf.animations[0];

        if (!runClip) return;

        const strippedTracks = runClip.tracks.filter((track) => {
          if (!track.name.endsWith('.position')) return true;
          const boneName = track.name.replace('.position', '');
          return !/^root/i.test(boneName);
        });
        runClip = new THREE.AnimationClip(
          runClip.name,
          runClip.duration,
          strippedTracks
        );

        // Spawn each horse instance
        HORSE_INSTANCES.forEach((cfg, i) => {
          // Clone the model properly (handles SkinnedMesh + Skeleton)
          const model = i === 0 ? sourceModel : skeletonClone(sourceModel);
          const s = baseScale * cfg.scaleMul;
          model.scale.setScalar(s);
          model.position.set(
            -center.x * s,
            -center.y * s + 0.1,
            -center.z * s
          );

          const pivot = new THREE.Group();
          pivot.add(model);
          pivot.rotation.y = 0;
          pivot.position.z = cfg.z;
          scene.add(pivot);

          // Each instance gets its own mixer so animations are independent
          const mixer = new THREE.AnimationMixer(model);
          const action = mixer.clipAction(runClip);
          action.setLoop(THREE.LoopRepeat, Infinity);
          action.clampWhenFinished = false;
          action.timeScale = 0.7;
          action.play();
          // Offset the animation start so they're not in lockstep
          action.time = cfg.timeOff;

          horses.push({ pivot, mixer, cfg });
        });
      },
      undefined,
      (err) => console.warn('Horse model failed to load:', err)
    );

    // --- Scroll tracking ---
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgressRef.current = docHeight > 0 ? scrollTop / docHeight : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // --- ASCII Canvas ---
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pixelBuf = new Uint8Array(RENDER_W * RENDER_H * 4);
    const CHAR_W = 6.5;
    const CHAR_H = 12;

    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const clampedDelta = Math.min(delta, 0.05);

      // Update all horse animations and positions
      for (const horse of horses) {
        horse.mixer.update(clampedDelta);

        const t = scrollProgressRef.current;
        if (t < 0.001) {
          // No scroll -- each horse gallops in place at its rest offset
          horse.pivot.position.x = horse.cfg.xOff;
        } else {
          // Scrolling -- each horse runs across at its own parallax speed
          const rawDistance = t * SCROLL_LAPS * LANE_WIDTH * horse.cfg.scrollSpeed;
          const wrappedX = ((rawDistance + (horse.cfg.xOff - LANE_LEFT)) % LANE_WIDTH) + LANE_LEFT;
          horse.pivot.position.x = wrappedX;
        }
      }

      renderer.render(scene, camera);

      // Read pixels
      const gl = renderer.getContext();
      gl.readPixels(0, 0, RENDER_W, RENDER_H, gl.RGBA, gl.UNSIGNED_BYTE, pixelBuf);

      // Draw ASCII
      const cw = canvas.width;
      const ch = canvas.height;
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, cw, ch);
      ctx.font = `${CHAR_H}px monospace`;
      ctx.textBaseline = 'top';

      const cols = Math.floor(cw / CHAR_W);
      const rows = Math.floor(ch / CHAR_H);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const sx = Math.floor((col / cols) * RENDER_W);
          const sy = RENDER_H - 1 - Math.floor((row / rows) * RENDER_H);
          const idx = (sy * RENDER_W + sx) * 4;
          const r = pixelBuf[idx];
          const g = pixelBuf[idx + 1];
          const b = pixelBuf[idx + 2];
          const brightness = (r + g + b) / 3 / 255;

          if (brightness < 0.02) continue;

          const charIdx = Math.floor(brightness * (ASCII_CHARS.length - 1));
          const ch2 = ASCII_CHARS[charIdx];

          const green = Math.floor(40 + brightness * 215);
          const red = Math.floor(brightness * 30);
          const blue = Math.floor(brightness * 60);
          ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${0.3 + brightness * 0.5})`;
          ctx.fillText(ch2, col * CHAR_W, row * CHAR_H);
        }
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', onScroll);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  );
};

export default HorseBackground;
