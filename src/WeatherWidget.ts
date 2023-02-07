import { createApp, App as Application } from 'vue'
import App from './App.vue'
import SvgIcon from './components/SvgIcon.vue';
import PrimeVue from 'primevue/config';
import Panel from "primevue/panel";
import Button from "primevue/button";

export default class WeatherWidget extends HTMLElement {

	private App: Application|null = null;
	/**
	 * Фабричный метод, который создает экземпляр Vue
	 * @returns Application
	 */
	private vueFactory(): Application {
		const app = createApp(App);
		app.use(PrimeVue);
		app.component('SvgIcon', SvgIcon);
		app.component('Panel', Panel);
		app.component('Button', Button);
		return app;
	}

	constructor() {
		super();
	}

	/**
	 * добавление элемента в DOM
	 */
	connectedCallback() {
		this.App = this.vueFactory();
		this.App.provide('apiKey', this.dataset?.apiKey ?? null)
		this.App.mount(this);
	}

	/**
	 * Дестрой элемента
	 */
	disconnectedCallback() {
		this.App = null;
	}
}
