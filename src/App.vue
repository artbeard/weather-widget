<template>
	<div class="weather-widget">
		<WeatherConfig />
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WeatherConfig from "./components/WeatherConfig.vue";
export default defineComponent({
	name: "App",
	components: {
		WeatherConfig
	},
});
</script>

<style lang="scss" scoped>
.weather-widget {
	font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	min-width: 300px;
	max-width: 350px;
	padding: 1em;
}
</style>
