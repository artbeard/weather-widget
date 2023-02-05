<template>
	<Panel class="weater-no-border weather-mb weather-mb-content" v-for="(city, index) in cities" :key="city">
		<template #header>
			<b>{{city}}</b>
		</template>
		<template #icons v-if="index == 0">
			<button class="p-panel-header-icon p-link mr-2" @click="toggleToConfig">
				<SvgIcon icon="gear" />
			</button>
		</template>
		<WeatherCity />
	</Panel>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WeatherCity from './WeatherCity.vue';
import { WStatus } from '@/use/types';
export default defineComponent({
	name: 'WeatherBoard',
	components: {
		WeatherCity,
	},
	emits:['toggleMode'],
	data: ()=>({
		cities: [
			'London',
			'Moscow'
		]
	}),
	methods:{
		toggleToConfig()
		{
			this.$emit('toggleMode', WStatus.config);	
		}
	}
})
</script>