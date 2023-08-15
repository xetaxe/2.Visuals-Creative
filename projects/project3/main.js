//@ts-check
"use strict";

import refetchData from "./refetchData.js";
import modifyChart from "./modifyChart.js";
import chartParams from "./chartParams.js";

$( function() {

	let dataArray = [];
	const Highcharts = window["Highcharts"];

	const linkParams = {
		month: "2021-01",
		day: undefined,
		token: "kx8Lm6spO9Lx6xNa8lNC61Kx20Ql37",
		sort_by: "hours_watched",
		order: "desc",
		limit: "25",
		offset: "0"
	}

	async function redraw(linkParams, dataArray, chartParams) {
		dataArray = await refetchData(linkParams);
		await modifyChart(chartParams, dataArray, linkParams);
		console.log(chartParams);
		await Highcharts.chart('container', chartParams);
	}

	redraw(linkParams, dataArray, chartParams);

	$(document).on("change", "#timeframe", (e) => {
		let timeframe = e.currentTarget.value;
		if ( timeframe === "day") {
			linkParams.month = undefined;
			$("#day").show();
			$("#month").hide();
		} else {
			linkParams.day = undefined;
			$("#month").show();
			$("#day").hide();
		}
	});

	$(document).on("change", "#month", (e) => {
		linkParams.month = e.currentTarget.value;
		redraw(linkParams, dataArray, chartParams);
	});

	$(document).on("change", "#day", (e) => {
		console.log(e.currentTarget.value);
		linkParams.day = e.currentTarget.value;
		redraw(linkParams, dataArray, chartParams);
	});

	$(document).on("change", "#sort_by", async (e) => {
		linkParams.sort_by = e.currentTarget.value;
		redraw(linkParams, dataArray, chartParams);
	});
	$(document).on("change", "#order", async (e) => {
		linkParams.order = e.currentTarget.value;
		redraw(linkParams, dataArray, chartParams);
	});
	$(document).on("change", "#limit", async (e) => { 
		linkParams.limit = e.currentTarget.value;
		redraw(linkParams, dataArray, chartParams);
	});

	// $(document).on("change", "#offset", (e) => {
	// 	 linkParams.offset = e.currentTarget.value;
	// refreshData(linkParams);
	// 	});

});