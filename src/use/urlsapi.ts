export const searchLocation: string = `https://api.openweathermap.org/geo/1.0/direct?q=:query&limit=5&appid=:apiKey`;
export const getWeatherData: string = `https://api.openweathermap.org/data/2.5/weather?lat=:lat&lon=:lon&appid=:apiKey&units=metric&lang=:locale`;
export const searchLocationByCoords: string = `https://api.openweathermap.org/geo/1.0/reverse?lat=:lat&lon=:lon&limit=5&appid=:apiKey`;