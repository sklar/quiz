import vue from '@vitejs/plugin-vue'
import browserslist from 'browserslist'
import { browserslistToTargets } from 'lightningcss'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	css: {
		transformer: 'lightningcss',
		lightningcss: {
			targets: browserslistToTargets(
				browserslist.loadConfig({ path: '../../.browserslistrc' })!,
			),
			drafts: {
				customMedia: true,
			},
		},
	},
	plugins: [vue()],
})
