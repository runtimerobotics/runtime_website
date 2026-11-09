---
layout: ../layouts/BlogPostLayout.astro
title: "VLA Models for Absolute Beginners"
description: "A plain-language guide to Vision-Language-Action models: what they are, how they turn words and images into robot movements, and how to try one yourself."
image: "images/revised/vla-vlm-robotics.jpg"
date: "2026-11-09"
author: "Lentin Joseph"
service: "vla-vlm-robotics"
tags: ["VLA", "Robot learning", "Physical AI"]
---

![A robot arm guided by vision and language](/images/revised/vla-vlm-robotics.webp)

Imagine walking into a kitchen and saying to a robot: **"Pick up the red cup and put it in the sink."** No programming, no coordinates, no special app. The robot looks around, finds the cup and does it.

For decades this was science fiction. Every robot movement had to be planned and coded by an engineer. A new object, a new kitchen or a new task meant writing new code. **Vision-Language-Action models**, or **VLAs**, are changing that. They are the reason you now see videos of robots folding laundry, clearing tables and packing groceries from simple spoken instructions.

This guide explains VLAs from scratch. You don't need any background in AI or robotics. We'll use the red-cup example all the way through.

## Three kinds of AI model

You have probably used a chatbot such as ChatGPT or Claude. It is built on a **large language model (LLM)**: you give it text, it gives you text back. A VLA is a close relative. The easiest way to understand it is to see how three related kinds of model would handle our red-cup request.

<figure class="diagram">
<svg viewBox="0 0 640 360" role="img" aria-labelledby="d1-title d1-desc" xmlns="http://www.w3.org/2000/svg" font-family="Ubuntu, system-ui, sans-serif">
<title id="d1-title">LLM, VLM and VLA compared</title>
<desc id="d1-desc">An LLM takes text and returns text. A VLM takes an image and text and returns text. A VLA takes a camera image and an instruction and returns robot actions.</desc>
<defs><marker id="d1-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#9fb0c6"/></marker></defs>
<g font-size="15" fill="#ffffff" text-anchor="middle">
<rect x="20" y="30" width="190" height="80" rx="12" fill="#0e1a2c" stroke="#4d6380"/><text x="115" y="66">Text</text><text x="115" y="88" font-size="13" fill="#9fb0c6">"Pick up the red cup…"</text>
<rect x="250" y="30" width="140" height="80" rx="12" fill="#13305a" stroke="#4c9bff"/><text x="320" y="77" font-size="20" font-weight="700">LLM</text>
<rect x="430" y="30" width="190" height="80" rx="12" fill="#0e1a2c" stroke="#4d6380"/><text x="525" y="66">Text answer</text><text x="525" y="88" font-size="13" fill="#9fb0c6">"First, find the cup…"</text>
<rect x="20" y="140" width="190" height="80" rx="12" fill="#0e1a2c" stroke="#4d6380"/><text x="115" y="176">Image + text</text><text x="115" y="198" font-size="13" fill="#9fb0c6">photo of the kitchen</text>
<rect x="250" y="140" width="140" height="80" rx="12" fill="#13305a" stroke="#4c9bff"/><text x="320" y="187" font-size="20" font-weight="700">VLM</text>
<rect x="430" y="140" width="190" height="80" rx="12" fill="#0e1a2c" stroke="#4d6380"/><text x="525" y="176">Text answer</text><text x="525" y="198" font-size="13" fill="#9fb0c6">"The red cup is by the sink."</text>
<rect x="20" y="250" width="190" height="80" rx="12" fill="#0e1a2c" stroke="#f2994a"/><text x="115" y="286">Camera + instruction</text><text x="115" y="308" font-size="13" fill="#9fb0c6">what the robot sees</text>
<rect x="250" y="250" width="140" height="80" rx="12" fill="#4a2a10" stroke="#f2994a"/><text x="320" y="297" font-size="20" font-weight="700">VLA</text>
<rect x="430" y="250" width="190" height="80" rx="12" fill="#0e1a2c" stroke="#f2994a"/><text x="525" y="286" fill="#f2994a" font-weight="700">Robot actions</text><text x="525" y="308" font-size="13" fill="#9fb0c6">move · rotate · grip</text>
</g>
<g stroke="#9fb0c6" stroke-width="2" fill="none" marker-end="url(#d1-arrow)">
<path d="M212 70H246"/><path d="M392 70H426"/><path d="M212 180H246"/><path d="M392 180H426"/><path d="M212 290H246"/><path d="M392 290H426"/>
</g>
</svg>
<figcaption>Same request, three kinds of model. Only the VLA's answer moves a robot.</figcaption>
</figure>

