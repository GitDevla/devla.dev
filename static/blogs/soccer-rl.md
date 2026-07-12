---
title: "Soccer RL"
subtitle: "Reinforcement Learning for 1v1 Soccer Simulation"
coverImage: "https://noah.devla.dev/images/soccer-rl2.webp"
type: ["project"]
fromdate: "2025-11-21"
todate: "2025-12-06"

sourceLink: "https://github.com/GitDevla/Soccer-RL"
tryLink: "https://www.youtube.com/watch?v=IozEXvBEH6k"
tags: ["Unity", "C#"]
visible: true
---

# Soccer RL

A reinforcement learning project where I trained an AI agent to play a simplified version of soccer in a 3D Unity environment. The agent learns through curriculum learning and self-play, progressing from basic ball control to competing against an equally skilled opponent.

## Agent Objective

The agent's goal is to score on the opponent's goal while defending its own. Through trial and error over thousands of episodes, the agent learns strategic behaviors like ball control, positioning, and tactical play—all without explicit programming of these behaviors.

## Features

- ✅ Fully autonomous AI agent trained through reinforcement learning.
- ✅ Progressive curriculum learning from solo play to competitive self-play.
- ✅ Complex reward system encouraging efficient and strategic gameplay.
- ✅ Self-play training where the agent competes against itself to improve.
- ✅ 17-dimensional observation space including ball, opponent, and goal positions.
- ✅ 3x3 discrete action space for movement and rotation.
- ✅ Dynamic reward shaping that adapts throughout the curriculum.

## Tech Stack

### Framework

- [Unity ML-Agents](https://unity.com/products/machine-learning-agents): Unity's machine learning framework for training intelligent agents in 3D environments.
- [Unity Engine](https://unity.com/): Game engine providing the physics simulation and 3D environment.
- [C#](https://docs.microsoft.com/en-us/dotnet/csharp/): For agent behavior scripting and environment setup.

### Training Architecture

**Observation Space** (17 values):
- Ball position and velocity relative to agent
- Opponent position and velocity relative to agent  
- Own goal and opponent goal positions relative to agent
- Agent's velocity and orientation

**Action Space** (27 discrete combinations):
- Forward/Backward/Stay movement
- Left/Right/Stay strafing
- Left/Right/Stay rotation

**Reward Function**:
- `+1 - (step/maxStep)` for scoring goals (encourages faster play)
- `-1` for conceding goals
- `-1/maxStep` per timestep (encourages efficiency)
- Exponentially decaying kick rewards for directing ball towards goal
- Possession rewards/penalties based on ball trajectory

### Curriculum Learning

The training progresses through six stages, each building on the previous:

1. **Easy**: Stationary ball at center, learn basic movement and kicking.
2. **Medium**: Ball randomly positioned, learn to locate and reach the ball.
3. **Hard**: Ball with random initial velocity, learn to intercept moving targets.
4. **Extreme**: Random agent and ball positions with velocity, learn spatial awareness.
5. **Self-Play Transition**: Frozen opponent introduced, learn defensive positioning.
6. **Self-Play**: Both agents learn simultaneously, competitive strategy emerges.

The curriculum gradually increases complexity while adjusting reward parameters, allowing the agent to master fundamental skills before facing more difficult challenges.

## What I Learned

- Implementing reinforcement learning algorithms with Unity ML-Agents framework.
- Designing effective reward functions that balance multiple objectives.
- Using curriculum learning to break down complex tasks into learnable stages.
- The importance of observation space design for agent decision-making.
- Self-play as a powerful technique for emergent strategic behavior.
- Hyperparameter tuning and iterative refinement of training parameters.
- How small changes in reward structure can dramatically affect learned behaviors.