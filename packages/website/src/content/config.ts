import { defineCollection, z } from 'astro:content'

const frameworks = defineCollection({
	type: 'data',
	schema: z.object({
		name: z.string(),
		version: z.string(),
		url: z.string().url(),
		offset: z.string(),
	}),
})

const tests = defineCollection({
	type: 'data',
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
