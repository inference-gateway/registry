import { defineConfig } from "vitepress";

// VitePress configuration for the Inference Gateway Registry.
//
// The site is published at https://registry.inference-gateway.com/ via GitHub Pages.
// Visual language tracks the ADL docs site so the two read as a family.
export default defineConfig({
  base: "/",
  lang: "en-US",
  title: "Registry",
  titleTemplate: ":title - Inference Gateway Registry",
  description:
    "Discovery hub for A2A (Agent-to-Agent) services and portable skills in the Inference Gateway ecosystem. Every entry follows the Agent Definition Language schema.",
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: "https://registry.inference-gateway.com/",
  },
  head: [
    ["link", { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
    ],
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
    ],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["meta", { name: "theme-color", content: "#3c8772" }],
    [
      "meta",
      {
        name: "keywords",
        content:
          "AI agents, agent registry, inference gateway, agent-to-agent communication, A2A, skills, ADL, Agent Definition Language",
      },
    ],
    [
      "meta",
      {
        property: "og:title",
        content: "Inference Gateway Registry",
      },
    ],
    [
      "meta",
      {
        property: "og:description",
        content:
          "Discover A2A agents and portable skills for the Inference Gateway ecosystem.",
      },
    ],
    ["meta", { property: "og:type", content: "website" }],
    [
      "meta",
      {
        property: "og:url",
        content: "https://registry.inference-gateway.com/",
      },
    ],
    [
      "meta",
      {
        property: "og:image",
        content: "https://registry.inference-gateway.com/og-image.webp",
      },
    ],
    ["meta", { property: "og:image:width", content: "1200" }],
    ["meta", { property: "og:image:height", content: "630" }],
    ["meta", { property: "og:image:type", content: "image/webp" }],
    [
      "meta",
      { property: "og:site_name", content: "Inference Gateway Registry" },
    ],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:title", content: "Inference Gateway Registry" }],
    [
      "meta",
      {
        name: "twitter:description",
        content:
          "Discover A2A agents and portable skills for the Inference Gateway ecosystem.",
      },
    ],
    [
      "meta",
      {
        name: "twitter:image",
        content: "https://registry.inference-gateway.com/twitter-image.webp",
      },
    ],
  ],
  themeConfig: {
    nav: [
      { text: "Agents", link: "/agents/", activeMatch: "^/agents/" },
      { text: "Skills", link: "/skills/", activeMatch: "^/skills/" },
      {
        text: "How To",
        link: "/how-to/prerequisites",
        activeMatch: "^/how-to/",
      },
    ],
    sidebar: {
      "/how-to/": [
        {
          text: "How To",
          items: [
            { text: "Prerequisites", link: "/how-to/prerequisites" },
            { text: "Browse & Install", link: "/how-to/browse-and-install" },
            { text: "List an Agent", link: "/how-to/list-an-agent" },
            { text: "List a Skill", link: "/how-to/list-a-skill" },
            { text: "Build Custom Agents", link: "/how-to/build-agents" },
            { text: "Enterprise Deployment", link: "/how-to/enterprise" },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/inference-gateway/registry" },
    ],
    editLink: {
      pattern:
        "https://github.com/inference-gateway/registry/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
    footer: {
      message:
        'Released under the <a href="https://github.com/inference-gateway/registry/blob/main/LICENSE">Apache 2.0 License</a>.',
      copyright:
        'Copyright © 2025 - <a href="https://github.com/inference-gateway">Inference Gateway</a>',
    },
    search: {
      provider: "local",
    },
    outline: {
      level: [2, 3],
      label: "On this page",
    },
  },
});
