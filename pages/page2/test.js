//@ts-check
"use strict";

import {Car} from "./counter.js";
import chartParams from "./chartParams.js";

$(document).ready( function() {

	const myCar = new Car("Seat", "Jaume");

	$("#but")?.on("click", () =>	$("#test")?.append(JSON.stringify(myCar)));

	const Highcharts = window["Highcharts"];

	Highcharts.chart('container', chartParams);

});