import { defineComponent } from 'vue';
export default defineComponent({
	name: 'CurrentLocationMixnin',
	data:() => ({
		currentLocale: 'en',
	}),
	mounted() {
		this.currentLocale = (navigator.language)
			? navigator.language.substring(0, 2)
			: 'en';
	},
})