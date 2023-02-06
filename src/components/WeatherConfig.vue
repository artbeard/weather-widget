<template>
	<Panel>
		<template #header>
			Widget Configuration
		</template>
		
		<template #icons>
			<button class="p-panel-header-icon p-link mr-2" @click="saveConfig">
				<SvgIcon icon="check-lg" />
			</button>
			<button class="p-panel-header-icon p-link mr-2" @click="toggleToWeather">
				<SvgIcon icon="x-lg" />
			</button>
		</template>

		<div class="weater-city-list">
			<Draggable v-model="locations" item-key="id">
				<template #item="{element}">
					<div class="weater-city-list__item">
						<span class="weater-city-list__item-sort-handler">
							<SvgIcon icon="list" />
						</span>
						<span class="weater-city-list__item-city-label">{{element.name}}</span>
						<Button label="Primary" class="p-button-danger p-button-sm p-button-text weater-city-list__item-controll-del"
							@click="deleteLocation(element)">
							<SvgIcon icon="trash" />
						</Button>
					</div>
				</template>
			</Draggable>
		</div>

		<div class="p-inputgroup">
			<AutoComplete
				v-model="selectedLocation"
				:suggestions="findedLocation"
				:delay="300"
				@complete="searchLocation" 
				@item-select="locationSelected"
				optionLabel="title"
				placeholder="Search Location">
			</AutoComplete>
		</div>
		
	</Panel>
</template>

<script lang="ts">
import { defineComponent, toRaw } from "vue";
import CurrentLocationMixnin from '../mixins/CurrentLocation'
import InputText from 'primevue/inputtext';
import AutoComplete from 'primevue/autocomplete';
import Draggable from 'vuedraggable'
import { WStatus, ILocation, ISearchLocation, ISelectedLocation } from "@/use/types";
import { searchLocation } from "@/use/urlsapi";
export default defineComponent({
	name: "WeatherConfig",
	components: {
		InputText,
		AutoComplete,
		Draggable
	},
	emits: ['toggleMode'],
	inject: ['apiKey'],
	mixins: [CurrentLocationMixnin],
	data() {
		return {
			selectedLocation: null,
			locations: [] as ILocation[],
			findedLocation: [] as ISelectedLocation[],
		}
	},
	methods: {
		searchLocation(event: any) {
			let query: string = event?.query;
			fetch(searchLocation.replace(':query', query).replace(':apiKey', this.apiKey as string), {
				method: 'GET',
			})
			.then(resp => resp.json())
			.then((data: ISearchLocation[])  => {
				//Преобразуем формат //Todo вынести в хелперы
				this.findedLocation = data.map((el: ISearchLocation): ISelectedLocation => {
					let location: ILocation = {
						name: el.name,
						lat: el.lat,
						lon: el.lon,
						country: el.country,
					};
					let localeTtle: string = `${el.country}`;
					if (el?.local_names && el.local_names[this.currentLocale])
					{
						localeTtle += ` ${el.local_names[this.currentLocale]}`;
						location.name = el.local_names[this.currentLocale];
					}
					else
					{
						localeTtle += ` ${el.name}`
					}
					if (el?.state)
					{
						localeTtle += ` (${el?.state})`
					}
					return {
						title: localeTtle,
						location: location 
					}
				});
			})
			.catch(err => {
				console.log(err);
				this.findedLocation = [];
			});
		},
		locationSelected(event: any)
		{
			this.locations.push(event?.value?.location); //Добавление локации в список
			this.selectedLocation = null;
			this.findedLocation = [];
		},
		deleteLocation(element: ILocation)
		{
			this.locations = this.locations.filter(el => {
				return (el.lat !== element.lat && el.lon !== element.lon)
			})
		},
		saveConfig()
		{
			localStorage.setItem('WeatherWidget_locationList', JSON.stringify(toRaw(this.locations)));
			this.toggleToWeather();	
		},

		toggleToWeather()
		{
			this.$emit('toggleMode', WStatus.weaher);
		}
	},

	
	created() {
		this.locations = JSON.parse(
			localStorage.getItem('WeatherWidget_locationList') ?? '[]'
		);
	},

});
</script>