---
layout: ../layouts/BlogPostLayout.astro
title: "Physical AI in Production: What's Shipping and How to Deploy It"
description: "A 43-slide industry briefing on where robot foundation models are running today, where they're still in pilots, and an eight-stage playbook for taking one to production."
image: "images/revised/physical-ai-in-production-cover.webp"
date: "2026-10-27"
---

![Physical AI in Production: industry briefing cover slide](/images/revised/physical-ai-in-production-cover.webp)

Physical AI means AI models that perceive and act in the physical world: robot arms, humanoids, warehouse fleets and robotaxis. Every week brings a new demo, but demos aren't deployments. We built **Physical AI in Production**, an open industry briefing, to separate what is genuinely running in production from what is still in pilots, and to give engineers a practical path to ship a robot foundation model safely.

**[View the slides →](https://runtimerobotics.github.io/physical-ai-in-production/#1)** · **[Source on GitHub →](https://github.com/runtimerobotics/physical-ai-in-production)**

## What's inside

- **LLM vs. VLM vs. VLA.** One prompt answered three ways, plus how a Vision-Language-Action model is built.
- **Ten open-weight VLA models you can download today**, from OpenVLA to LingBot-VLA 2.0, with size, release date and license checked against their model cards.
- **Real deployments with evidence.** Amazon's 1M+ robots and DeepFleet, Agility Digit at GXO, Figure at BMW, and Waymo's 500k+ weekly paid rides.
- **The global picture.** China's lead in humanoid volume, and the Physical AI companies and policy emerging in India.
- **Why it's harder than chatbots**, and the two business models forming around robot intelligence.

## An eight-stage production playbook

The second half of the deck is for the engineers who have to make it work:

1. Specify the job, then build the data
2. Choose the model: build, fine-tune or call an API
3. Climb the evaluation ladder
4. Bound the model with a layered safety architecture
5. Fit the model inside the on-robot control loop
6. Integrate it with a ROS 2 reference architecture
7. Roll out in stages and run the data flywheel
8. Pass a production-readiness checklist

The core message: **bound the model, don't trust it.** A VLA can propose actions, but certified safety layers, controllers and staged rollouts decide what actually reaches the motors.

## Who it's for

The briefing is written for robotics engineers, technical leaders and decision-makers alike. It stays technical where it matters: model architectures, evaluation, safety, on-robot inference and ROS 2 integration.

Open the deck in any browser and use the arrow keys to move through the slides. You can link to any slide by adding `#n` to the URL. If you're planning a Physical AI deployment and want help taking it from pilot to production, [get in touch with RUNTIME Robotics](/#contact).