- An **LLM** can only read and write text. It can *describe* how to pick up a cup, but it can't see the kitchen and can't move anything.
- A **vision-language model (VLM)** can also look at images. Show it a photo and it can tell you where the cup is. It still only answers in words.
- A **vision-language-action model (VLA)** looks through the robot's camera, reads your instruction and answers with **actions**: small, precise movements for the robot's arm and gripper.

That last step is the big idea. A VLA is essentially a VLM that has learned to "speak robot".

## What happens inside a VLA

A VLA is one model, but it helps to think of it as a short pipeline. Every fraction of a second, the same steps repeat.

<figure class="diagram">
<svg viewBox="0 0 680 290" role="img" aria-labelledby="d2-title d2-desc" xmlns="http://www.w3.org/2000/svg" font-family="Ubuntu, system-ui, sans-serif">
<title id="d2-title">Inside a VLA</title>
<desc id="d2-desc">The camera image goes through a vision encoder and the instruction through a text tokenizer. A language model reasons over both, an action decoder turns its output into movements, and the robot executes them.</desc>
<defs><marker id="d2-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#4c9bff"/></marker></defs>
<g font-size="15" fill="#ffffff" text-anchor="middle">
<rect x="10" y="40" width="112" height="72" rx="12" fill="#0e1a2c" stroke="#4d6380"/><text x="66" y="72">Camera</text><text x="66" y="92">image</text>
<rect x="10" y="168" width="112" height="72" rx="12" fill="#0e1a2c" stroke="#4d6380"/><text x="66" y="200">Your</text><text x="66" y="220">instruction</text>
<rect x="148" y="40" width="112" height="72" rx="12" fill="#13305a" stroke="#4c9bff"/><text x="204" y="72">Vision</text><text x="204" y="92">encoder</text>
<rect x="148" y="168" width="112" height="72" rx="12" fill="#13305a" stroke="#4c9bff"/><text x="204" y="200">Text</text><text x="204" y="220">tokenizer</text>
<rect x="290" y="40" width="130" height="200" rx="14" fill="#13305a" stroke="#4c9bff" stroke-width="2"/><text x="355" y="128" font-size="16" font-weight="700">Language</text><text x="355" y="150" font-size="16" font-weight="700">model</text><text x="355" y="176" font-size="12" fill="#9fb0c6">the "brain"</text>
<rect x="446" y="104" width="104" height="72" rx="12" fill="#4a2a10" stroke="#f2994a"/><text x="498" y="136">Action</text><text x="498" y="156">decoder</text>
<rect x="572" y="104" width="98" height="72" rx="12" fill="#0e1a2c" stroke="#f2994a"/><text x="621" y="136" fill="#f2994a" font-weight="700">Robot</text><text x="621" y="156">moves</text>
</g>
<g stroke="#4c9bff" stroke-width="2" fill="none" marker-end="url(#d2-arrow)">
<path d="M124 76H144"/><path d="M124 204H144"/><path d="M262 76H286"/><path d="M262 204H286"/><path d="M422 140H442"/><path d="M552 140H568"/>
</g>
<text x="340" y="275" text-anchor="middle" font-size="14" fill="#9fb0c6">Repeats many times per second, using the newest camera image each time</text>
</svg>
<figcaption>One loop of a VLA: see, read, think, act.</figcaption>
</figure>

1. **See.** A *vision encoder* turns the camera image into a list of numbers called **tokens**. Think of it as translating a picture into a language the model understands.
2. **Read.** Your instruction, "pick up the red cup", is also turned into tokens.
3. **Think.** A *language model*, the same kind of "brain" inside a chatbot, takes both sets of tokens together. Because it was trained on huge amounts of internet text and images, it already knows what a cup is, what "red" means and what a sink looks like.
4. **Act.** Instead of writing a sentence, the model produces **action tokens**. An *action decoder* turns those into real movements: move the hand a little forward, rotate the wrist, close the gripper.

Then the robot takes a new photo and the loop runs again. The robot never plans the whole task in one go. It keeps looking and adjusting, much as you do when you reach for something.

## How can words become movements?

This is the clever part. A chatbot writes one word at a time by predicting the most likely next word. A VLA does the same thing with **movements**: it predicts the next small action.

