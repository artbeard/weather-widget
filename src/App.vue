<template>
	<div class="weather-widget">
		<WeatherConfig />
	</div>
</template>

<script lang="ts">
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import { defineComponent } from "vue";
import WeatherConfig from "./components/WeatherConfig.vue";
import Button from 'primevue/button';
export default defineComponent({
	name: "App",
	components: {
		WeatherConfig,
		Button
	},
});
</script>

<style lang="scss" scoped>
.weather-widget {
	//font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	line-height: 1.3em;
	min-width: 300px;
	max-width: 350px;
	padding: 1em;
}
</style>
