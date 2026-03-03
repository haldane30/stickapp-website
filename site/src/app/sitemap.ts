import { MetadataRoute } from "next";
import { games } from "@/lib/tokens";
import { getAllBlogPosts, getAllGameGuides, getAllGuidePages } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllBlogPosts();
  const gameGuides = getAllGameGuides();
  const guidePages = getAllGuidePages();

  return [
    {
      url: "https://stickapp.golf",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://stickapp.golf/games/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...games.map((game) => {
      const guide = gameGuides.find((g) => g.slug === game.slug);
      return {
        url: `https://stickapp.golf/games/${game.slug}/`,
        lastModified: guide ? new Date(guide.updatedAt) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      };
    }),
    {
      url: "https://stickapp.golf/blog/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...blogPosts.map((post) => ({
      url: `https://stickapp.golf/blog/${post.slug}/`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...guidePages.map((guide) => ({
      url: `https://stickapp.golf/guides/${guide.slug}/`,
      lastModified: new Date(guide.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: "https://stickapp.golf/pricing/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://stickapp.golf/privacy/",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://stickapp.golf/terms/",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
