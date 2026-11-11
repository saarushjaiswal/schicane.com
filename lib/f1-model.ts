import * as THREE from "three";

// An original, stylized open-wheel concept. No third-party car model or team livery.
export function createF1Model() {
  const car = new THREE.Group();
  const gold = new THREE.MeshPhysicalMaterial({
    color: 0xe1b34b,
    metalness: 0.62,
    roughness: 0.3,
    clearcoat: 0.7,
  });
  const carbon = new THREE.MeshStandardMaterial({
    color: 0x202620,
    metalness: 0.45,
    roughness: 0.48,
  });
  const rubber = new THREE.MeshStandardMaterial({
    color: 0x151915,
    roughness: 0.83,
  });
  const alloy = new THREE.MeshStandardMaterial({
    color: 0xadb2a6,
    metalness: 0.8,
    roughness: 0.26,
  });
  const darkGold = new THREE.MeshStandardMaterial({
    color: 0x74613d,
    metalness: 0.62,
    roughness: 0.45,
  });
  const ivory = new THREE.MeshStandardMaterial({
    color: 0xf4f2ec,
    metalness: 0.3,
    roughness: 0.35,
  });
  const edgesMaterial = new THREE.LineBasicMaterial({
    color: 0xe6ce8d,
    transparent: true,
    opacity: 0.12,
  });
  const panelMaterials: THREE.MeshPhysicalMaterial[] = [];
  const part = () => {
    const group = new THREE.Group();
    car.add(group);
    return group;
  };
  const floor = part(),
    skeleton = part(),
    nose = part(),
    frontWing = part(),
    rearWing = part(),
    shell = part(),
    engine = part();
  const sidepods = [-1, 1].map(() => part());
  const wheels: { group: THREE.Group; x: number; z: number }[] = [];

  function mesh(
    parent: THREE.Group,
    geometry: THREE.BufferGeometry,
    material: THREE.Material,
    position: [number, number, number],
    rotation?: [number, number, number],
  ) {
    const item = new THREE.Mesh(geometry, material);
    item.position.set(...position);
    if (rotation) item.rotation.set(...rotation);
    item.castShadow = true;
    item.receiveShadow = true;
    parent.add(item);
    return item;
  }
  function box(
    parent: THREE.Group,
    size: [number, number, number],
    position: [number, number, number],
    material: THREE.Material = carbon,
  ) {
    return mesh(parent, new THREE.BoxGeometry(...size), material, position);
  }
  function rod(
    parent: THREE.Group,
    a: number[],
    b: number[],
    radius = 0.025,
    material: THREE.Material = carbon,
  ) {
    const start = new THREE.Vector3(...a),
      end = new THREE.Vector3(...b),
      vector = end.clone().sub(start);
    const cylinder = mesh(
      parent,
      new THREE.CylinderGeometry(radius, radius, vector.length(), 8),
      material,
      start.clone().add(end).multiplyScalar(0.5).toArray() as [
        number,
        number,
        number,
      ],
    );
    cylinder.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      vector.normalize(),
    );
    return cylinder;
  }
  function loft(
    parent: THREE.Group,
    sections: { x: number; width: number; bottom: number; top: number }[],
    material: THREE.Material = gold,
    panel = false,
  ) {
    const vertices: number[] = [],
      indices: number[] = [];
    sections.forEach(({ x, width, bottom, top }) =>
      vertices.push(
        x,
        bottom,
        -width,
        x,
        top,
        -width * 0.78,
        x,
        top,
        width * 0.78,
        x,
        bottom,
        width,
      ),
    );
    for (let s = 0; s < sections.length - 1; s++)
      for (let c = 0; c < 4; c++) {
        const a = s * 4 + c,
          b = s * 4 + ((c + 1) % 4),
          d = a + 4,
          e = b + 4;
        indices.push(a, b, d, b, e, d);
      }
    indices.push(0, 2, 1, 0, 3, 2);
    const last = (sections.length - 1) * 4;
    indices.push(last, last + 1, last + 2, last, last + 2, last + 3);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3),
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    let used = material;
    if (panel && material === gold) {
      const clone = gold.clone();
      clone.transparent = true;
      panelMaterials.push(clone);
      used = clone;
    }
    const item = mesh(parent, geometry, used, [0, 0, 0]);
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geometry, 28),
      edgesMaterial,
    );
    item.add(edges);
    return item;
  }

  // Low carbon floor, venturi channels and rear diffuser.
  box(floor, [4.75, 0.09, 2.05], [0.15, 0.12, 0]);
  for (const sign of [-1, 1]) {
    box(floor, [3.5, 0.12, 0.13], [0.55, 0.2, sign * 1.02], darkGold);
    for (let index = 0; index < 5; index++)
      box(
        floor,
        [0.75, 0.2, 0.025],
        [2.28, 0.2, sign * (0.12 + index * 0.18)],
      ).rotation.z = 0.18;
  }
  loft(
    skeleton,
    [
      { x: -1.35, width: 0.24, bottom: 0.22, top: 0.56 },
      { x: -0.65, width: 0.46, bottom: 0.2, top: 0.78 },
      { x: 0.5, width: 0.46, bottom: 0.22, top: 0.74 },
      { x: 1.5, width: 0.3, bottom: 0.22, top: 0.65 },
    ],
    carbon,
  );
  box(skeleton, [0.8, 0.12, 0.66], [0.06, 0.57, 0], rubber);
  const seat = mesh(
    skeleton,
    new THREE.BoxGeometry(0.17, 0.48, 0.48),
    rubber,
    [0.44, 0.78, 0],
  );
  seat.rotation.z = -0.2;

  // Long tapered nose, central pinstripe and camera stalks.
  loft(
    nose,
    [
      { x: -3.07, width: 0.12, bottom: 0.24, top: 0.38 },
      { x: -2.5, width: 0.19, bottom: 0.3, top: 0.53 },
      { x: -1.3, width: 0.25, bottom: 0.35, top: 0.78 },
      { x: -0.65, width: 0.4, bottom: 0.3, top: 0.85 },
    ],
    gold,
    true,
  );
  box(nose, [1.8, 0.012, 0.035], [-1.88, 0.63, 0], ivory).rotation.z = 0.18;
  for (const sign of [-1, 1]) {
    rod(nose, [-1.1, 0.78, sign * 0.18], [-1.05, 0.96, sign * 0.46], 0.018);
    box(nose, [0.24, 0.085, 0.12], [-1.05, 0.96, sign * 0.5], gold);
  }

  // Multi-element front aerofoil and endplates.
  for (let layer = 0; layer < 3; layer++) {
    const wing = box(
      frontWing,
      [0.24, 0.055, 3.15 - layer * 0.12],
      [-3.1 + layer * 0.19, 0.23 + layer * 0.08, 0],
      layer === 0 ? carbon : gold,
    );
    wing.rotation.z = -0.08;
  }
  for (const sign of [-1, 1]) {
    box(frontWing, [0.76, 0.33, 0.045], [-2.93, 0.35, sign * 1.57], carbon);
    box(frontWing, [0.62, 0.04, 0.075], [-2.95, 0.52, sign * 1.57], gold);
    rod(
      frontWing,
      [-2.65, 0.29, sign * 0.25],
      [-2.4, 0.48, sign * 0.16],
      0.035,
    );
  }

  // Two removable sidepod shells, with black cooling inlets.
  sidepods.forEach((group, index) => {
    const sign = index === 0 ? -1 : 1;
    const pod = loft(
      group,
      [
        { x: -0.55, width: 0.32, bottom: 0.27, top: 0.7 },
        { x: -0.1, width: 0.4, bottom: 0.25, top: 0.83 },
        { x: 0.85, width: 0.38, bottom: 0.23, top: 0.69 },
        { x: 1.86, width: 0.16, bottom: 0.22, top: 0.44 },
      ],
      gold,
      true,
    );
    pod.position.z = sign * 0.68;
    box(group, [0.05, 0.28, 0.5], [-0.57, 0.54, sign * 0.68], rubber);
    for (let i = 0; i < 7; i++)
      box(
        group,
        [0.045, 0.012, 0.34],
        [0.25 + i * 0.12, 0.76 - i * 0.02, sign * 0.69],
        carbon,
      ).rotation.z = -0.15;
    box(group, [1.65, 0.025, 0.035], [0.49, 0.36, sign * 1.02], ivory);
  });

  // Engine spine and removable upper cover.
  loft(
    shell,
    [
      { x: 0.45, width: 0.29, bottom: 0.72, top: 1.04 },
      { x: 0.8, width: 0.34, bottom: 0.6, top: 1.36 },
      { x: 1.45, width: 0.25, bottom: 0.5, top: 1.05 },
      { x: 2.35, width: 0.13, bottom: 0.36, top: 0.65 },
    ],
    gold,
    true,
  );
  const intake = mesh(
    shell,
    new THREE.CylinderGeometry(0.145, 0.19, 0.36, 24),
    carbon,
    [0.81, 1.32, 0],
    [0, 0, Math.PI / 2],
  );
  intake.scale.z = 0.82;
  box(shell, [1.55, 0.33, 0.035], [1.5, 1.07, 0], darkGold).rotation.z = -0.23;
  box(engine, [1.05, 0.36, 0.52], [1.2, 0.54, 0], alloy);
  for (const sign of [-1, 1]) {
    for (let i = 0; i < 4; i++) {
      box(
        engine,
        [0.11, 0.08, 0.37],
        [0.82 + i * 0.22, 0.78, sign * 0.25],
        carbon,
      );
      rod(
        engine,
        [1.03 + i * 0.08, 0.48, sign * 0.2],
        [1.58, 0.36, sign * 0.44],
        0.025,
        alloy,
      );
    }
    box(
      engine,
      [0.9, 0.08, 0.48],
      [0.45, 0.38, sign * 0.63],
      alloy,
    ).rotation.x = sign * 0.35;
    for (let i = 0; i < 9; i++)
      box(
        engine,
        [0.02, 0.13, 0.44],
        [0.07 + i * 0.095, 0.44, sign * 0.63],
        darkGold,
      );
  }

  // Halo cockpit surround, front pillar and steering wheel.
  const haloCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.55, 1.01, -0.35),
    new THREE.Vector3(-0.18, 1.1, -0.38),
    new THREE.Vector3(-0.57, 1.08, 0),
    new THREE.Vector3(-0.18, 1.1, 0.38),
    new THREE.Vector3(0.55, 1.01, 0.35),
  ]);
  mesh(
    skeleton,
    new THREE.TubeGeometry(haloCurve, 40, 0.035, 8, false),
    carbon,
    [0, 0, 0],
  );
  rod(skeleton, [-0.57, 0.74, 0], [-0.57, 1.08, 0], 0.027);
  const steering = mesh(
    skeleton,
    new THREE.TorusGeometry(0.14, 0.025, 8, 20),
    carbon,
    [-0.24, 0.84, 0],
    [0, Math.PI / 2, 0.1],
  );
  steering.scale.y = 0.7;

  // Rear wing, supports and small rain light.
  for (let layer = 0; layer < 2; layer++) {
    const wing = box(
      rearWing,
      [0.48, 0.07, 2.2],
      [2.68 + layer * 0.21, 1.16 + layer * 0.17, 0],
      layer ? gold : carbon,
    );
    wing.rotation.z = 0.12;
  }
  for (const sign of [-1, 1]) {
    box(rearWing, [0.85, 0.66, 0.055], [2.72, 1.12, sign * 1.1], gold);
    rod(
      rearWing,
      [2.31, 0.34, sign * 0.22],
      [2.65, 1.16, sign * 0.22],
      0.028,
      carbon,
    );
  }
  box(engine, [0.065, 0.13, 0.13], [2.45, 0.39, 0], gold);

  // Four detailed exposed wheel/suspension assemblies.
  for (const x of [-1.92, 1.96])
    for (const sign of [-1, 1]) {
      const group = part(),
        z = sign * 1.34;
      group.position.set(x, 0.55, z);
      wheels.push({ group, x, z });
      mesh(
        group,
        new THREE.CylinderGeometry(0.55, 0.55, 0.46, 48),
        rubber,
        [0, 0, 0],
        [Math.PI / 2, 0, 0],
      );
      for (const face of [-1, 1]) {
        mesh(group, new THREE.TorusGeometry(0.46, 0.072, 10, 48), rubber, [
          0,
          0,
          face * 0.23,
        ]);
        mesh(group, new THREE.TorusGeometry(0.39, 0.012, 6, 48), darkGold, [
          0,
          0,
          face * 0.258,
        ]);
        mesh(
          group,
          new THREE.CylinderGeometry(0.24, 0.24, 0.03, 24),
          carbon,
          [0, 0, face * 0.24],
          [Math.PI / 2, 0, 0],
        );
        for (let spoke = 0; spoke < 8; spoke++) {
          const angle = (spoke * Math.PI) / 4;
          const item = box(
            group,
            [0.25, 0.035, 0.035],
            [Math.cos(angle) * 0.19, Math.sin(angle) * 0.19, face * 0.26],
            alloy,
          );
          item.rotation.z = angle;
        }
        mesh(
          group,
          new THREE.CylinderGeometry(0.07, 0.07, 0.045, 12),
          gold,
          [0, 0, face * 0.27],
          [Math.PI / 2, 0, 0],
        );
      }
      for (const height of [-0.19, 0.16])
        for (const dx of [-0.45, 0.4])
          rod(
            group,
            [dx, height, -sign * 0.98],
            [0, height * 0.5, -sign * 0.18],
            0.022,
            carbon,
          );
      rod(
        group,
        [0.22, 0.25, -sign * 0.9],
        [0, -0.05, -sign * 0.19],
        0.018,
        alloy,
      );
    }

  const leaderMaterial = new THREE.LineDashedMaterial({
    color: 0xe1b34b,
    transparent: true,
    opacity: 0,
    dashSize: 0.07,
    gapSize: 0.08,
  });
  const leaderGeometry = new THREE.BufferGeometry();
  const leaderVertices = new Float32Array(11 * 6);
  leaderGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(leaderVertices, 3),
  );
  const leaders = new THREE.LineSegments(leaderGeometry, leaderMaterial);
  car.add(leaders);
  const groups = [
    nose,
    frontWing,
    rearWing,
    shell,
    ...sidepods,
    floor,
    ...wheels.map((w) => w.group),
  ];
  const anchors = [
    new THREE.Vector3(-1.8, 0.6, 0),
    new THREE.Vector3(-3.1, 0.3, 0),
    new THREE.Vector3(2.7, 1.3, 0),
    new THREE.Vector3(1.3, 1, 0),
    new THREE.Vector3(0.6, 0.5, -0.7),
    new THREE.Vector3(0.6, 0.5, 0.7),
    new THREE.Vector3(0.2, 0.1, 0),
    ...wheels.map((w) => new THREE.Vector3(w.x, 0.55, w.z)),
  ];
  const bases = groups.map((group) => group.position.clone());
  function explode(value: number) {
    nose.position.x = -value * 0.85;
    frontWing.position.set(-value * 1.35, -value * 0.18, 0);
    rearWing.position.set(value * 0.95, value * 0.6, 0);
    shell.position.y = value * 1.15;
    sidepods.forEach((group, index) =>
      group.position.set(0, value * 0.22, (index === 0 ? -1 : 1) * value * 0.8),
    );
    floor.position.y = -value * 0.6;
    wheels.forEach(({ group, x, z }) =>
      group.position.set(
        x + Math.sign(x) * value * 0.32,
        0.55 + value * 0.05,
        z + Math.sign(z) * value * 1.0,
      ),
    );
    panelMaterials.forEach((material) => (material.opacity = 1 - value * 0.28));
    edgesMaterial.opacity = 0.12 + value * 0.42;
    leaderMaterial.opacity = value * 0.32;
    groups.forEach((group, i) => {
      const a = anchors[i],
        b = a.clone().add(group.position).sub(bases[i]);
      a.toArray(leaderVertices, i * 6);
      b.toArray(leaderVertices, i * 6 + 3);
    });
    leaderGeometry.attributes.position.needsUpdate = true;
    leaders.computeLineDistances();
  }
  const dispose = () => {
    const geometries = new Set<THREE.BufferGeometry>(),
      materials = new Set<THREE.Material>();
    car.traverse((item) => {
      if (item instanceof THREE.Mesh || item instanceof THREE.LineSegments) {
        geometries.add(item.geometry);
        const list = Array.isArray(item.material)
          ? item.material
          : [item.material];
        list.forEach((material) => materials.add(material));
      }
    });
    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((material) => material.dispose());
  };
  explode(0);
  return { car, explode, dispose };
}
