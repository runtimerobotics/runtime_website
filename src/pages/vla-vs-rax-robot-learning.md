---
layout: ../layouts/BlogPostLayout.astro
title: "VLA vs RAX: Beyond Imitation Learning?"
description: "Two paths to robot learning: Vision-Language-Action models that learn from demonstrations, and RAX coding agents that explore and write their own reusable skills."
image: "images/revised/vla-vs-rax-hero.jpg"
date: "2026-11-07"
---

![VLA vs RAX: two paths to robot learning](/images/revised/vla-vs-rax-hero.webp)

*By Lentin Joseph, CEO, RUNTIME Robotics*

Most Vision-Language-Action (VLA) models learn robot behaviors by imitating demonstrations, usually collected through hours of teleoperation. But what if a robot could explore, experiment, learn from its failures and write its own executable skills?

That is the idea behind **RAX (Robot Agent eXploration)**, a recent research project that uses LLM-powered coding agents to discover robot behaviors through online exploration, without action demonstrations, hand-engineered action primitives or policy training. It's an interesting new direction for Physical AI.

## Two ways to learn

Both approaches start from the same goal: turn observations into actions. They differ in *where the learned behavior lives*.

- **VLA, a learned policy.** A neural network learns actions from robot experience. The behavior lives in the model's **weights**.
- **RAX, a code agent.** An LLM discovers skills through online trials. The behavior lives in **programs** you can read.

<figure class="diagram">
<svg viewBox="0 0 640 470" role="img" aria-labelledby="vla-rax-title vla-rax-desc" xmlns="http://www.w3.org/2000/svg" font-family="Ubuntu, system-ui, sans-serif">
<title id="vla-rax-title">VLA and RAX learning loops</title>
<desc id="vla-rax-desc">VLA turns vision and an instruction into robot actions through a neural action model trained on demonstrations. RAX turns a goal and camera state into a reusable robot program, with an LLM that writes, tests and rewrites code. Both run on safe low-level control.</desc>
<defs>
<marker id="arrow-vla" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#4c9bff"/></marker>
<marker id="arrow-rax" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#f2994a"/></marker>
</defs>
<text x="160" y="40" text-anchor="middle" fill="#4c9bff" font-size="22" font-weight="700">VLA</text>
<text x="160" y="64" text-anchor="middle" fill="#9fb0c6" font-size="17">behavior in weights</text>
<text x="480" y="40" text-anchor="middle" fill="#f2994a" font-size="22" font-weight="700">RAX</text>
<text x="480" y="64" text-anchor="middle" fill="#9fb0c6" font-size="17">behavior in programs</text>
<g font-size="17" text-anchor="middle" fill="#ffffff">
<rect x="40" y="84" width="240" height="60" rx="12" fill="#0e1a2c" stroke="#4c9bff" stroke-width="1.5"/>
<text x="160" y="120">Vision + instruction</text>
<rect x="40" y="194" width="240" height="60" rx="12" fill="#13305a" stroke="#4c9bff" stroke-width="1.5"/>
<text x="160" y="230">Neural action model</text>
<rect x="40" y="304" width="240" height="60" rx="12" fill="#0e1a2c" stroke="#4c9bff" stroke-width="1.5"/>
<text x="160" y="340">Robot action</text>
<rect x="360" y="84" width="240" height="60" rx="12" fill="#0e1a2c" stroke="#f2994a" stroke-width="1.5"/>
<text x="480" y="120">Goal + camera / state</text>
<rect x="360" y="194" width="240" height="60" rx="12" fill="#4a2a10" stroke="#f2994a" stroke-width="1.5"/>
<text x="480" y="230">LLM writes &amp; tests code</text>
<rect x="360" y="304" width="240" height="60" rx="12" fill="#0e1a2c" stroke="#f2994a" stroke-width="1.5"/>
<text x="480" y="340">Reusable robot program</text>
</g>
<g stroke-width="2" fill="none">
<path d="M160 146V190M160 256V300" stroke="#4c9bff" marker-end="url(#arrow-vla)"/>
<path d="M480 146V190M480 256V300" stroke="#f2994a" marker-end="url(#arrow-rax)"/>
<path d="M602 210C632 210 632 240 604 240" stroke="#f2994a" stroke-dasharray="4 4" marker-end="url(#arrow-rax)"/>
</g>
<text x="172" y="175" fill="#9fb0c6" font-size="16">trained on demos</text>
<text x="470" y="285" text-anchor="end" fill="#f2994a" font-size="16">try · fail · rewrite</text>
<rect x="40" y="396" width="560" height="50" rx="12" fill="#1b2a40" stroke="#4d6380"/>
<text x="320" y="427" text-anchor="middle" fill="#d6e0ec" font-size="17">Safe low-level control · robot APIs · controllers</text>
</svg>
<figcaption>Both loops still rely on safe low-level control. RAX builds on existing robot APIs and controllers.</figcaption>
</figure>

