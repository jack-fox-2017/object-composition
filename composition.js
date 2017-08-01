"use strict"
const fs = require('fs')
let options = fs.readFileSync('cookies.txt', 'utf8').trim().split('\n')
class Ingredient {
  constructor(options) {
    this.name = options['name']
    this.amount = options['amount']
    this.has_sugar = options['has_sugar']
  }
}




class Cookie {
  constructor(name,ingredient) {
    this.name = name
    this.ingredient = []
    this.status = "mentah"
  }

  bake() {
    this.status = "selesai masak"
  }
}

class PeanutButter extends Cookie {
  constructor(name,ingredient) {
    super(name,ingredient)
    this.ingredient = ingredient
    this.name = name
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(name,ingredient){
    super(name,ingredient)
    this.ingredient = ingredient
    this.name = name
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(name,ingredient){
    super(name,ingredient)
    this.ingredient = ingredient
    this.name = name
    this.other_count = 150
  }
}

class CookieFactory {
  constructor(){

  }

  static create(options){
    let arrCookie = []
    for (var i = 0; i < options.length; i++) {
      if (options[i] === 'peanut butter') {
        arrCookie.push(new PeanutButter(options[i]))
      }
      else if (options[i] === 'chocolate chip') {
        arrCookie.push(new ChocolateChip(options[i]))
      }
      else {
        arrCookie.push(new OtherCookie(options[i]))
      }
    }
    return arrCookie
  }
}
let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies); //result array of object
