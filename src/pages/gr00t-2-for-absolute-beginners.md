---
layout: ../layouts/BlogPostLayout.astro
title: "GR00T 2 for Absolute Beginners"
description: "A plain-language guide to NVIDIA GR00T 2, the robot foundation model that imagines the future before it moves: what a world-action model is, how it learns from human video, and what it can do."
image: "images/revised/gr00t-2-beginners-cover.jpg"
date: "2026-11-11"
author: "Lentin Joseph"
service: "vla-vlm-robotics"
tags: ["VLA", "Robot learning", "Physical AI"]
---

![GR00T 2 for Absolute Beginners: past camera frames and an instruction flow into a world-action model, which imagines future frames and outputs robot actions](/images/revised/gr00t-2-beginners-cover.webp)

Before you pour a glass of water, you already "see" it in your head: the jug tilts, the water flows, the glass fills up. You picture what will happen, then your hands follow that picture.

**GR00T 2**, the new robot foundation model from NVIDIA's GEAR research lab, released in November 2026, works the same way. Before it moves, it **imagines a short video of what is about to happen**, then produces the movements that make that future come true. NVIDIA calls this kind of model a **world-action model**, or **WAM**.

This guide explains GR00T 2 from scratch. You don't need any AI or robotics background. If you'd like a warm-up first, read our [VLA Models for Absolute Beginners](/vla-for-absolute-beginners/) guide; GR00T 2 builds on the same ideas.

> **Where the numbers come from:** everything in this post is taken from NVIDIA's [GR00T 2 project page](https://research.nvidia.com/labs/gear/gr00t-2/) and [whitepaper](https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf). They are NVIDIA's own lab results, usually measured over 20 trials per task.

## From GR00T to GR00T 2: what changed?

Earlier GR00T models (GR00T N1 and its updates up to GR00T 1.7) are **vision-language-action models (VLAs)**. A VLA looks through the robot's cameras, reads an instruction such as *"put the battery in the flashlight"* and answers with **actions**: small movements for the robot's arms and hands.

GR00T 2 adds one big step in the middle. It doesn't only answer *"what should I do?"*. It also answers *"what will the world look like while I do it?"*

<figure class="diagram">
<svg viewBox="0 0 660 330" role="img" aria-labelledby="g1-title g1-desc" xmlns="http://www.w3.org/2000/svg" font-family="Ubuntu, system-ui, sans-serif">
<title id="g1-title">VLA compared with a world-action model</title>
<desc id="g1-desc">A VLA takes camera images and an instruction and outputs only actions. A world-action model like GR00T 2 takes the same inputs and outputs both a predicted future video and the actions.</desc>
<defs><marker id="g1-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#9fb0c6"/></marker></defs>
<g font-size="15" fill="#ffffff" text-anchor="middle">
<text x="20" y="28" text-anchor="start" font-size="14" fill="#9fb0c6">A VLA (for example, GR00T 1.7)</text>
<rect x="20" y="42" width="190" height="80" rx="12" fill="#0e1a2c" stroke="#4d6380"/><text x="115" y="78">Cameras + instruction</text><text x="115" y="100" font-size="13" fill="#9fb0c6">"Put the battery in"</text>
<rect x="250" y="42" width="160" height="80" rx="12" fill="#13305a" stroke="#4c9bff"/><text x="330" y="89" font-size="20" font-weight="700">VLA</text>
<rect x="450" y="42" width="190" height="80" rx="12" fill="#0e1a2c" stroke="#4d6380"/><text x="545" y="78">Actions only</text><text x="545" y="100" font-size="13" fill="#9fb0c6">move · rotate · grip</text>
<text x="20" y="168" text-anchor="start" font-size="14" fill="#9fb0c6">A world-action model (GR00T 2)</text>
<rect x="20" y="182" width="190" height="130" rx="12" fill="#0e1a2c" stroke="#76b900"/><text x="115" y="240">Cameras + instruction</text><text x="115" y="262" font-size="13" fill="#9fb0c6">+ the robot's state</text>
<rect x="250" y="182" width="160" height="130" rx="12" fill="#1f3308" stroke="#76b900"/><text x="330" y="240" font-size="20" font-weight="700">GR00T 2</text><text x="330" y="264" font-size="13" fill="#c6e59a">world-action model</text>
<rect x="450" y="182" width="190" height="58" rx="12" fill="#0e1a2c" stroke="#76b900"/><text x="545" y="207" fill="#c6e59a" font-weight="700">Imagined future video</text><text x="545" y="227" font-size="13" fill="#9fb0c6">what the cameras will see</text>
<rect x="450" y="254" width="190" height="58" rx="12" fill="#0e1a2c" stroke="#f2994a"/><text x="545" y="279" fill="#f2994a" font-weight="700">Robot actions</text><text x="545" y="299" font-size="13" fill="#9fb0c6">that make it happen</text>
</g>
<g stroke="#9fb0c6" stroke-width="2" fill="none" marker-end="url(#g1-arrow)">
<path d="M212 82H246"/><path d="M412 82H446"/><path d="M212 247H246"/><path d="M412 230L446 214"/><path d="M412 264L446 280"/>
</g>
</svg>
<figcaption>A VLA only acts. A world-action model imagines the result and acts.</figcaption>
</figure>

