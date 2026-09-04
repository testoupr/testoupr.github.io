import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date().optional(), // start / key date — orders the timeline
    endDate: z.coerce.date().optional(), // omit while ongoing
    tags: z.array(z.string()).default([]),
    status: z.string().optional(),
    role: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const trips = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/trips" }),
  schema: z.object({
    title: z.string(),
    city: z.string(),
    country: z.string().optional(),
    lat: z.number(), // decimal degrees
    lon: z.number(), // decimal degrees
    date: z.coerce.date().optional(),
    description: z.string().optional(),
    image: z.string().optional(), // cover photo, e.g. /trips/lisbon.jpg (put file in public/trips/)
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, posts, trips };
