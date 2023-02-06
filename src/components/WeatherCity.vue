<template>
	<div class="weater-city-block">
		<div class="weater-city-block__condition">
			<div class="weater-city-block__condition-img">
				<img :src="getWeaterIcon" />
			</div>
			<div class="weater-city-block__condition-temperaure">{{ weaterParams.temp ?? 'no data' }} &#176C</div>
		</div>
		<p class="weater-city-block__description">{{ getCondition }}</p>
		<div class="weater-city-block__forecast">
			<div class="weater-city-block__forecast-item">
				<b>
					<SvgIcon icon="dashboard" />
				</b>
				{{ weaterParams.pressure ?? 'no data' }} Pa
			</div>
			<div class="weater-city-block__forecast-item">
				<b>
					<SvgIcon icon="drop" />
				</b>
				<span>
					{{ weaterParams.humidity ?? 'no data' }} %
				</span>
			</div>
			<div class="weater-city-block__forecast-item">
				<b>
					<SvgIcon icon="wind" />
				</b>
				<span>
					{{ wind?.speed ?? '' }} m/s
					<SvgIcon icon="arrow-up" :style="{transform: `rotate(${wind.deg}deg)`}" v-if="wind?.speed" />
				</span>
			</div>
			<div class="weater-city-block__forecast-item">
				<b>
					<SvgIcon icon="half-drop" />&#176
				</b>
				<span>
					{{ dewPoint }} &#176C
				</span>
			</div>
		</div>
		<p class="weater-city-block__description">
			{{ currentLocale == 'ru' ? 'Дальность видимости' : 'Visibility' }}
			{{ visibility }} m
		</p>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import CurrentLocationMixnin from '../mixins/CurrentLocation'
import { ILocation, IWeatherAnswer, IWeatherParams, IWeatherConditions, IWeatherWind } from "@/use/types";
import { getCookie, setCookie } from 'typescript-cookie'
import { getWeatherData } from "@/use/urlsapi";
export default defineComponent({
	name: "WeatherCity",
	data: ()=>({
		/** Погодные условия */
		conditions: [] as IWeatherConditions[],
		/** Погодные параметры */
		weaterParams: {} as IWeatherParams,
		/** Ветер */
		wind: {} as IWeatherWind | undefined,
		/** Видимость */
		visibility: 0,
	}),
	inject:['apiKey'],
	mixins: [CurrentLocationMixnin],
	props: {
		weatherLocation: {
			type: Object as PropType<ILocation>
		}
	},
	computed:{
		/**
		 * Описание условий 
		 */
		getCondition(): string
		{
			if (this.conditions.length != 0){
				return this.conditions.map(el => {
						return el.description.charAt(0).toUpperCase() + el.description.toLowerCase().slice(1);
					})
					.join('. ');
			}
			return 'no data';
		},
		/**
		 * Иконка облачности 
		 */
		getWeaterIcon(): string
		{
			return (this.conditions.length != 0)
				? `https://openweathermap.org/img/wn/${this.conditions[0].icon}@2x.png`
				: '';
		},
		/**
		 * Расчет точки росы 
		 */
		dewPoint(): number
		{
			let T = this.weaterParams?.temp ?? 0;
			let Rh = this.weaterParams?.humidity ?? 0;
			if (T <= -10) return -10;
			const a:number = 17.27;
			const b:number = 237.7;
			let ft:number = ((a*T)/(b+T)) + Math.log(Rh/100);
			let dp: number = (b * ft)/ (a - ft);
			return Math.floor(dp);
		},
		
		saveFromCache()
		{
		}
	},
	methods: {
		/**
		 * Если время хранения не истекло, то получаем данные погды из cookies
		 * иначе, делаем запрос к серверу.
		 * Время жизни cookie 15 минут.
		 * @param location 
		 */
		loadFromCache(location: ILocation)
		{
			let weaterJsonData: string|null = getCookie(`WeatherWidget${location.lat}${location.lon}`) as string;
			if (weaterJsonData)
			{
				this.parceData( JSON.parse(weaterJsonData) );
			}
			else
			{
				fetch(getWeatherData
					.replace(':lat', String(location?.lat) )
					.replace(':lon', String(location?.lon))
					.replace(':apiKey', this.apiKey as string)
					.replace(':locale', this.currentLocale)
				)
					.then(resp => resp.json())
					.then((data: IWeatherAnswer) => {
						setCookie(`WeatherWidget${location.lat}${location.lon}`, JSON.stringify(data), {expires: (1/24)/4})
						this.parceData(data);
					})
					.catch(err => {
						console.log(err);
					})
			}
		},
		/**
		 * Разбор ответа от сервера
		 * @param data IWeatherAnswer
		 */
		parceData(data: IWeatherAnswer)
		{
			this.weaterParams = data.main;
			this.conditions = data.weather;
			this.wind = data?.wind;
			this.visibility = data?.visibility ?? 0;
		}
	},
	mounted() {
		if (this.weatherLocation?.lat && this.weatherLocation?.lon)
			this.loadFromCache(this.weatherLocation);
	},
});

</script>