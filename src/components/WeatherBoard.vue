<template>
	<Panel class="weater-no-border weather-mb weather-mb-content"
		v-for="(location, index) in locations"
		:key="location.name"
		>
		<template #header>
			<b>{{location.name}}</b>
		</template>
		<template #icons v-if="index == 0">
			<button class="p-panel-header-icon p-link mr-2" @click="toggleToConfig">
				<SvgIcon icon="gear" />
			</button>
		</template>
		<WeatherCity :weather-location="location" />
	</Panel>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WeatherCity from './WeatherCity.vue';
import { WStatus, ILocation } from "@/use/types";
export default defineComponent({
	name: 'WeatherBoard',
	components: {
		WeatherCity,
	},
	emits:['toggleMode'],
	data: ()=>({
		locations: [] as ILocation[],
	}),
	methods:{
		toggleToConfig()
		{
			this.$emit('toggleMode', WStatus.config);	
		}
	},
	created() {
		this.locations = JSON.parse(
			localStorage.getItem('WeatherWidget_locationList') ?? '[]'
		);
	},
})
</script>