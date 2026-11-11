"use client";
import { useEffect, useRef, useState } from "react";

const views = [
  {
    name: "Three-quarter",
    progress: 0,
    description: "The complete car, from the front.",
  },
  {
    name: "Side profile",
    progress: 0.26,
    description: "A low view of the chassis, wheels, and aero surfaces.",
  },
  {
    name: "Exploded view",
    progress: 0.62,
    description:
      "Bodywork, wings, wheels, and floor separate to reveal the structure.",
  },
  {
    name: "Overhead",
    progress: 0.88,
    description: "The component layout, seen from above.",
  },
];

function CarFallback() {
  return (
    <svg
      className="f1-fallback"
      viewBox="0 0 900 420"
      role="img"
      aria-label="Top view of a gold open-wheel concept car"
    >
      <g fill="#202620" stroke="#c6a660" strokeWidth="2">
        <path d="M255 154H665L728 178V242L665 266H255L190 238V182Z" />
        <rect x="180" y="80" width="105" height="83" rx="24" />
        <rect x="180" y="257" width="105" height="83" rx="24" />
        <rect x="610" y="80" width="105" height="83" rx="24" />
        <rect x="610" y="257" width="105" height="83" rx="24" />
        <path
          d="M145 189L418 172L442 196V224L418 248L145 231Z"
          fill="#c6a660"
        />
        <path d="M145 112H175V308H145ZM725 122H766V298H725Z" />
        <path
          d="M448 169Q405 210 448 251L604 238L652 210L604 182Z"
          fill="#c6a660"
        />
        <ellipse cx="446" cy="210" rx="44" ry="29" fill="#101210" />
        <path d="M232 163L385 195M232 257L385 225M662 163L557 195M662 257L557 225" />
      </g>
    </svg>
  );
}

