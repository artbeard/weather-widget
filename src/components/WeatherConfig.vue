<template>
	<Panel>
		<template #header>
			Widget Configure
		</template>
		
		<template #icons>
			<button class="p-panel-header-icon p-link mr-2" _click="toggle">
				<SvgIcon icon="check-lg" />
			</button>
			<button class="p-panel-header-icon p-link mr-2" _click="toggle">
				<SvgIcon icon="x-lg" />
			</button>
		</template>

		<div class="weater-city-list">
			<div class="weater-city-list__item">
				<span class="weater-city-list__item-sort-handler">
					<SvgIcon icon="list" />
				</span>
				<span class="weater-city-list__item-city-label">Город1</span>
				<Button label="Primary" class="p-button-danger p-button-sm p-button-text weater-city-list__item-controll-del"><SvgIcon icon="trash" /></Button>
			</div>
			<div class="weater-city-list__item">
				<span class="weater-city-list__item-sort-handler">
					<SvgIcon icon="list" />
				</span>
				<span class="weater-city-list__item-city-label">Город1</span>
				<Button label="Primary" class="p-button-secondary p-button-sm p-button-text weater-city-list__item-controll-del"><SvgIcon icon="trash" /></Button>
			</div>
			<div class="weater-city-list__item">
				<span class="weater-city-list__item-sort-handler">
					<SvgIcon icon="list" />
				</span>
				<span class="weater-city-list__item-city-label">Город1</span>
				<Button label="Primary" class="p-button-secondary p-button-sm p-button-text weater-city-list__item-controll-del"><SvgIcon icon="trash" /></Button>
			</div>
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
export default defineComponent({
	name: "WeatherConfig",
	components: {
		InputText,
		AutoComplete
	},

	data() {
		return {
			selectedCountry: null,
			filteredCountries: null
		}
	},
	countryService: null,
	created() {
		//this.countryService = new CountryService();
	},
	methods: {
		searchCountry(event: any) {
            //this.filteredCountriesBasic = this.countryService.search(event.query);
		}
	}

});
</script>