---
title: "devla.dev"
subtitle: "My personal website & portfolio"
coverImage: "https://noah.devla.dev/images/devla.dev.webp"
type: ["project"]
fromdate: "2024-06-29"
todate: "present"

tryLink: "https://devla.dev"
sourceLink: "https://github.com/GitDevla/devla.dev"
tags: ["Next.js", "Tailwind CSS", "Docker", "Nginx", "Cloudflare"]
visible: true
---

# devla.dev

In the summer of 2024 I finally decided to create my own personal website and portfolio. I wanted to have a place where I could showcase my projects and publish my existence to the world.

## Features

- ✅ Projects, Experiences, Skills, Repositories, Favorite Songs and Blog pages.
- ✅ Blog posts statically generated from markdown.
- ✅ Real-time data like Discord status and currently playing song.
- ✅ Dark & Light mode with local storage persistence.
- ✅ Fully responsive design.
- ✅ SEO optimized.
- ✅ Self-hosted on my home server.

## Tech Stack

### Framework and Styling

- [Next.js](https://nextjs.org/): I was torn between Next.js and Astro for the framework. While Astro offers a zero-JavaScript with incredibly fast SEO performance, I still wanted to have some real-time data on my website. Thankfully the new /app router in Next.js 12 allows for a hybrid approach where I can have both static and dynamic pages. It also helped that I already had some experience with the old /pages Next.js & React.
- [Tailwind CSS](https://tailwindcss.com/): For styling, I opted for Tailwind CSS. This is my first time using Tailwind, I used to write my own CSS or use a full fledged CSS framework like Bootstrap and it was always a headache. I wanted to try something new and I'm really happy with the results.

### Site Generation

I'm using a mix of SSG/ISR/CSR for my website. Non-dynamic pages are statically generated at build time, while dynamic pages like my blog posts are generated at runtime at set intervals. Whilst real-time data like my Discord status and currently playing are fetched client-side.  
Blogs are written in markdown and converted into HTML using `gray-matter`.

### API's

- [GitHub API](https://docs.github.com/en/rest) & [GitTea API](https://hira.devla.dev/api/swagger): To display my public repositories and their stats.
- [Phineas/lanyard](https://github.com/Phineas/lanyard): A public API for Discord's Rich Presence. I'm using this to display my current activity on Discord.
- [postTop](/blog/postToP): A custom API/extension I created to track my most listened songs on Youtube.

### Hosting

The website is fully self-hosted on my home server using Docker and Nginx. I'm using Cloudflare for DNS and SSL and overall extra security.