export function F1ScrollStudy() {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const seek = useRef<(progress: number) => void>(() => {});
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const stage =
    progress < 0.2 ? 0 : progress < 0.43 ? 1 : progress < 0.8 ? 2 : 3;

  useEffect(() => {
    const root = section.current,
      host = viewport.current;
    if (!root || !host) return;
    let disposed = false,
      cleanup = () => {};
    const load = async () => {
      try {
        const [THREE, { createTimeline }, { createF1Model }] =
          await Promise.all([
            import("three"),
            import("animejs"),
            import("@/lib/f1-model"),
          ]);
        if (disposed) return;
        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "low-power",
        });
        renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
        renderer.setClearColor(0x101210, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.3;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.domElement.setAttribute("aria-hidden", "true");
        host.appendChild(renderer.domElement);
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-6, 6, 4, -4, 0.1, 80);
        scene.add(new THREE.HemisphereLight(0xfff4dc, 0x30392d, 3));
        const key = new THREE.DirectionalLight(0xfff4db, 5);
        key.position.set(-4, 8, 5);
        key.castShadow = true;
        key.shadow.mapSize.set(1024, 1024);
        key.shadow.camera.left = -8;
        key.shadow.camera.right = 8;
        key.shadow.camera.top = 6;
        key.shadow.camera.bottom = -6;
        key.shadow.normalBias = 0.025;
        scene.add(key);
        const rim = new THREE.DirectionalLight(0xe1c378, 4);
        rim.position.set(4, 5, -6);
        scene.add(rim);
        const fill = new THREE.DirectionalLight(0xc4d7ed, 2.3);
        fill.position.set(-5, 2, -3);
        scene.add(fill);
        const { car, explode, dispose } = createF1Model();
        car.position.y = -0.6;
        scene.add(car);
        const ground = new THREE.Mesh(
          new THREE.PlaneGeometry(35, 35),
          new THREE.ShadowMaterial({ opacity: 0.2 }),
        );
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.66;
        ground.receiveShadow = true;
        scene.add(ground);
        const pose = { azimuth: -0.85, elevation: 0.4, explosion: 0 };
        const timeline = createTimeline({
          autoplay: false,
          defaults: { ease: "inOutSine" },
        })
          .add(pose, { azimuth: 0.05, elevation: 0.2, duration: 1100 }, 0)
          .add(
            pose,
            { azimuth: -0.85, elevation: 0.55, explosion: 1, duration: 1400 },
            1100,
          )
          .add(pose, { azimuth: 0.02, elevation: 1.27, duration: 900 }, 2500)
          .add(pose, { explosion: 0.28, duration: 600 }, 3400);
        let inView = true,
          motionOn = !matchMedia("(prefers-reduced-motion: reduce)").matches,
          frame = 0,
          lastProgress = -1;
        const draw = (value: number) => {
          const p = Math.min(1, Math.max(0, value));
          timeline.seek(p * timeline.duration, true);
          explode(pose.explosion);
          camera.position.set(
            Math.sin(pose.azimuth) * 13 * Math.cos(pose.elevation),
            13 * Math.sin(pose.elevation),
            Math.cos(pose.azimuth) * 13 * Math.cos(pose.elevation),
          );
          camera.lookAt(0, 0.25, 0);
          renderer.render(scene, camera);
          host.dataset.view = String(p);
          if (Math.abs(p - lastProgress) > 0.003) {
            lastProgress = p;
            setProgress(p);
          }
        };
        const automatic = () => {
          frame = 0;
          if (disposed || !inView || !motionOn) return;
          const bounds = root.getBoundingClientRect();
          const distance = Math.max(1, root.offsetHeight - innerHeight);
          draw(-bounds.top / distance);
        };
        const request = () => {
          if (!frame && inView && motionOn)
            frame = requestAnimationFrame(automatic);
        };
        seek.current = draw;
        const resize = () => {
          const width = host.clientWidth,
            height = host.clientHeight;
          const worldWidth = width < 700 ? 10.9 : 12.1;
          const aspect = width / Math.max(1, height);
          camera.left = -worldWidth / 2;
          camera.right = worldWidth / 2;
          camera.top = worldWidth / aspect / 2;
          camera.bottom = -worldWidth / aspect / 2;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
          draw(lastProgress < 0 ? 0 : lastProgress);
        };
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(host);
        const visibility = new IntersectionObserver((entries) => {
          inView = entries[0].isIntersecting;
          if (inView) request();
        });
        visibility.observe(root);
        const motion = new MutationObserver(() => {
          motionOn = document.body.classList.contains("motion-enabled");
          if (motionOn) request();
        });
        motion.observe(document.body, {
          attributes: true,
          attributeFilter: ["class"],
        });
        const onVisibility = () => {
          if (!document.hidden) request();
        };
        document.addEventListener("visibilitychange", onVisibility);
        window.addEventListener("scroll", request, { passive: true });
        resize();
        draw(0);
        setReady(true);
        request();
        const lost = (event: Event) => {
          event.preventDefault();
          setReady(false);
          setUnavailable(true);
        };
        renderer.domElement.addEventListener("webglcontextlost", lost);
        cleanup = () => {
          cancelAnimationFrame(frame);
          timeline.revert();
          resizeObserver.disconnect();
          visibility.disconnect();
          motion.disconnect();
          window.removeEventListener("scroll", request);
          document.removeEventListener("visibilitychange", onVisibility);
          renderer.domElement.removeEventListener("webglcontextlost", lost);
          dispose();
          ground.geometry.dispose();
          (
            ground.material as InstanceType<typeof THREE.ShadowMaterial>
          ).dispose();
          renderer.dispose();
          renderer.domElement.remove();
          seek.current = () => {};
        };
      } catch {
        if (!disposed) {
          setUnavailable(true);
          setReady(false);
        }
      }
    };
    const lazy = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          lazy.disconnect();
          void load();
        }
      },
      { rootMargin: "600px" },
    );
    lazy.observe(root);
    return () => {
      disposed = true;
      lazy.disconnect();
      cleanup();
    };
  }, []);

  return (
    <section
      ref={section}
      id="f1-study"
      className={`f1-scroll-section${unavailable ? " f1-unavailable" : ""}`}
      aria-labelledby="f1-title"
    >
      <div className="f1-stage">
        <div className="f1-stage-heading shell">
          <div>
            <span className="eyebrow">SCHICANE / MOTION STUDY</span>
            <h2 id="f1-title">F1, in motion.</h2>
          </div>
          <p>
            Scroll to rotate.
            <br />
            Keep going to take it apart.
          </p>
        </div>
        <div className="f1-view-label">
          <span>0{stage + 1} / 04</span>
          <strong>{views[stage].name}</strong>
        </div>
        <div
          ref={viewport}
          className="f1-canvas"
          role="img"
          aria-label={`Interactive open-wheel concept car. ${views[stage].description}`}
        />
        {!ready && (
          <div className="f1-fallback-wrap">
            <CarFallback />
            <p>
              {unavailable
                ? "3D is unavailable in this browser. The concept is shown above."
                : "Loading the car…"}
            </p>
          </div>
        )}
        <div className="f1-stage-footer shell">
          <div className="f1-caption">
            <p>{views[stage].description}</p>
            <span>A stylized Schicane concept car.</span>
          </div>
          <a href="#projects" className="f1-skip">
            Skip to projects <span aria-hidden="true">↘</span>
          </a>
        </div>
        <div className="f1-controls shell">
          <div
            className="f1-view-buttons"
            role="group"
            aria-label="Car viewpoints"
          >
            {views.map((view, index) => (
              <button
                key={view.name}
                type="button"
                aria-pressed={stage === index}
                onClick={() => seek.current(view.progress)}
                disabled={!ready}
              >
                <span>0{index + 1}</span>
                {view.name}
              </button>
            ))}
          </div>
          <label className="f1-scrub">
            <span className="heading-readable">Car animation progress</span>
            <input
              type="range"
              min="0"
              max="1000"
              step="1"
              value={Math.round(progress * 1000)}
              aria-label="Car animation progress"
              aria-valuetext={views[stage].name}
              disabled={!ready}
              onChange={(event) =>
                seek.current(Number(event.target.value) / 1000)
              }
            />
          </label>
        </div>
      </div>
    </section>
  );
}
