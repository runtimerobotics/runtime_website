// Curated public repositories shown on the homepage; star counts are fetched at build time.
export const openSource = [
  { repo: 'fusion360-urdf-ros2', title: 'Fusion 360 → URDF for ROS 2', kind: 'Tool', text: 'Export Fusion 360 robot designs to URDF for ROS 2. Featured in Mastering ROS 2 for Robotics Programming.' },
  { repo: 'ros2_gui_installer', title: 'ROS 2 GUI Installer', kind: 'Tool', text: 'Beginner-friendly GTK4 installer for ROS 2 Humble, Jazzy and Lyrical, with simulation, Nav2 and MoveIt 2 options.' },
  { repo: 'ros2_oneline_install', title: 'ROS 2 One-line Install', kind: 'Tool', text: 'Install or remove a ROS 2 distribution with a single command.' },
  { repo: 'roscon_2025_physical_ai_workshop', title: 'ROSCon 2025 Physical AI Workshop', kind: 'Workshop', text: 'Docker template for the Physical AI workshop at ROSCon 2025.' },
  { repo: 'packt_physical_ai_workshop', title: 'Physical AI with ROS 2', kind: 'Workshop', text: 'Building intelligent robots with ROS 2: perception, planning, control and real-world deployment.' },
  { repo: 'vlm_packt_workshop', title: 'VLM Robotics Workshop', kind: 'Workshop', text: 'Vision-language models on TurtleBot 4, Unitree Go2, Franka and Spot in ROS 2 and Gazebo.' },
  { repo: 'Sim-to-Real-SO-101-Workshop', title: 'Sim-to-Real with SO-101', kind: 'Workshop', text: 'An end-to-end Physical AI workflow with the SO-101 arm, Isaac Lab and Isaac GR00T.' },
  { repo: 'IsaacLabTutorial', title: 'Isaac Lab Tutorial', kind: 'Workshop', text: 'Hands-on tutorial project for learning NVIDIA Isaac Lab.' }
];

export async function starCounts(): Promise<Record<string, number>> {
  try {
    const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const res = await fetch('https://api.github.com/users/runtimerobotics/repos?type=owner&per_page=100', { headers, signal: AbortSignal.timeout(8000) });
    if (!res.ok) return {};
    const repos: { name: string; stargazers_count: number }[] = await res.json();
    return Object.fromEntries(repos.map((r) => [r.name, r.stargazers_count]));
  } catch {
    return {}; // offline or rate-limited: cards render without star counts
  }
}
