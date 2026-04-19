import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const frameworks = defineCollection({
	loader: glob({ pattern: '**/*.yaml', base: './src/content/frameworks' }),
	schema: z.object({
		name: z.string(),
		version: z.string(),
		url: z.string().url(),
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
		url: z.string().url(),
	}),
})

export const collections = {
	frameworks,
	tests,
}
