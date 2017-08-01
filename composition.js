'use strict'

const fs = require('fs')

class Cookie {
	constructor(name, ingredients) {
		this.name = name
		this.status = 'mentah'
		this.ingredients = ingredients
	}

	bake() {
		this.status = 'selesai dimasak'
	}
}

class Ingredient {
	constructor(options) {
		this.name = options['name']
		this.amount = options['amount']
		this.hasSugar = options['hasSugar']
	}
}

class PeanutButter extends Cookie {
	constructor(name, ingredients) {
		super(name, ingredients)
		this.peanutCount = 100
	}
}

class ChocolateChip extends Cookie {
	constructor(name, ingredients) {
		super(name, ingredients)
		this.chocChipCount = 200
	}
}

class OtherCookie extends Cookie {
	constructor(name, ingredients) {
		super(name, ingredients)
		this.otherCount = 150
	}
}

class PeanutButterCrumbled extends Cookie {
	constructor(name, ingredients) {
		super(name, ingredients)
		this.peanutCount = 100
	}
}

class CookieFactory {
	static create(cookies) {
		let result = []

		for (let i = 0; i < cookies.length; i++) {

			let nameAndIngredients = cookies[i].split(' = ')
			nameAndIngredients[1] = nameAndIngredients[1].split(', ').map(item => {
				let split = item.split(' : ')

				let ingredient = {
					name: split[1],
					amount: split[0],
					hasSugar: split[1] == 'sugar'
				}

				return new Ingredient(ingredient)
			})

			switch(nameAndIngredients[0]) {
				case 'peanut butter':
					result.push(new PeanutButter(nameAndIngredients[0], nameAndIngredients[1]))
					break;
				case 'chocolate chip':
					result.push(new ChocolateChip(nameAndIngredients[0], nameAndIngredients[1]))
					break;
				default:
					result.push(new OtherCookie(nameAndIngredients[0], nameAndIngredients[1]))
			}
		}

		return result		
	}

	static cookieRecom(day, cookies) {
		switch(day) {
			case 'tuesday':

				return cookies.filter(item => {
					for (let i = 0; i < item.ingredients.length; i++) {
						if (item.ingredients[i].hasSugar)
							return false
					}
					return true
				})

				break;
			default:

				return cookies

				break;
		}
		
	}
}

const options = fs.readFileSync('cookies.txt', 'utf8').split('\r\n')
let batchOfCookies = CookieFactory.create(options)
console.log(batchOfCookies);

let sugarFreeFoods = CookieFactory.cookieRecom('tuesday', batchOfCookies)
console.log('sugar free cakes are :');
for (let i = 0; i < sugarFreeFoods.length; i++) {
	console.log(sugarFreeFoods[i].name);
}