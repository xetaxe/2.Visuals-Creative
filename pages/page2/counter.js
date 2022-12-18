export class Car {
	constructor(brand, name) {
		this.brand = brand;
		this.name = name;
	}

	get properties() {
		return this.brand + " " + this.name;
	}

}