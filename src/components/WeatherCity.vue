<template>
	<div class="weater-city-block">
		<div class="weater-city-block__condition">
			<div class="weater-city-block__condition-img">
				<img src="http://openweathermap.org/img/wn/10d@2x.png" alt="" />
			</div>
			<div class="weater-city-block__condition-temperaure">+36 C</div>
		</div>
		<p class="weater-city-block__description">Description Weather</p>
		<div class="weater-city-block__forecast">
			<div class="weater-city-block__forecast-item">Давление</div>
			<div class="weater-city-block__forecast-item">Влажность</div>
			<div class="weater-city-block__forecast-item">Ветер</div>
			<div class="weater-city-block__forecast-item">Точка россы</div>
			<div class="weater-city-block__forecast-item">хз</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
	name: "WeatherCity",
});
</script>