<figure class="diagram">
<svg viewBox="0 0 660 300" role="img" aria-labelledby="d3-title d3-desc" xmlns="http://www.w3.org/2000/svg" font-family="Ubuntu, system-ui, sans-serif">
<title id="d3-title">Actions as tokens</title>
<desc id="d3-desc">A chatbot predicts the next word. A VLA predicts the next action, written as a short row of numbers: a continue flag, three position changes, three rotation changes and the gripper state.</desc>
<g font-family="Ubuntu, system-ui, sans-serif" text-anchor="middle">
<text x="20" y="40" text-anchor="start" font-size="15" fill="#9fb0c6">Chatbot: predicts the next word</text>
<rect x="20" y="54" width="380" height="50" rx="10" fill="#0e1a2c" stroke="#4d6380"/><text x="210" y="85" font-size="16" fill="#ffffff">"The cup on the table is …"</text>
<rect x="420" y="54" width="110" height="50" rx="10" fill="#13305a" stroke="#4c9bff"/><text x="475" y="85" font-size="16" fill="#4c9bff" font-weight="700">"red"</text>
<text x="20" y="150" text-anchor="start" font-size="15" fill="#9fb0c6">VLA: predicts the next action, as numbers</text>
<g font-size="17" fill="#ffffff" font-weight="700">
<rect x="20" y="164" width="68" height="50" rx="10" fill="#0e1a2c" stroke="#4d6380"/><text x="54" y="195">1</text>
<rect x="96" y="164" width="68" height="50" rx="10" fill="#4a2a10" stroke="#f2994a"/><text x="130" y="195">128</text>
<rect x="172" y="164" width="68" height="50" rx="10" fill="#4a2a10" stroke="#f2994a"/><text x="206" y="195">91</text>
<rect x="248" y="164" width="68" height="50" rx="10" fill="#4a2a10" stroke="#f2994a"/><text x="282" y="195">241</text>
<rect x="324" y="164" width="68" height="50" rx="10" fill="#13305a" stroke="#4c9bff"/><text x="358" y="195">5</text>
<rect x="400" y="164" width="68" height="50" rx="10" fill="#13305a" stroke="#4c9bff"/><text x="434" y="195">101</text>
<rect x="476" y="164" width="68" height="50" rx="10" fill="#13305a" stroke="#4c9bff"/><text x="510" y="195">127</text>
<rect x="552" y="164" width="88" height="50" rx="10" fill="#1b3a24" stroke="#a7ee43"/><text x="596" y="195">217</text>
</g>
<g font-size="14" fill="#9fb0c6">
<text x="54" y="236">continue</text>
<text x="206" y="236" fill="#f2994a">move: forward · sideways · up</text>
<text x="434" y="236" fill="#4c9bff">rotate the wrist (3 ways)</text>
<text x="596" y="236" fill="#a7ee43">gripper</text>
</g>
<text x="330" y="280" font-size="14" fill="#d6e0ec">One small step. The robot executes it, looks again, and predicts the next one.</text>
</g>
</svg>
<figcaption>Google DeepMind's RT-2 wrote each action as a short string of numbers, just like text. Example from the RT-2 announcement.</figcaption>
</figure>

When Google DeepMind introduced **RT-2** in 2023, it wrote each robot action as a short string of numbers that the model could produce exactly like words. One action said whether to keep going, how far to move the hand in three directions, how to rotate it and whether the gripper should be open or closed. Picking up a cup is just a long sequence of these tiny steps.

Newer VLAs often skip the "numbers as words" trick and output smooth, continuous movements directly, sometimes several steps at once. The idea is the same: **the model predicts what to do next, again and again, while watching the world.**

## How a VLA learns

Nobody writes a VLA's skills by hand. It learns them, in two stages.

<figure class="diagram">
<svg viewBox="0 0 660 270" role="img" aria-labelledby="d4-title d4-desc" xmlns="http://www.w3.org/2000/svg" font-family="Ubuntu, system-ui, sans-serif">
<title id="d4-title">How a VLA learns</title>
<desc id="d4-desc">A vision-language model is first pre-trained on internet images and text. It is then fine-tuned on robot demonstrations collected by teleoperation, which turns it into a VLA policy.</desc>
<defs><marker id="d4-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#9fb0c6"/></marker></defs>
<g font-size="15" fill="#ffffff" text-anchor="middle">
<rect x="10" y="40" width="160" height="80" rx="12" fill="#0e1a2c" stroke="#4d6380"/><text x="90" y="74">Internet images</text><text x="90" y="94">and text</text>
<rect x="250" y="40" width="160" height="80" rx="12" fill="#13305a" stroke="#4c9bff"/><text x="330" y="74" font-weight="700">Vision-language</text><text x="330" y="94" font-weight="700">model</text>
<rect x="490" y="40" width="160" height="80" rx="12" fill="#4a2a10" stroke="#f2994a"/><text x="570" y="74" font-weight="700" fill="#f2994a">VLA</text><text x="570" y="94">robot policy</text>
<rect x="330" y="170" width="160" height="80" rx="12" fill="#0e1a2c" stroke="#a7ee43"/><text x="410" y="204">Robot</text><text x="410" y="224">demonstrations</text>
</g>
<g stroke="#9fb0c6" stroke-width="2" fill="none" marker-end="url(#d4-arrow)">
<path d="M172 80H246"/><path d="M412 80H486"/><path d="M450 168C450 130 450 110 450 84"/>
</g>
<g font-size="14" fill="#9fb0c6" text-anchor="middle">
<text x="210" y="70">1. pre-train</text>
<text x="450" y="58">2. fine-tune</text>
<text x="565" y="214" text-anchor="start">people guide</text>
<text x="565" y="232" text-anchor="start">real robots</text>
</g>
<path d="M494 210H556" stroke="#a7ee43" stroke-width="1.5" stroke-dasharray="4 4"/>
</svg>
<figcaption>General knowledge from the internet, then robot skills from demonstrations.</figcaption>
</figure>

