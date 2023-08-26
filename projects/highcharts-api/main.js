//@ts-check
"use strict";

import fetchData from "./js/fetchData.js";
import modifyChart from "./js/modifyChart.js";
import chartParams from "./js/chartParams.js";

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

$(document).on("change", "#month", async (e) => {
	linkParams.month = e.currentTarget.value;
	await redraw(linkParams);
});

$(document).on("change", "#day", async (e) => {
	console.log(e.currentTarget.value);
	linkParams.day = e.currentTarget.value;
	await redraw(linkParams);
});

$(document).on("change", "#sort_by", async (e) => {
	linkParams.sort_by = e.currentTarget.value;
	await redraw(linkParams);
});

$(document).on("change", "#order", async (e) => {
	linkParams.order = e.currentTarget.value;
	await redraw(linkParams);
});

$(document).on("change", "#limit", async (e) => { 
	linkParams.limit = e.currentTarget.value;
	await redraw(linkParams);
});

$(document).on("change", "#offset", async (e) => {
	linkParams.offset = e.currentTarget.value*parseInt(linkParams.limit);
	await redraw(linkParams);
});


async function redraw(linkParams) {
	let dataArray = await fetchData(linkParams);
	await modifyChart(chartParams, dataArray, linkParams);
	await Highcharts.chart('container', chartParams);
}

redraw(linkParams);