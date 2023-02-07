<template>
	<div class="weather-widget">
		<component :is="getElement" @toggle-mode="toggleMode"></component>
	</div>
</template>

<script lang="ts">
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import { defineComponent } from "vue";
import WeatherConfig from "./components/WeatherConfig.vue";
import WeatherBoard from './components/WeatherBoard.vue';
import { WStatus } from './use/types'
export default defineComponent({
	name: "App",
	components: {
		WeatherConfig,
		WeatherBoard,
	},
	data: ()=>({
		mode: WStatus.config
	}),
	computed:{
		getElement()
		{
			return this.mode === WStatus.config ? WeatherConfig : WeatherBoard;
		}
	},
	methods:{
		toggleMode(mode: WStatus)
		{
			this.mode = mode;
		}
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
	}

	.p-panel.weather-mb{
		margin-bottom: 2rem;
	}
	.p-panel.weather-mb-content .p-panel-content{
		padding-top: 0;
		padding-bottom: 0;
	}

	@keyframes fa-spin{
		0%{
			transform:rotate(0deg)
		}
		to{
			transform:rotate(359deg)
		}
	}
	
	.p-autocomplete .p-autocomplete-loader::before{
		background: url('data:image/png;base64,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');
		display: block;
		height: 16px;
		width: 16px;
		content: '';
		color: black;
	}
	.p-autocomplete .p-autocomplete-loader{
		animation: fa-spin 2s linear infinite;	
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
				font-weight: 600;
			}
		}
		.weater-city-block__description{
			text-align: center;
			margin-bottom: 1rem;
		}
		.weater-city-block__forecast{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.weater-city-block__forecast-item{
				padding: 1rem 0;
				width: 50%;
				text-align: center;
				b{
					vertical-align: middle;
					padding-right: 0.5rem;
				}
				span{
					vertical-align: middle;
				}
			}
		}
	}

	.weater-notice{
		text-align: center;
		padding: 1rem 0.5rem;
	}
	.weater-notice .weater-notice-error{
		color: red;
	}
}
</style>