Why bother imagining a video? Three reasons, which the rest of this guide unpacks:

1. **It can learn from ordinary videos of people.** A video of someone assembling a toy contains no robot commands, so a normal VLA can't learn much from it. But a model that predicts *what happens next* can learn from any video of hands at work.
2. **It understands physics better.** To predict the next frame, the model has to learn how objects fall, slide, bend and fit together.
3. **Its plans are easy to check and steer.** Because it shows what it intends to do, other software can watch, correct or guide it.

## How GR00T 2 works, step by step

GR00T 2 runs in a loop. Several times a second it repeats the same four steps:

<figure class="diagram">
<svg viewBox="0 0 680 300" role="img" aria-labelledby="g2-title g2-desc" xmlns="http://www.w3.org/2000/svg" font-family="Ubuntu, system-ui, sans-serif">
<title id="g2-title">The GR00T 2 control loop</title>
<desc id="g2-desc">Step one: look at the last 0.8 seconds from up to four cameras. Step two: read the instruction and robot state. Step three: one transformer imagines future video and an action chunk together. Step four: the robot executes the chunk while the next one is computed, and the loop repeats.</desc>
<defs><marker id="g2-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#9fb0c6"/></marker></defs>
<g font-size="15" fill="#ffffff" text-anchor="middle">
<rect x="15" y="40" width="150" height="150" rx="12" fill="#0e1a2c" stroke="#4d6380"/><text x="90" y="72" font-weight="700">1. Look</text><text x="90" y="100" font-size="13" fill="#9fb0c6">last 0.8 seconds</text><text x="90" y="120" font-size="13" fill="#9fb0c6">head camera +</text><text x="90" y="140" font-size="13" fill="#9fb0c6">both wrist cameras</text>
<rect x="34" y="152" width="34" height="24" rx="3" fill="#24364f"/><rect x="73" y="152" width="34" height="24" rx="3" fill="#24364f"/><rect x="112" y="152" width="34" height="24" rx="3" fill="#24364f"/>
<rect x="185" y="40" width="150" height="150" rx="12" fill="#0e1a2c" stroke="#4d6380"/><text x="260" y="72" font-weight="700">2. Read</text><text x="260" y="100" font-size="13" fill="#9fb0c6">the instruction</text><text x="260" y="120" font-size="13" fill="#9fb0c6">and the robot's</text><text x="260" y="140" font-size="13" fill="#9fb0c6">joint positions</text><text x="260" y="170" font-size="13" fill="#c6e59a">"Assemble the truck"</text>
<rect x="355" y="40" width="150" height="150" rx="12" fill="#1f3308" stroke="#76b900"/><text x="430" y="72" font-weight="700">3. Imagine</text><text x="430" y="100" font-size="13" fill="#c6e59a">one transformer</text><text x="430" y="120" font-size="13" fill="#c6e59a">predicts future</text><text x="430" y="140" font-size="13" fill="#c6e59a">video + actions</text><text x="430" y="166" font-size="13" fill="#c6e59a">together</text>
<rect x="525" y="40" width="140" height="150" rx="12" fill="#4a2a10" stroke="#f2994a"/><text x="595" y="72" font-weight="700">4. Act</text><text x="595" y="100" font-size="13" fill="#f6c89a">robot runs the</text><text x="595" y="120" font-size="13" fill="#f6c89a">action chunk</text><text x="595" y="140" font-size="13" fill="#f6c89a">while the next</text><text x="595" y="160" font-size="13" fill="#f6c89a">one is computed</text>
<text x="340" y="282" font-size="14" fill="#9fb0c6">repeat, many times per task</text>
</g>
<g stroke="#9fb0c6" stroke-width="2" fill="none" marker-end="url(#g2-arrow)">
<path d="M167 115H181"/><path d="M337 115H351"/><path d="M507 115H521"/><path d="M595 194V245H90V196"/>
</g>
</svg>
<figcaption>GR00T 2's loop: look, read, imagine, act, and repeat.</figcaption>
</figure>

