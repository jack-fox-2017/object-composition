'use strict'

const fs = require('fs')
let options = fs.readFileSync('./cookies.txt', 'utf8').trim().split('\n')

//Class Ingredient
class Ingredient {
  constructor(name, amount) {
    this.name = name
    this.amount = amount
  }
}
//Parents
class Cookie {
  constructor(name,ingredients) {
    this.name = name
    this.status = "mentah"
    this.ingredient = this.pisahIng(ingredients)
    this.sugar = this.hasSugar(JSON.parse(this.ingredient))
  }

  bake() {
    this.status = "selesai dimasak"
  }

  pisahIng(ingredients){
    let ingredSplit = ingredients.split(', ')
    let tamp = {}
    let arrObj = []
    for (var i = 0; i < ingredSplit.length; i++) {
      tamp = new Ingredient(ingredSplit[i].split(':')[1],ingredSplit[i].split(':')[0])
      arrObj.push(tamp)
    }
    return JSON.stringify(arrObj,null)
  }

  hasSugar(ingredients){
    for (var i = 0; i < ingredients.length; i++) {
      if (ingredients[i].name == " sugar") {
        return "=====>>>>> aDa GulaaaaAAAAAAaa";
      }
    }
    return "Gak Aadaaaaa <<<<=======";
  }


}

//Extends
class PeanutButter extends Cookie {
  constructor(name,ingredients) {
    super(name,ingredients)
    this.name = name
    this.peanut_count = 100
  }
}

class ChocholateChip extends Cookie {
  constructor(name,ingredients) {
    super(name,ingredients)
    this.name = name
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie{
  constructor(name,ingredients) {
    super(name,ingredients)
    this.name=name
    this.other_count = 150
  }
}

//Factory Method
class CookieFactory {
  static create(options) {
    let arr = []
    for (var i = 0; i < options.length; i++) {
      let cookie_ingred = options[i].split(' = ')
      // console.log(cookie_ingred);
      if (cookie_ingred[0]=="peanut butter") {
        arr.push(new PeanutButter(cookie_ingred[0], cookie_ingred[1]))
      }else if (cookie_ingred[0]=="chocolate chip") {
        arr.push(new ChocholateChip(cookie_ingred[0], cookie_ingred[1]))
      }else {
        arr.push(new OtherCookie(cookie_ingred[0], cookie_ingred[1]))
      }
    }
      return arr
  }

  static cookieRecomendation(hari, cookie){
    let adaGula = []
    let tanpaGula = []
    for (var i = 0; i < cookie.length; i++) {
      if (cookie[i].sugar == "Gak Aadaaaaa <<<<=======") {
        tanpaGula.push(cookie[i])
      }else {
        adaGula.push(cookie[i])
      }
    }

    if (hari == 'monday' || hari == 'friday') {
      return tanpaGula
    }else {
      return adaGula
    }
  }

}


let batch_of_cookies = CookieFactory.create(options);
// console.log(batch_of_cookies);

let sugarFreeFoods = CookieFactory.cookieRecomendation ("friday", batch_of_cookies);
console.log("sugar free cakes are: ");
for (var i = 0; i < sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i].name);
}
