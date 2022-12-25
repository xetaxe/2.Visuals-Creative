export class Car {
	constructor(brand, name = "Guido") {
		this.brand = brand;
		this.name = name;
	}

	get properties() {
		return this.brand + " " + this.name;
	}

}