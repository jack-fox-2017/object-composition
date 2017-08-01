'use strict'

const fs = require('fs')

class Cookie {
	constructor(name) {
		this.name = name
		this.status = 'mentah'
		this.ingredients = []
	}

	bake() {
		this.status = 'selesai dimasak'
	}
}

class PeanutButter extends Cookie {
	constructor(name) {
		super(name)
		this.peanutCount = 100
	}
}

class ChocolateChip extends Cookie {
	constructor(name) {
		super(name)
		this.chocChipCount = 200
	}
}

class OtherCookie extends Cookie {
	constructor(name) {
		super(name)
		this.otherCount = 150
	}
}

class CookieFactory {
	static create(options) {
		let result = []

		for (let i = 0; i < options.length; i++) {
			switch(options[i]) {
				case 'peanut butter':
					result.push(new PeanutButter(options[i]))
					break;
				case 'chocolate chip':
					result.push(new ChocolateChip(options[i]))
					break;
				default:
					result.push(new OtherCookie(options[i]))
			}
		}

		return result		
	}
}

const options = fs.readFileSync('cookies.txt', 'utf8').split('\r\n')
let batchOfCookies = CookieFactory.create(options)
console.log(batchOfCookies);