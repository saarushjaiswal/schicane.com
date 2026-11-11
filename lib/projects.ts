export type Project = {
  name: string;
  repo: string;
  category: string;
  description: string;
  stack: string;
  note?: string;
};
export const projects: Project[] = [
  {
    name: "F1 Race Recaps",
    repo: "f1-race-recaps",
    category: "AI & data",
    description:
      "A Python tool that retrieves race results from the Jolpica API, organizes them with pandas, and supports AI-assisted recaps through Groq.",
    stack: "Python / pandas / APIs",
    note: "In development",
  },
  {
    name: "CrewBrew",
    repo: "CrewBrewMain",
    category: "Web",
    description:
      "A school coffee-ordering project with a storefront, sign-in, order tracking, and a Firebase-backed server.",
    stack: "JavaScript / Express / Firebase",
    note: "Collaborative project",
  },
  {
    name: "Reefscape",
    repo: "reefscape",
    category: "Robotics",
    description:
      "FRC robot code for the 2025 Reefscape season, including autonomous routines, drive controls, and robot subsystems.",
    stack: "Java / WPILib",
    note: "Team robot code",
  },
  {
    name: "TigerTrax",
    repo: "TigerTrax",
    category: "Web",
    description:
      "A school navigation page built around an embedded Mappedin map. Developed with Haneef Najum.",
    stack: "HTML / CSS / Mappedin",
  },
  {
    name: "Scouting PASS draft",
    repo: "scoutingpassdraft",
    category: "Robotics",
    description:
      "A scouting workspace based on PWNAGE Team 2451’s Scouting PASS, with match and pit scouting configurations for Reefscape.",
    stack: "JavaScript / HTML / QR codes",
    note: "Based on an existing open-source project",
  },
  {
    name: "AP Research Survey",
    repo: "APResearchSurvey",
    category: "Web",
    description:
      "A browser-based horoscope study with survey and debrief screens, created for an AP Research project.",
    stack: "HTML / CSS / JavaScript",
    note: "Research project",
  },
  {
    name: "FHS AI",
    repo: "fhs.ai",
    category: "AI & data",
    description:
      "An early Python AI-agent experiment, preserved as a small learning repository.",
    stack: "Python",
    note: "Experiment",
  },
  {
    name: "NextUp Stats Showdown",
    repo: "NextUpStatsShowdown2025",
    category: "AI & data",
    description:
      "A collection of NCAA basketball datasets and supporting documents for the 2025 Stats Showdown competition.",
    stack: "CSV / Excel / Data",
    note: "Dataset workspace",
  },
  {
    name: "CrewBrew FHS",
    repo: "CrewBrewFHS",
    category: "Web",
    description:
      "An earlier CrewBrew web repository with school ordering, login, and order-status pages.",
    stack: "HTML / CSS / JavaScript",
    note: "Earlier version",
  },
  {
    name: "Think-Co",
    repo: "Think-Co",
    category: "Web",
    description:
      "An early website collection with science and publication pages.",
    stack: "HTML / CSS",
    note: "Early work",
  },
  {
    name: "Schicane, early site",
    repo: "schicane",
    category: "Web",
    description:
      "The original Schicane landing page and brand assets, before this portfolio.",
    stack: "HTML / CSS",
    note: "Archive",
  },
  {
    name: "Schicane.com",
    repo: "schicane.com",
    category: "Web",
    description:
      "This portfolio. A statically exported Next.js site with a source-backed project directory.",
    stack: "Next.js / React / TypeScript",
  },
  {
    name: "Runtime Components",
    repo: "runtime-components",
    category: "Coursework",
    description:
      "CS 19300 runtime configuration files and an installation script.",
    stack: "Configuration / Scripts",
    note: "Coursework",
  },
  {
    name: "Pair programming assignment",
    repo: "pso6-team",
    category: "Coursework",
    description:
      "A CS193 assignment covering pairing, forks, and pull requests.",
    stack: "Git / GitHub",
    note: "Coursework",
  },
  {
    name: "Open Lovable",
    repo: "open-lovable",
    category: "Forks",
    description:
      "A fork of Open Lovable, an existing project for recreating websites as React applications.",
    stack: "React / AI tooling",
    note: "Fork; upstream project",
  },
  {
    name: "FRC 5010 practice",
    repo: "FRC5010ExamplePractice",
    category: "Forks",
    description:
      "A fork of FRC example code used as a robotics practice workspace.",
    stack: "Java / WPILib",
    note: "Fork; example code",
  },
];
export const emptyRepositories = [
  "UltimateSupreme.com",
  "ultimatesupreme.github.io",
  "GetToKnowMe5",
  "CrewBrew",
  "kayu3dprinter",
  "sprintify",
  "MediCane",
  "CrewBrew2026",
];
export const repoUrl = (repo: string) =>
  `https://github.com/saarushjaiswal/${repo}`;
