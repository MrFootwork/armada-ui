// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "@/assets/scss/_colors.scss" as *;',
					additionalData: '@use "@/assets/scss/_variables.scss" as *;',
				},
			},
		},
	},
	css: ['normalize.css/normalize.css'],
})