**Stage 1: learn about the world.** The model starts as a vision-language model trained on enormous collections of images and text from the internet. This is where it learns what cups, sinks and the colour red are, without ever touching a robot.

**Stage 2: learn to act.** The model is then trained on **robot demonstrations**: recordings of a robot doing tasks, usually guided by a person with a controller or a matching arm. This is called **teleoperation**. Each recording pairs what the camera saw and what the instruction was with the movements that followed. After seeing thousands of these, the model learns to produce the right movements itself.

Robot demonstrations are the expensive part. Internet text is plentiful, but every robot demonstration needs real hardware, a real scene and a person's time. That is why research groups share demonstration datasets, and why simulation and synthetic data are becoming so important.

## VLAs you'll hear about

A few names come up again and again. You don't need to remember them, but they show how fast the field is moving.

- **[RT-2](https://deepmind.google/discover/blog/rt-2-new-model-translates-vision-and-language-into-action/)** (Google DeepMind, 2023) popularised the term *vision-language-action model*. It was built on Google's vision-language models and wrote actions as text-like tokens.
- **[OpenVLA](https://openvla.github.io/)** (2024) is an open-source, 7-billion-parameter VLA anyone can download. It was trained on about 970,000 robot demonstrations from the shared *Open X-Embodiment* dataset.
- **[π0 (pi-zero)](https://www.pi.website/blog/pi0)** (Physical Intelligence, 2024) produces smooth, continuous motor commands up to 50 times per second. Its demos include folding laundry, bussing tables and assembling boxes.
- **[NVIDIA Isaac GR00T](https://www.nvidia.com/en-us/industries/robotics/isaac-groot/)** (2025 onward) is NVIDIA's family of open models for humanoid robots. They take camera views, an instruction and the robot's current state, and predict the next chunk of movements.
- **[SmolVLA](https://huggingface.co/blog/smolvla)** (Hugging Face, 2025) is a small, open VLA of about 450 million parameters. It is light enough to run on a laptop and was trained on datasets shared by the open-source community, many recorded on low-cost SO-100 robot arms.

## See it in action

Here NVIDIA introduces GR00T N1, an open foundation model for humanoid robots. Watch for the same loop described above: cameras in, instructions in, movements out.

<div class="video-embed">
  <iframe src="https://www.youtube-nocookie.com/embed/m1CH-mgpdYg" title="NVIDIA Isaac GR00T N1: An Open Foundation Model for Humanoid Robots" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

## What VLAs are good at, and where they struggle

**Where they shine:**

- **Following plain language.** You describe the task. You don't program it.
- **Handling new things.** Because they learned from the internet, VLAs can often handle objects and scenes they never saw during robot training.
- **One model, many skills.** A single model can pick, place, open, fold and sort, instead of one program per task.

**Where they still struggle:**

- **Reliability.** A VLA might succeed nine times and fail on the tenth in a surprising way. Factories and warehouses need far better than that.
- **Speed and computing power.** Large models need powerful onboard computers to react quickly enough.
- **Data.** Good robot demonstrations are slow and costly to collect.
- **Safety.** A model that guesses is not the same as a system you can certify around people.

That last point matters most. In real deployments, a VLA is never the only thing in charge.

<figure class="diagram">
<svg viewBox="0 0 640 330" role="img" aria-labelledby="d5-title d5-desc" xmlns="http://www.w3.org/2000/svg" font-family="Ubuntu, system-ui, sans-serif">
<title id="d5-title">Bounding a VLA with safety layers</title>
<desc id="d5-desc">The VLA proposes actions. A safety layer checks speed, force and workspace limits and stops near people. A controller turns approved actions into smooth, precise motion, which drives the motors.</desc>
<defs><marker id="d5-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#9fb0c6"/></marker></defs>
<g font-size="14" text-anchor="middle">
<rect x="120" y="20" width="400" height="56" rx="12" fill="#4a2a10" stroke="#f2994a"/><text x="320" y="44" fill="#f2994a" font-weight="700" font-size="16">VLA model</text><text x="320" y="64" fill="#d6e0ec">proposes the next movement</text>
<rect x="120" y="100" width="400" height="56" rx="12" fill="#1b3a24" stroke="#a7ee43"/><text x="320" y="124" fill="#a7ee43" font-weight="700" font-size="16">Safety layer</text><text x="320" y="144" fill="#d6e0ec">limits speed, force and workspace · stops near people</text>
<rect x="120" y="180" width="400" height="56" rx="12" fill="#13305a" stroke="#4c9bff"/><text x="320" y="204" fill="#4c9bff" font-weight="700" font-size="16">Controller</text><text x="320" y="224" fill="#d6e0ec">turns approved actions into smooth, precise motion</text>
<rect x="120" y="260" width="400" height="56" rx="12" fill="#0e1a2c" stroke="#4d6380"/><text x="320" y="294" fill="#ffffff" font-weight="700" font-size="16">Motors</text>
</g>
<g stroke="#9fb0c6" stroke-width="2" fill="none" marker-end="url(#d5-arrow)"><path d="M320 78V96"/><path d="M320 158V176"/><path d="M320 238V256"/></g>
</svg>
<figcaption>Bound the model, don't trust it: the VLA suggests, the safety layers decide.</figcaption>
</figure>

The VLA **proposes** a movement. Safety layers and controllers that engineers can test and certify **decide** what actually reaches the motors. We cover this in more depth in [Physical AI in Production, Explained](/physical-ai-in-production/). For a look at a different way robots can learn, by exploring and writing their own code, see [VLA vs RAX](/vla-vs-rax-robot-learning/).

## How to try a VLA yourself

You don't need a lab to get started. Here is a path from zero to running your own model:

1. **Watch and read.** Browse the demo videos on the model pages linked above to build an intuition for what VLAs can and can't do.
2. **Start in simulation.** Simulators such as NVIDIA Isaac Sim and Gazebo let you test robot software without buying hardware or breaking anything.
3. **Get a low-cost arm.** Affordable open-source arms such as the SO-100 and SO-101 work with Hugging Face's [LeRobot](https://github.com/huggingface/lerobot) library. You can record your own demonstrations and fine-tune a small model like SmolVLA.
4. **Follow a hands-on workshop.** Our open workshop material on GitHub walks through these steps:
   - [VLM Robotics Workshop](https://github.com/runtimerobotics/vlm_packt_workshop): vision-language models on TurtleBot 4, Unitree Go2, Franka and Spot in ROS 2 and Gazebo
   - [Sim-to-Real with SO-101](https://github.com/runtimerobotics/Sim-to-Real-SO-101-Workshop): an end-to-end workflow with the SO-101 arm, Isaac Lab and Isaac GR00T
   - [Physical AI with ROS 2](https://github.com/runtimerobotics/packt_physical_ai_workshop): perception, planning and control for intelligent robots

## Glossary

- **Token:** a small piece of information a model works with, such as part of a word, a patch of an image or one robot movement.
- **LLM (large language model):** an AI model that reads and writes text.
- **VLM (vision-language model):** an AI model that understands images and text together.
- **VLA (vision-language-action model):** a VLM that also outputs robot actions.
- **Vision encoder:** the part of the model that turns an image into tokens.
- **Policy:** in robotics, the "decision maker" that chooses the next action from what the robot sees.
- **Gripper:** the robot's "hand", usually two fingers that open and close.
- **Teleoperation:** a person controlling a robot remotely, often to record demonstrations.
- **Pre-training:** the first, broad stage of training on general data such as internet images and text.
- **Fine-tuning:** further training on a smaller, specific dataset, such as robot demonstrations.
- **Simulation:** a virtual world for testing robots safely before using real hardware.

## Want to build with VLAs?

VLAs are moving fast from research demos to real products. Turning one into a reliable robot application takes the right data, careful evaluation and solid safety engineering around the model.

RUNTIME Robotics helps teams prototype and deploy [VLA and VLM robot applications](/vla-vlm-robotics/), from first experiments in simulation to controlled real-world testing. We also run hands-on [robotics training](/robotics-training/) for engineers who want to learn these tools. [Get in touch](/#contact) to talk about your project.