## Where each one excels

**VLA** is strong at continuous, contact-rich motion: grasping, dexterous handling and learned visuomotor control. Its challenges are the cost of training data, GPU compute, and domain shift when the robot meets a new environment.

**RAX** is strong at self-exploration, producing reusable skills you can inspect. Its challenges are slow discovery, safety risks while exploring, and programs that can be brittle. The key distinction: RAX **doesn't need action demonstrations or teleoperation data**. A new robot is integrated through its APIs alone.

## Which fits the task?

| Task type | VLA | RAX |
|---|---|---|
| Continuous motor control | Strong fit | Needs a controller |
| Learning without demos | Usually harder | Core advantage |
| Long-horizon routines | Needs orchestration | Skill composition |
| Readable task logic | Limited | Code can be audited |
| Real-world reliability | Task-dependent | Task-dependent |

## What the RAX paper reports

According to [Huang et al. (2026)](https://arxiv.org/abs/2610.22496):

- **More exploration, better results.** On unseen simulation scenes, the score rises from **25% after 4 exploration episodes to 79% after 128**, against a previous best of 41.2%.
- **+37.4 percentage points** on average over the top baselines, across five simulation benchmarks.
- **Real robots, no demonstrations.** RAX learned high-precision, deformable, articulated and long-horizon mobile manipulation tasks on real robots, reusing verified skills from earlier sessions.

These are the authors' own benchmark results. They show RAX works on real hardware, but not yet the long-term reliability that production deployments need.

## Related approaches

RAX isn't alone. Several other projects explore robots that improve through their own execution:

- **[ASPIRE](https://research.nvidia.com/labs/gear/aspire/)** (Agentic Skill Programming through Iterative Robot Exploration), from NVIDIA's GEAR lab: writes code-as-policy robot programs, diagnoses failures from execution feedback, repairs them and saves reusable skills.
- **[SEAR](https://sear.bot/)** (Self-Evolving Agentic Robotics): language agents refine control code, carry skills and memories across tasks, and train action models on their own rollouts. It already mixes code and learned models.
- **[RHO](https://rho-robotics.github.io/)** (Robotics Harness Optimization): a coding agent rewrites a robot's control code in simulation until it solves the task. It reports 99.0% on the Robosuite benchmark with zero demonstrations, and the code runs unchanged on real Franka and Kinova arms.
- **[RoboClaw](https://roboclaw-agibot.github.io/)** (Agentic Robotics Framework): a single vision-language model runs data collection, policy training and task execution for long-horizon manipulation. Each action is paired with a recovery action, so the robot can reset itself and keep collecting data. It's another example of an agent working with learned VLA policies.

Their learning mechanisms differ, but they all point toward robots that can grow their own capabilities from experience.

## The interesting direction: VLA + RAX

I don't see these as competitors. A promising architecture combines them:

- **RAX** explores the task, generates a program and verifies the skill.
- **VLA** executes learned motor behaviors where code alone falls short.

The hard part is making such systems reliable, efficient and safe enough for real-world deployment. That means the same evaluation ladders, safety layers and staged rollouts we cover in [Physical AI in Production](/physical-ai-in-production/).

## Explore the research

- **RAX:** [Project page](https://robot-agent-exploration.com/) · [Paper (arXiv:2610.22496)](https://arxiv.org/abs/2610.22496) · [GitHub](https://github.com/robot-agent-exploration/rax)
- **ASPIRE:** [research.nvidia.com/labs/gear/aspire](https://research.nvidia.com/labs/gear/aspire/)
- **SEAR:** [sear.bot](https://sear.bot/)
- **RHO:** [rho-robotics.github.io](https://rho-robotics.github.io/)
- **RoboClaw:** [roboclaw-agibot.github.io](https://roboclaw-agibot.github.io/)

Will autonomous exploration and self-improving robot agents reduce our dependence on teleoperation and demonstration datasets? And what would you benchmark first? If you're exploring VLA or agentic robotics for your own robots, [get in touch with RUNTIME Robotics](/#contact).
