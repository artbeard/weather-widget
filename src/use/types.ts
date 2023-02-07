export enum WStatus{
	config,
	weaher
}

export interface ILocalNames{
	[key: string]: string
}
export interface ILocation{
	name: string,
	lat: number,
	lon: number,
	country: string,
}
/**
 * ИНтерфейс ответа при поиске
 */
export interface ISearchLocation{
	name: string,
	lat: number,
	lon: number,
	country: string,
	state?: string,
	local_names?: ILocalNames,
	location?: ILocation
}

export interface ISelectedLocation{
	title: string,
	location: ILocation
}
/**
 * Интерфейсы погодных данных
 */
export interface IWeatherParams{
	temp: number, //температура
	feels_like: number, //Температура по ощущениям
	temp_min: number, //min
	temp_max: number, //max
	pressure: number, //давление
	humidity: number, //Влажность
	sea_level: number, //Давление над уровнем моря
	grnd_level: number //Давление над землей
}
export interface IWeatherWind{
	speed: number, //Скорость
	deg: number, //Направление
	gust?: number //хз
}
export interface IWeatherClouds{
	all: number, //Процент облачности
}
export interface IWeatherRain{
	[key: string]: number
}
export interface IWeatherSnow{
	[key: string]: number
}
export interface IWeatherConditions{
	id: number,
	main: string,
	description: string,
	icon: string
}
export interface IWeatherServiceData{
	[key: string|number]: string|number
}

export interface IWeatherAnswer{
	main: IWeatherParams,
	visibility: number, //Дальность видимости
	weather: IWeatherConditions[],
	dt: number, //timestamp
	wind?: IWeatherWind,
	clouds?: IWeatherClouds,
	rain?: IWeatherRain,
	snow?: IWeatherSnow,

	cod?: number
	id?: number,
	name?: string,
	base?: string,
	timezone?: number,
	coord?: IWeatherServiceData,
	// {
	// 	"lon": 37.6184,
	// 	"lat": 55.7512
	// },
	sys?: IWeatherServiceData,
	// {
	// 	"type": 1,
	// 	"id": 9029,
	// 	"country": "RU",
	// 	"sunrise": 1675660483,
	// 	"sunset": 1675692747
	// },
}