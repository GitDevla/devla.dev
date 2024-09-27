---
title: "PostToP Ecosystem"
subtitle: "Youtube (Music) data tracker"
coverImage: "https://noah.devla.dev/images/devla.dev.webp"
type: ["project"]
fromdate: "2024-06-29"
todate: "present"

sourceLink: "https://github.com/GitDevla/postToP-Extension"
tags:
  [
    "Node.js",
    "Express",
    "SQLite",
    "Webpack",
    "Typescript",
    "Chrome",
    "Websocket",
    "Discord",
  ]
visible: true
---

# PostToP Ecosystem

PostToP is an ecosystem that I created to track my most & currently playing songs on Youtube & Youtube Music. The project was a fun way for me to learn more about Chrome extensions and to track my music listening habits, which I can then display on my website or as a Discord status.

Similar project to PostToP is [PreMiD](https://premid.app/) (yes, the naming is intentional), which is also a Chrome extension that displays your currently playing music on Spotify, YouTube, and other platforms. But I always found it sluggish and not very customizable, so I decided to create my own.

## Part of the ecosystem

- **[PostToP Chrome Extension](https://github.com/GitDevla/postToP-Extension)**: The extension is responsible for tracking the currently playing song on Youtube and sending it to the backend server.
- **[PostToP Server](https://github.com/GitDevla/postToP-Server)**: The backbone of the ecosystem, the server is responsible for storing the currently playing song and providing an API & Websocket to access it.
- **[PostToP Discord RPC](https://github.com/GitDevla/postToP-Discord)**: The Discord RPC is responsible for displaying the currently playing song on Discord.
- **PostToP Mobile (planned)**: Mobile background service to track the currently playing song on Youtube Music.

## Features

- ✅ Tracks the currently playing song on Youtube & Youtube Music.
- ✅ Stores the song data in a SQLite database.
- ✅ Provides an API & Websocket to access the song data.
- ✅ Displays the currently playing song on Discord and on my website.

## Tech Stack

The whole project (as of now) is written in **Typescript** as it is ideal for async operations that comes with this kind of workflow. (I might rewrite the server/RPC in _golang_)

The Chrome extension uses **Webpack** to bundle the files into a file structure that Chrome can understand, the whole communication with the server goes via **Websocket** to reduce latency and allows continuous back n' forth communications for commands like syncing.

The server uses **Express** to host and API and handle Websocket connections, it filters and stores the data into an **SQLite** database to be later accessed and analyzed. (I might try adding _GraphQL_ to the server)
