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
		
		<Message :severity="message.type" :closable="false" v-if="message.text" >
			<SvgIcon v-if="waitRequestAnimation" />	{{ message.text }}
		</Message>

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
import AutoComplete from 'primevue/autocomplete';
import Message from "primevue/message";
import Draggable from 'vuedraggable'
import { WStatus, ILocation, ISearchLocation, ISelectedLocation } from "@/use/types";
import { searchLocation, searchLocationByCoords } from "@/use/urlsapi";
export default defineComponent({
	name: "WeatherConfig",
	components: {
		AutoComplete,
		Draggable,
		Message,
	},
	emits: ['toggleMode'],
	inject: ['apiKey'],
	mixins: [CurrentLocationMixnin],
	data() {
		return {
			selectedLocation: null, //v-model окна поиска
			locations: [] as ILocation[], //Список локаций в которых будем отображать погоду
			findedLocation: [] as ISelectedLocation[], //массив для выбора при поиске

			waitRequestAnimation: false, //Анимация
			//Объект сообщения
			message:{
				type: 'error' as 'error' | 'info',
				text: null as string | null,
			},
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
				//Преобразуем формат
				this.findedLocation = data.map((el: ISearchLocation): ISelectedLocation => {
					let location: ILocation = this.createLocation(el);
					//Формируем из найденных вариантов локаций
					//объекты для отображения с списке выбора
					//с учетом локали браузера
					let localeTitle: string = `${el.country}`;
					if (el?.local_names && el.local_names[this.currentLocale])
					{
						localeTitle += ` ${el.local_names[this.currentLocale]}`;
						location.name = el.local_names[this.currentLocale];
					}
					else
					{
						localeTitle += ` ${el.name}`
					}
					if (el?.state)
					{
						localeTitle += ` (${el?.state})`
					}
					return {
						title: localeTitle,
						location: location 
					}
				});
			})
			.catch(err => {
				console.log(err);
				this.findedLocation = [];
			});
		},
		
		/**
		 * Преобразует найденное местоположение в объект ILocation
		 * @param data ISearchLocation
		 */
		createLocation(data: ISearchLocation): ILocation
		{
			return {
				name: data.name,
				lat: data.lat,
				lon: data.lon,
				country: data.country,
			}
		},
		/**
		 * Выбор локации из выпадающего списка
		 */
		locationSelected(event: any)
		{
			this.locations.push(event?.value?.location); //Добавление локации в список
			this.checkForEmptyList();
			this.selectedLocation = null;
			this.findedLocation = [];
		},
		
		deleteLocation(element: ILocation)
		{
			this.locations = this.locations.filter(el => {
				return (el.lat !== element.lat && el.lon !== element.lon)
			})
			this.checkForEmptyList();
		},
		saveConfig()
		{
			localStorage.setItem('WeatherWidget_locationList', JSON.stringify(toRaw(this.locations)));
			this.toggleToWeather();	
		},
		/**
		 * Выводим/скрываем сообщение о необходимости добавить хотя бы одну локацию
		 */
		checkForEmptyList()
		{
			if (this.locations.length == 0)
			{
				this.message = {
					type: 'info',
					text: 'Add at least one location to display the weather'
				};
			}
			else
			{
				this.message.text = null;
			}
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
		//Если пользователь еще никогда не настраивал виджет, инициируем автоприск локации
		if (localStorage.getItem('WeatherWidget_locationList') === null)
		{
			if (navigator.geolocation)
			{
				this.waitRequestAnimation = true;
				this.message = {
					type: 'info',
					text: 'We are looking for your location. Allow access in the browser or find your location yourself.'
				};
				navigator.geolocation.getCurrentPosition((pos) => {
						let crd = pos.coords;
						fetch(searchLocationByCoords
								.replace(':lat', String(crd?.latitude) )
								.replace(':lon', String(crd?.longitude))
								.replace(':apiKey', this.apiKey as string)
							)
							.then(res => res.json())
							.then((data: ISearchLocation[]) => {
								//Нашли локацию
								if (data.length)
								{
									//Преобазуем и выбираем первую найденную локацию
									let location: ILocation = this.createLocation(data[0]);
									this.locations.push(location);
									this.checkForEmptyList();
								}
							})
							.catch((err: any) => {
								//Запросить локацию с данными координатами не удалось
								this.message = {
									type: 'error',
									text: 'We were unable to determine your location. Try to do it yourself.'
								};
							})
							.finally(() => {
								this.waitRequestAnimation = false;
							});
					},
					//Определить координаты не удалось
					(err) => {
						this.waitRequestAnimation = false;
						this.message = {
							type: 'error',
							text: err.message
						};
					},
					{
						enableHighAccuracy: true,
						timeout: 5000,
						maximumAge: 0
					});
			}
			else
			{
				this.waitRequestAnimation = false;
				this.message = {
					type: 'info',
					text: 'Automatic location detection is not possible. Find your desired location yourself.'
				};
			}
		}
		else
		{
			this.checkForEmptyList();
		}

	},

});
</script>