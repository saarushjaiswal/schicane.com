"use client";
import { useEffect, useRef, useState } from "react";

const views = [
  {
    name: "Software",
    title: "Software & autonomy",
    context: "Purdue VIP Autoveh / 2026–present",
    part: "Chassis",
    angle: "Three-quarter",
    progress: 0,
    description:
      "I study computer science and AI at Purdue University in Indianapolis. With VIP Autoveh, I work on autonomous-vehicle software using C and ROS 2.",
    skills: ["C", "ROS 2", "Git CLI"],
    evidence: [
      { label: "Autoveh experience", href: "#experience" },
      {
        label: "Coursework",
        href: "https://github.com/saarushjaiswal/runtime-components",
      },
    ],
  },
  {
    name: "AI & data",
    title: "AI & data",
    context: "Blaizing Academy / AI Intern / Summer 2025",
    part: "Power unit",
    angle: "Side profile",
    progress: 0.26,
    description:
      "My AI internship included logistic regression and generative-AI product development. F1 Race Recaps continues that work with Python, APIs, and pandas.",
    skills: ["Python", "Logistic regression", "pandas"],
    evidence: [
      {
        label: "F1 Race Recaps",
        href: "https://github.com/saarushjaiswal/f1-race-recaps",
      },
      { label: "Internship", href: "#experience" },
    ],
  },
  {
    name: "Robotics",
    title: "Robotics & controls",
    context: "Tiger Dynasty 5010 / Programming Lead / 2024–2026",
    part: "Wheels & suspension",
    angle: "Exploded view",
    progress: 0.62,
    description:
      "I led programming for FRC Team 5010, working on autonomous navigation, computer vision, and motion planning while mentoring other programmers.",
    skills: ["Java", "WPILib", "PhotonVision", "PathPlanner"],
    evidence: [
      {
        label: "Reefscape team code",
        href: "https://github.com/saarushjaiswal/reefscape",
      },
      { label: "Experience", href: "#experience" },
    ],
  },
  {
    name: "Web tools",
    title: "Web tools & UI/UX",
    context: "TigerTrax / Project Lead / 2025",
    part: "Bodywork",
    angle: "Overhead",
    progress: 0.88,
    description:
      "I led TigerTrax’s school-navigation and UI/UX work with Haneef Najum, and helped build CrewBrew’s school-ordering project.",
    skills: ["JavaScript", "HTML/CSS", "Firebase"],
    evidence: [
      {
        label: "TigerTrax",
        href: "https://github.com/saarushjaiswal/TigerTrax",
      },
      {
        label: "CrewBrew",
        href: "https://github.com/saarushjaiswal/CrewBrewMain",
      },
    ],
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
        renderer.shadowMap.type = THREE.PCFShadowMap;
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
          new THREE.ShadowMaterial({ opacity: 0.2, depthWrite: false }),
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
        const bounds = new THREE.Box3();
        const center = new THREE.Vector3();
        const corner = new THREE.Vector3();
        const draw = (value: number) => {
          const p = Math.min(1, Math.max(0, value));
          timeline.seek(p * timeline.duration, true);
          explode(pose.explosion);
          bounds.setFromObject(car);
          bounds.getCenter(center);
          camera.position.set(
            center.x + Math.sin(pose.azimuth) * 13 * Math.cos(pose.elevation),
            center.y + 13 * Math.sin(pose.elevation),
            center.z + Math.cos(pose.azimuth) * 13 * Math.cos(pose.elevation),
          );
          camera.lookAt(center);
          camera.updateMatrixWorld(true);
          const aspect = host.clientWidth / Math.max(1, host.clientHeight);
          let extentX = 0,
            extentY = 0;
          for (const x of [bounds.min.x, bounds.max.x]) {
            for (const y of [bounds.min.y, bounds.max.y]) {
              for (const z of [bounds.min.z, bounds.max.z]) {
                corner.set(x, y, z).applyMatrix4(camera.matrixWorldInverse);
                extentX = Math.max(extentX, Math.abs(corner.x));
                extentY = Math.max(extentY, Math.abs(corner.y));
              }
            }
          }
          // Fit every component inside the viewport, including narrow layouts.
          const halfHeight = Math.max(
            1.65,
            extentY * 1.1,
            (extentX / aspect) * 1.1,
          );
          camera.left = -halfHeight * aspect;
          camera.right = halfHeight * aspect;
          camera.top = halfHeight;
          camera.bottom = -halfHeight;
          camera.updateProjectionMatrix();
          renderer.render(scene, camera);
          host.dataset.view = String(p);
          host.dataset.exploded = String(pose.explosion > 0.4);
          const e = pose.explosion;
          const labelPositions: Record<string, number[]> = {
            data: [1.2, 0.22, 0],
            body: [1.3, 1 + e * 1.15 - 0.6, 0],
            floor: [0.2, 0.1 - e * 0.6 - 0.6, 0],
            wheel: [-1.92 - e * 0.32, 0.55 + e * 0.05 - 0.6, 1.34 + e],
          };
          host
            .querySelectorAll<HTMLElement>(".f1-part-label")
            .forEach((label) => {
              const point = labelPositions[label.dataset.part ?? ""];
              if (!point) return;
              corner.set(point[0], point[1], point[2]).project(camera);
              label.style.left = `${Math.max(60, Math.min(host.clientWidth - 70, ((corner.x + 1) * host.clientWidth) / 2))}px`;
              label.style.top = `${Math.max(18, Math.min(host.clientHeight - 18, ((1 - corner.y) * host.clientHeight) / 2 - 18))}px`;
            });
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
            <span className="eyebrow">SCHICANE / SKILLS & PROJECTS</span>
            <h2 id="f1-title">F1 motion study</h2>
          </div>
          <p>
            Scroll to rotate and explore my skills.
            <br />
            <span className="f1-instruction-detail">
              Select a part for the related project.
            </span>
          </p>
        </div>
        <div className="f1-view-label">
          <span>0{stage + 1} / 04</span>
          <strong>{views[stage].part}</strong>
        </div>
        <aside className="f1-story" aria-live="polite">
          <h3>{views[stage].title}</h3>
          <span className="f1-role">{views[stage].context}</span>
          <p>{views[stage].description}</p>
          <ul aria-label="Related skills">
            {views[stage].skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
          <div className="f1-evidence">
            {views[stage].evidence.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
          <a className="f1-background-link" href="#about">
            More about my background <span aria-hidden="true">↘</span>
          </a>
        </aside>
        <div
          ref={viewport}
          className="f1-canvas"
          role="group"
          aria-label={`Open-wheel concept car: ${views[stage].angle}`}
        >
          <a
            className="f1-part-label"
            data-part="data"
            href="https://github.com/saarushjaiswal/f1-race-recaps"
            aria-label="AI and data: F1 Race Recaps on GitHub"
          >
            AI & data ↗
          </a>
          <a
            className="f1-part-label"
            data-part="body"
            href="https://github.com/saarushjaiswal/CrewBrewMain"
            aria-label="Web tools: CrewBrew on GitHub"
          >
            Web tools ↗
          </a>
          <a
            className="f1-part-label"
            data-part="floor"
            href="https://github.com/saarushjaiswal/runtime-components"
            aria-label="Software: coursework on GitHub"
          >
            Software ↗
          </a>
          <a
            className="f1-part-label"
            data-part="wheel"
            href="https://github.com/saarushjaiswal/reefscape"
            aria-label="Robotics: Reefscape team code on GitHub"
          >
            Robotics ↗
          </a>
        </div>
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
            <p>{views[stage].angle}</p>
            <span>Schicane concept model</span>
          </div>
          <a href="#projects" className="f1-skip">
            Skip to projects <span aria-hidden="true">↘</span>
          </a>
        </div>
        <div className="f1-controls shell">
          <div
            className="f1-view-buttons"
            role="group"
            aria-label="Explore skills and related car views"
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
              aria-valuetext={`${views[stage].title}: ${views[stage].angle}`}
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
