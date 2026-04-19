import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const frameworks = defineCollection({
	loader: glob({ pattern: '**/*.yaml', base: './src/content/frameworks' }),
	schema: z.object({
		name: z.string(),
		version: z.string(),
		url: z.url(),
		offset: z.string(),
	}),
})

const tests = defineCollection({
	loader: glob({ pattern: '**/*.yaml', base: './src/content/tests' }),
	schema: z.object({
		icon: z.string(),
		location: z.string(),
		device: z.string(),
		browser: z.string(),
		connection: z.string(),
		url: z.url(),
	}),
})

export const collections = {
	frameworks,
	tests,
}
