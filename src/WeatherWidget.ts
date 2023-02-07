import { createApp, App as Application } from 'vue'
import App from './App.vue'

export default class WeatherWidget extends HTMLElement {

	private App: Application|null = null;
	/**
	 * Фабричный метод, который создает экземпляр Vue
	 * @returns Application
	 */
	private vueFactory(): Application {
		const app = createApp(App);
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
		this.App.mount(this);
	}

	/**
	 * Дестрой элемента
	 */
	disconnectedCallback() {
		this.App = null;
	}
}
