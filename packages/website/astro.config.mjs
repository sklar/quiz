import icon from 'astro-icon'
import { defineConfig } from 'astro/config'
import browserslist from 'browserslist'
import { browserslistToTargets } from 'lightningcss'

// https://astro.build/config
export default defineConfig({
	vite: {
		css: {
			transformer: 'lightningcss',
			lightningcss: {
				targets: browserslistToTargets(
					browserslist.loadConfig({ path: '.' }) ?? [''],
				),
				drafts: {
					customMedia: true,
				},
			},
		},
	},

	integrations: [icon({
		iconDir: "src/assets/icons",
	})],
})
