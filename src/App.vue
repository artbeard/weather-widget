<template>
	<div class="weather-widget">
		<WeatherBoard />
	</div>
</template>

<script lang="ts">
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import { defineComponent } from "vue";
import WeatherConfig from "./components/WeatherConfig.vue";
import WeatherBoard from './components/WeatherBoard.vue';
import Button from 'primevue/button';
export default defineComponent({
	name: "App",
	components: {
		WeatherConfig,
		WeatherBoard,
		Button
	},
});
</script>

<style lang="scss">
.weather-widget {
	//font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	line-height: 1.3em;
	min-width: 300px;
	max-width: 350px;
	padding: 1em;

	input[type=text], input[type=search]{
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
		font-size: 1rem;
		color: #495057;
		background: #ffffff;
		padding: 0.5rem 0.5rem;
		border: 1px solid #ced4da;
		transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		border-radius: 3px;
		height: auto;
		width: auto;
		margin: auto;
	}
	input[type=text]:focus, input[type=search]:focus{
		outline: 0 none !important;
		outline-offset: 0 !important;
		box-shadow: 0 0 0 0.2rem #a6d5fa !important;
		border-color: #2196F3 !important;
	}

	@keyframes spinner-border {
		to { transform: rotate(360deg) #{"/* rtl:ignore */"}; }
	}
	.weather-spinner{
		display: inline-block;
		width: 2rem;
		height: 2rem;
		vertical-align: -0.125em;
		border: 0.25em solid currentColor;
		border-right-color: transparent;
		border-radius: 50%;
		-webkit-animation: .75s linear infinite spinner-border;
		animation: .75s linear infinite spinner-border;
		width: 1rem;
		height: 1rem;
		border-width: 0.2em;
	}

	.p-panel{
		.p-panel-header{
			padding: 0.5rem 1rem !important;
		}
	}
	.p-panel.weater-no-border .p-panel-content
	{
		border-color: rgba($color: #FFF, $alpha: 0);
	}
	.p-panel.weater-no-border .p-panel-header{
		border-color: rgba($color: #FFF, $alpha: 0);
		background-color: rgba($color: #FFF, $alpha: 0);
	}

	.p-panel.weather-mb{
		margin-bottom: 2rem;
	}
	.p-panel.weather-mb-content .p-panel-content{
		padding-top: 0;
		padding-bottom: 0;
	}

	.weater-city-list{
		.weater-city-list__item{
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: rgba($color: #000, $alpha: 0.1) 1px solid;
			padding-bottom: 0.5rem;
			margin-bottom: 0.5rem;

			.weater-city-list__item-sort-handler{
				display: flex;
				justify-content: start;
				padding: 0.5rem;
				cursor: move;
			}
			.weater-city-list__item-city-label{
				margin-left: 1rem;
				flex: 1 1 auto;
				display: flex;
			}
			.weater-city-list__item-controll-del{
				justify-content: end;
				display: flex;
			}
		}
		.weater-city-list__item:last-child{
			border-bottom: rgba($color: #FFFFFF, $alpha: 0) 1px solid;
		}
	}

	.weater-city-block{
		.weater-city-block__condition{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.weater-city-block__condition-img,
			.weater-city-block__condition-temperaure{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 50%;
			}
			.weater-city-block__condition-temperaure{
				font-size: 2rem;
			}
		}
		.weater-city-block__description{
			text-align: center;
		}
		.weater-city-block__forecast{
			display: flex;
			flex-wrap: wrap;
			//align-items: center;
			justify-content: space-between;
			.weater-city-block__forecast-item{
				//display: flex;
				//align-items: center;
				//justify-content: center;
				width: 50%;
				text-align: center;
			}
		}
	}
}
</style>
