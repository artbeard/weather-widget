import { createApp } from 'vue'
import App from './App.vue'
import SvgIcon from './components/SvgIcon.vue';
import PrimeVue from 'primevue/config';
import Panel from "primevue/panel";
import Button from "primevue/button";

createApp(App)
	.use(PrimeVue)
	.component('SvgIcon', SvgIcon)
	.component('Panel', Panel)
	.component('Button', Button)
	.mount('#app')
