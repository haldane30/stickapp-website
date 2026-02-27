/**
 * Content utilities for loading MDX files.
 *
 * Game guides live in: src/content/games/[slug].mdx
 * Blog posts live in:  src/content/blog/[slug].mdx
 *
 * Each MDX file uses gray-matter frontmatter for metadata.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "src/content");

// ─── Types ──────────────────────────────────────────────────────────────────

export interface GameGuideMeta {
  slug: string;
  title: string;
  description: string; // meta description
  gameName: string;
  players: string;
  difficulty: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  keywords: string[];
  faq: { question: string; answer: string }[];
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  category: string; // strategy | guide | comparison | culture
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  keywords: string[];
  featured?: boolean;
}

// ─── Game Guides ────────────────────────────────────────────────────────────

export function getGameGuideSlugs(): string[] {
  const dir = path.join(CONTENT_DIR, "games");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getGameGuide(slug: string): { meta: GameGuideMeta; content: string } | null {
  const filePath = path.join(CONTENT_DIR, "games", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    meta: {
      slug,
      title: data.title || "",
      description: data.description || "",
      gameName: data.gameName || "",
      players: data.players || "",
      difficulty: data.difficulty || "",
      publishedAt: data.publishedAt || "",
      updatedAt: data.updatedAt || data.publishedAt || "",
      readingTime: stats.text,
      keywords: data.keywords || [],
      faq: data.faq || [],
    },
    content,
  };
}

export function getAllGameGuides(): GameGuideMeta[] {
  return getGameGuideSlugs()
    .map((slug) => {
      const guide = getGameGuide(slug);
      return guide?.meta;
    })
    .filter((meta): meta is GameGuideMeta => meta !== undefined)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

// ─── Blog Posts ─────────────────────────────────────────────────────────────

export function getBlogPostSlugs(): string[] {
  const dir = path.join(CONTENT_DIR, "blog");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getBlogPost(slug: string): { meta: BlogPostMeta; content: string } | null {
  const filePath = path.join(CONTENT_DIR, "blog", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    meta: {
      slug,
      title: data.title || "",
      description: data.description || "",
      category: data.category || "guide",
      publishedAt: data.publishedAt || "",
      updatedAt: data.updatedAt || data.publishedAt || "",
      readingTime: stats.text,
      keywords: data.keywords || [],
      featured: data.featured || false,
    },
    content,
  };
}

export function getAllBlogPosts(): BlogPostMeta[] {
  return getBlogPostSlugs()
    .map((slug) => {
      const post = getBlogPost(slug);
      return post?.meta;
    })
    .filter((meta): meta is BlogPostMeta => meta !== undefined)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}
