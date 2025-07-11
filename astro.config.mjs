import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://pennairrepair.com/",
  integrations: [
    tailwind(),
    partytown(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => !page.includes("/admin/") && !page.includes("/api/"),
      customPages: [
        "https://pennairrepair.com/services/emergency-repair",
        "https://pennairrepair.com/contact-us",
      ],
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en-US",
        },
      },
    }),
    react(),
  ],
});