In a little more detail:

- **What goes in:** about 0.8 seconds of recent video from up to four cameras (usually one on the robot's head and one on each wrist), the robot's current joint positions, and a plain-language instruction.
- **What comes out:** a short **action chunk** (the next stretch of movements) plus the **predicted future frames for every camera**.
- **Speed:** on a single GeForce RTX 5090 graphics card, GR00T 2 predicts each action chunk in about 153 milliseconds. The robot executes one chunk while the next is being computed, so motion stays smooth.

### What's inside the model

You can think of GR00T 2 as four parts working together:

| Part | What it does | Plain-language version |
|---|---|---|
| Video compressor (Wan 2.1 VAE) | Shrinks each camera stream into compact "video tokens" | Turns video into a short summary the model can handle |
| Language reader (Cosmos-Reason1) | Encodes the instruction | Understands what you asked for |
| Main transformer (2 billion parameters) | Predicts future video tokens and actions together | The "imagination" and the "decision" in one brain |
| Small per-robot heads | Convert between the robot's body and the transformer | Adapters, so one brain can drive many different bodies |

The main transformer starts life as **Cosmos-Predict2.5**, an NVIDIA model trained to generate realistic videos of the physical world. GR00T 2 takes that "video imagination" and teaches it to also produce robot actions.

Inside, the **action tokens can look at the imagined future video** while they are being generated. In other words, the actions follow the future the model pictures.

### How it "imagines": cleaning up noise

GR00T 2 generates video and actions with a technique related to the **diffusion models** behind AI image generators. It starts from random noise and cleans it up, step by step, until a sharp prediction appears. GR00T 2 needs only a few of these clean-up steps: one or two for video and two to four for actions. That is part of why it is fast enough to control a real robot.

<figure class="diagram">
<svg viewBox="0 0 660 200" role="img" aria-labelledby="g3-title g3-desc" xmlns="http://www.w3.org/2000/svg" font-family="Ubuntu, system-ui, sans-serif">
<title id="g3-title">Denoising from noise to a prediction</title>
<desc id="g3-desc">A noisy frame and a jittery action path become, after a few clean-up steps, a sharp predicted frame and a smooth action path.</desc>
<defs><marker id="g3-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#9fb0c6"/></marker>
<pattern id="g3-noise" width="12" height="12" patternUnits="userSpaceOnUse"><rect width="12" height="12" fill="#24364f"/><rect x="0" y="0" width="4" height="4" fill="#4d6380"/><rect x="6" y="4" width="4" height="4" fill="#9fb0c6"/><rect x="2" y="8" width="4" height="4" fill="#13305a"/><rect x="8" y="9" width="3" height="3" fill="#76b900"/></pattern></defs>
<g font-size="14" fill="#ffffff" text-anchor="middle">
<rect x="20" y="30" width="150" height="100" rx="8" fill="url(#g3-noise)" stroke="#4d6380"/><text x="95" y="160" fill="#9fb0c6">random noise</text>
<rect x="255" y="30" width="150" height="100" rx="8" fill="#1a2a40" stroke="#4d6380"/><rect x="290" y="70" width="40" height="30" rx="4" fill="#4d6380" opacity=".7"/><circle cx="360" cy="80" r="14" fill="#9fb0c6" opacity=".5"/><text x="330" y="160" fill="#9fb0c6">a step or two later</text>
<rect x="490" y="30" width="150" height="100" rx="8" fill="#0e1a2c" stroke="#76b900"/><rect x="520" y="72" width="44" height="34" rx="4" fill="#f2994a"/><circle cx="600" cy="82" r="14" fill="#4c9bff"/><path d="M500 118H630" stroke="#4d6380" stroke-width="3"/><text x="565" y="160" fill="#c6e59a">sharp prediction</text>
<text x="330" y="190" font-size="13" fill="#9fb0c6">The same clean-up turns jittery noise into a smooth action chunk.</text>
</g>
<g stroke="#9fb0c6" stroke-width="2" fill="none" marker-end="url(#g3-arrow)"><path d="M175 80H250"/><path d="M410 80H485"/></g>
</svg>
<figcaption>From noise to a plan in a few steps. GR00T 2 does this for video and actions at the same time.</figcaption>
</figure>

## Where GR00T 2 learns from

Robot data is expensive: every hour needs a robot and a person to control it. Videos of people working are far more plentiful. GR00T 2 is pretrained on a mix of three kinds of data:

<figure class="diagram">
<svg viewBox="0 0 660 260" role="img" aria-labelledby="g4-title g4-desc" xmlns="http://www.w3.org/2000/svg" font-family="Ubuntu, system-ui, sans-serif">
<title id="g4-title">GR00T 2 pretraining data</title>
<desc id="g4-desc">About 402,730 hours of egocentric human video, 10,184 hours of handheld UMI gripper demonstrations and 23,500 hours of robot teleoperation. Human video is more than ten times the other two combined.</desc>
<g font-size="15" fill="#ffffff">
<text x="20" y="50">Human video</text><text x="20" y="70" font-size="13" fill="#9fb0c6">people at work, head camera</text>
<rect x="230" y="34" width="400" height="34" rx="6" fill="#76b900"/><text x="620" y="57" text-anchor="end" fill="#0b1220" font-weight="700">402,730 hours</text>
<text x="20" y="130">Robot teleoperation</text><text x="20" y="150" font-size="13" fill="#9fb0c6">arms, dexterous hands, humanoid</text>
<rect x="230" y="114" width="23" height="34" rx="6" fill="#f2994a"/><text x="264" y="137">23,500 hours</text>
<text x="20" y="210">Handheld UMI gripper</text><text x="20" y="230" font-size="13" fill="#9fb0c6">demos without a robot</text>
<rect x="230" y="194" width="10" height="34" rx="4" fill="#4c9bff"/><text x="252" y="217">10,184 hours</text>
</g>
</svg>
<figcaption>Bars drawn to scale. Most of what GR00T 2 sees is people, not robots.</figcaption>
</figure>

- **Human video** comes from NVIDIA's *Human-1M* collection of first-person footage of people working with their hands. 100,000 hours of it are openly available as [Human-1M-100K on Hugging Face](https://huggingface.co/datasets/nvidia/PhysicalAI-Human-1M-100K).
- **UMI demonstrations** are recorded with a [handheld gripper](https://research.nvidia.com/labs/gear/hardware-prototypes/GEAR_UMI/index.html), a "robot hand on a stick" that a person carries around. No robot is needed, so collecting data is fast.
- **Teleoperation** is a person remotely driving a real robot: two-finger gripper arms (YAM and Franka), five-fingered robot hands (Sharpa and Wuji) and the Unitree G1 humanoid.

**Does the human video really help?** NVIDIA tested it. They trained versions of the model with none, 1%, 10% and 100% of the human video, then tested each on 72 tasks. On the real robot, average task progress rose at every step, **from 50% to 70%**, and it had not levelled off at the largest amount tested.

Training happens in three stages: first the model learns to predict video of hands at work; then it learns video and actions together; finally it focuses more on robot data, so its actions fit real robot bodies.

## Three new abilities, explained simply

### 1. Learning from people, not robots ("X-Adapt")

This is the headline result. GR00T 2 can do a task on a robot that **never practised it**, after only seeing it done by:

- **People with cameras on their head and wrists.** A robot with two five-fingered hands lined a lab funnel with filter paper and wet it with a wash bottle in **65%** of trials. Nobody ever remote-controlled the robot through that task.
- **A handheld gripper.** Shown only UMI gripper demonstrations, a YAM robot arm assembled a toy dump truck end to end in **60%** of trials, a task that can take up to four minutes.
- **A wearable robot hand.** Using DexUMI, a glove-like exoskeleton that copies a robot hand's joints, people demonstrated breakfast tasks and even striking a match to light a lamp. The robot learned these from the wearable demonstrations alone.

The trick is that the robot still needs some general "play" data, recorded without any particular task, so the model learns how *its own body* looks and moves. The human or gripper demonstrations then teach the *task*. NVIDIA calls this cross-adaptation, or **X-Adapt**.

### 2. New tasks from a handful of demos

NVIDIA picked 50 tasks that a two-handed robot had **never** done itself (they appeared only in human video or in other robots' data).

<figure class="diagram">
<svg viewBox="0 0 640 260" role="img" aria-labelledby="g5-title g5-desc" xmlns="http://www.w3.org/2000/svg" font-family="Ubuntu, system-ui, sans-serif">
<title id="g5-title">Success on 50 new tasks</title>
<desc id="g5-desc">Average success over 50 tasks new to the robot: 40 percent with zero demonstrations, 71 percent with one demonstration per task, and 95 percent with five demonstrations per task.</desc>
<g font-size="15" fill="#ffffff" text-anchor="middle">
<path d="M60 210H600" stroke="#4d6380" stroke-width="2"/>
<rect x="110" y="138" width="110" height="72" rx="6" fill="#4c9bff"/><text x="165" y="128" font-size="20" font-weight="700">40%</text><text x="165" y="234">0 demos</text><text x="165" y="252" font-size="13" fill="#9fb0c6">zero-shot</text>
<rect x="265" y="82" width="110" height="128" rx="6" fill="#76b900"/><text x="320" y="72" font-size="20" font-weight="700">71%</text><text x="320" y="234">1 demo</text><text x="320" y="252" font-size="13" fill="#9fb0c6">per task</text>
<rect x="420" y="39" width="110" height="171" rx="6" fill="#f2994a"/><text x="475" y="29" font-size="20" font-weight="700">95%</text><text x="475" y="234">5 demos</text><text x="475" y="252" font-size="13" fill="#9fb0c6">under 3 minutes of data</text>
</g>
</svg>
<figcaption>Average success over 50 tasks the robot had never done. Each adaptation is a 30-minute fine-tune on one RTX 5090.</figcaption>
</figure>

With no extra robot data at all, GR00T 2 already succeeded **40%** of the time. Most failures weren't "wrong plan" failures: the model did the right steps in the right order, and one step lacked precision. Five demonstrations per task, **less than three minutes of robot data**, raised success to **95%**. Each of those adaptations took about **30 minutes of training on a single RTX 5090**, a card you can put in a desktop PC.

One fair caveat from the paper itself: these 50 tasks were chosen among those the model *can* learn with five demos, so the 95% is high partly by design. It still shows how little data a strong pretrained model needs.

### 3. Working with a "thinking" AI ("Agentic GR00T 2")

GR00T 2 is good at the *how*: the fiddly hand movements that are hard to program. Large reasoning models (the AI behind advanced chatbots) are good at the *what*: breaking a long job into steps and checking progress. NVIDIA connects the two through a **WAM API**, so the reasoning model can call GR00T 2 like a tool.

- **Agentic control.** The reasoning model watches GR00T 2 work, and when a part drops or progress stalls, it fixes the scene and hands control back. Together they assembled three different toys in **292 of 300** attempts, starting each time from parts dumped in a pile.
- **Visual steering.** Instead of only giving words, the reasoning model draws marks on GR00T 2's camera image: "grab here, put it there". On short pick-and-place steps this raised success from **40% to 92%** on the YAM arm.

This split is often described as "think slow, move fast". The reasoning model thinks slowly about the plan. GR00T 2 moves quickly and precisely.

## GR00T 2 Turbo: a version small enough for a humanoid

A humanoid has to run its brain **on board**, on a much smaller computer than a desktop GPU. So NVIDIA made **GR00T 2 Turbo**. It keeps the same 2-billion-parameter transformer but compresses video much harder, so there are far fewer video tokens to predict.

<figure class="diagram">
<svg viewBox="0 0 680 230" role="img" aria-labelledby="g6-title g6-desc" xmlns="http://www.w3.org/2000/svg" font-family="Ubuntu, system-ui, sans-serif">
<title id="g6-title">Think slow, move fast on a Unitree G1</title>
<desc id="g6-desc">A reasoning model picks the task. GR00T 2 Turbo on the robot's Jetson Thor imagines and plans whole-body motion about once per second. The SONIC whole-body controller turns that plan into joint targets 50 times per second, and the G1's motors follow them 1000 times per second.</desc>
<defs><marker id="g6-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#9fb0c6"/></marker></defs>
<g font-size="15" fill="#ffffff" text-anchor="middle">
<rect x="10" y="50" width="140" height="110" rx="12" fill="#13305a" stroke="#4c9bff"/><text x="80" y="90" font-weight="700">Reasoning</text><text x="80" y="110" font-weight="700">model</text><text x="80" y="138" font-size="13" fill="#9fb0c6">picks the task</text>
<rect x="180" y="50" width="150" height="110" rx="12" fill="#1f3308" stroke="#76b900"/><text x="255" y="90" font-weight="700">GR00T 2 Turbo</text><text x="255" y="114" font-size="13" fill="#c6e59a">imagines + plans</text><text x="255" y="138" font-size="13" fill="#c6e59a">~1 time per second</text>
<rect x="360" y="50" width="150" height="110" rx="12" fill="#4a2a10" stroke="#f2994a"/><text x="435" y="90" font-weight="700">SONIC</text><text x="435" y="114" font-size="13" fill="#f6c89a">whole-body control</text><text x="435" y="138" font-size="13" fill="#f6c89a">50 times per second</text>
<rect x="540" y="50" width="130" height="110" rx="12" fill="#0e1a2c" stroke="#4d6380"/><text x="605" y="90" font-weight="700">Unitree G1</text><text x="605" y="114" font-size="13" fill="#9fb0c6">motors</text><text x="605" y="138" font-size="13" fill="#9fb0c6">1,000 per second</text>
<path d="M175 190H675" stroke="#76b900" stroke-dasharray="5 5" fill="none"/><text x="425" y="214" font-size="13" fill="#c6e59a">everything to the right of the reasoning model runs on the robot</text>
</g>
<g stroke="#9fb0c6" stroke-width="2" fill="none" marker-end="url(#g6-arrow)"><path d="M152 105H176"/><path d="M332 105H356"/><path d="M512 105H536"/></g>
</svg>
<figcaption>Each layer runs faster than the one above it: plan slowly, balance and move quickly.</figcaption>
</figure>

On the Unitree G1 humanoid, Turbo runs on the robot's own **Jetson Thor** computer and makes each prediction in **124 milliseconds**. It doesn't drive the motors directly. It sends a plan to **SONIC**, a whole-body controller that keeps the robot balanced while it walks, bends and reaches. Together they scooped and served popcorn in **all 48 trials** and cleared a table of mixed objects in **93%** of trials.

Turbo is not free speed. It trails full GR00T 2 on delicate five-finger tasks, roughly halving success there, while staying close on simpler gripper tasks.

## How does it compare?

NVIDIA tested GR00T 2 against other leading robot models on long, multi-step tasks, after training all of them on the same task demonstrations:

| Benchmark | GR00T 2 | GR00T 2 Turbo | Best other model tested |
|---|---|---|---|
| 6 long tasks on a YAM gripper arm (toy assembly, wire into breaker…) | 71.7% | 65.0% | 12.5% (π0.5) |
| 7 long tasks with five-fingered hands (memory module, salt filtering…) | 68.6% | 34.3% | 0.7% (GR00T 1.7) |

Average success rates from Table 1 of the whitepaper, up to 20 trials per task. The other models tested were π0.5, GR00T 1.7, FastWAM, MolmoAct2 and FLUX 3 Action on the YAM tasks, and GR00T 1.7 and π0.5 on the hand tasks.

The tasks were chosen to be hard: tight tolerances and many steps in a row. Previous models rarely finished them end to end, so the gap is large.

## What GR00T 2 can't do (yet)

NVIDIA is open about the limits, and they are worth knowing:

- **Short memory.** It only sees the last 0.8 seconds. Anything needing longer memory ("did I already close that drawer?") is left to the reasoning model.
- **No sense of touch.** It sees, but it doesn't feel. Touch sensors are not an input yet.
- **Marks show *where*, not *how*.** Visual steering can't express pouring, wiping or an object's final orientation; that still needs words.
- **Lab results, not a product.** Most results come from about 20 trials per task. Telling 95% from 99% reliability would take hundreds of trials per model, which is what real deployment demands.

As with any AI model on a real robot, you still need controllers, safety limits and testing around it. The model suggests; the rest of the robot system decides what is safe.

## Where does ROS 2 fit?

Most real robots are built with **ROS 2**, the open-source framework that connects cameras, motor controllers and safety systems. A model like GR00T 2 becomes one part of that system: cameras publish images, a node runs the model and publishes action chunks, and **ros2_control** controllers move the motors within the limits engineers set. That keeps the model swappable, so you can try GR00T 2 without rewriting the rest of the robot software. Our [VLA beginners guide](/vla-for-absolute-beginners/#where-does-ros-2-fit) shows this layout in a diagram.

## How to get started

1. **Watch the demos.** The [GR00T 2 project page](https://research.nvidia.com/labs/gear/gr00t-2/) has dozens of videos: toy assembly, chemistry-lab tasks and the G1 humanoid serving popcorn.
2. **Explore the data.** Browse first-person human video in the [Human-1M Dataset Explorer](https://huggingface.co/spaces/nvidia/PhysicalAI-Human-1M-Explorer) to see what the model learns from.
3. **Wait for the code, or start with GR00T today.** NVIDIA lists the GR00T 2 code as "available in December". Meanwhile, the earlier open [Isaac GR00T](https://www.nvidia.com/en-us/industries/robotics/isaac-groot/) models already run in simulation and on low-cost arms.
4. **Try a hands-on workshop.** Our open [Sim-to-Real with SO-101](https://github.com/runtimerobotics/Sim-to-Real-SO-101-Workshop) workshop is an end-to-end workflow with the affordable SO-101 arm, Isaac Lab and Isaac GR00T.

## Beginner questions

### Is GR00T 2 a VLA?

It is a close relative. Like a VLA, it takes camera images and an instruction and outputs actions. Unlike a typical VLA, it also predicts future video, which is why NVIDIA calls it a world-action model.

### Does GR00T 2 only work on humanoids?

No. One trained model covers two-finger gripper arms, five-fingered robot hands and the Unitree G1 humanoid. To use it on a new robot, you map its cameras to the head and wrist views, describe its actions in a supported format and fine-tune on some demonstrations.

### What computer do I need?

NVIDIA's numbers use a single GeForce RTX 5090 both to run GR00T 2 in real time and to fine-tune it on a new task in about 30 minutes. GR00T 2 Turbo runs on board a robot with an NVIDIA Jetson Thor.

### Can it learn just from watching me?

Partly. GR00T 2 learned tasks from people wearing cameras, without anyone remote-controlling the robot for that task. It still needs some general recordings of the target robot moving, so it knows its own body.

## Glossary

- **World-action model (WAM):** a model that predicts both what the world will look like next and the actions that get it there.
- **VLA (vision-language-action model):** a model that turns camera images and an instruction into robot actions.
- **Action chunk:** several future movements predicted at once, so the robot moves smoothly.
- **Transformer:** the type of neural network behind most modern AI models, including chatbots.
- **Parameters:** the numbers a model learns during training. GR00T 2 has about 2 billion.
- **Diffusion / denoising:** generating an output by starting from noise and cleaning it up step by step. GR00T 2 uses a variant called *flow matching*.
- **VAE (video compressor):** a network that shrinks video into a compact form and can expand it again.
- **Egocentric video:** video filmed from a person's own point of view, usually a head-mounted camera.
- **UMI:** a handheld gripper with cameras, used to record demonstrations without a robot.
- **Teleoperation:** a person controlling a robot remotely to record demonstrations.
- **Embodiment:** a robot's body type, such as a gripper arm, a five-fingered hand or a humanoid.
- **Zero-shot / few-shot:** doing a task with no examples, or with only a few examples.
- **Fine-tuning (LoRA):** extra training on a small dataset. LoRA trains a small add-on instead of the whole model, which makes it fast.
- **Reinforcement learning (RL):** learning by trial and error from success signals. RL on the real robot lifted three tricky insertion tasks to 88–96% success.

## Want to build with GR00T and robot foundation models?

World-action models like GR00T 2 are moving robot learning from "collect thousands of robot demos" towards "show a few and fine-tune". Turning one into a dependable application still takes the right data, careful evaluation and solid safety engineering.

RUNTIME Robotics helps teams prototype and deploy [VLA and VLM robot applications](/vla-vlm-robotics/) and [robot-learning workflows](/robot-learning-sim-to-real/) with NVIDIA Isaac and ROS 2, from simulation to controlled real-world testing. We also run hands-on [robotics training](/robotics-training/). [Get in touch](/#contact) to talk about your project.
