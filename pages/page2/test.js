//@ts-check
"use strict";

import {Car} from "./counter.js";

let myCar = new Car("Seat", "Guido");

document.getElementById("but")?.addEventListener("click", changeText);

function changeText() {
	const test = document.getElementById("test");
	test != null ? test.innerHTML += myCar.properties : console.log("Bad code!");
}