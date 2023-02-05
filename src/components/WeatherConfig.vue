<template>
	<Panel>
		<template #header>
			Widget Configuration
		</template>
		
		<template #icons>
			<button class="p-panel-header-icon p-link mr-2" @click="toggleToWeather">
				<SvgIcon icon="check-lg" />
			</button>
			<button class="p-panel-header-icon p-link mr-2" @click="toggleToWeather">
				<SvgIcon icon="x-lg" />
			</button>
		</template>

		<div class="weater-city-list">
			<Draggable v-model="cities" item-key="id">
				<template #item="{element}">
					<div class="weater-city-list__item">
						<span class="weater-city-list__item-sort-handler">
							<SvgIcon icon="list" />
						</span>
						<span class="weater-city-list__item-city-label">{{element.title}}</span>
						<Button label="Primary" class="p-button-danger p-button-sm p-button-text weater-city-list__item-controll-del"><SvgIcon icon="trash" /></Button>
					</div>
				</template>
			</Draggable>
		</div>

		<div class="p-inputgroup">
			<AutoComplete
				v-model="selectedCountry"
				_suggestions="filteredCountriesBasic"
				@complete="searchCountry($event)" 
				optionLabel="--" placeholder="SearchCountry">
				<template #loader>
					<div class="weather-spinner"></div>			
				</template>
			</AutoComplete>
		</div>
		
			
	</Panel>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InputText from 'primevue/inputtext';
import AutoComplete from 'primevue/autocomplete';
import Draggable from 'vuedraggable'
import { WStatus } from "@/use/types";
export default defineComponent({
	name: "WeatherConfig",
	components: {
		InputText,
		AutoComplete,
		Draggable
	},
	emits:['toggleMode'],
	data() {
		return {
			selectedCountry: null,
			filteredCountries: null,
			cities:[
				{
					id: 1,
					title: 'London' 	
				},
				{
					id: 2,
					title: 'Moscow'	
				},
				{
					id: 3,
					title: 'Omsk'
				},
			],
		}
	},
	countryService: null,
	created() {
		//this.countryService = new CountryService();
	},
	methods: {
		searchCountry(event: any) {
            //this.filteredCountriesBasic = this.countryService.search(event.query);
		},
		toggleToWeather()
		{
			this.$emit('toggleMode', WStatus.weaher);	
		}
	}

});
</script>