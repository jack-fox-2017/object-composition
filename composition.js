"use strict"
const fs = require('fs')
let options = fs.readFileSync('cookies.txt', 'utf8').trim().split('\n')
class Ingredient {
  constructor(options) {
    this.name = options['name']
    this.amount = options['amount']
    //this.has_sugar = options['has_sugar']
  }
}

class Cookie {
  constructor(name,ingredient) {
    this.name = name
    this.ingredient = this.getIngredient(ingredient)
    this.sugar = this.getSugar(ingredient)
    this.status = "mentah"
  }

  bake() {
    this.status = "selesai masak"
  }
  getIngredient(bahan) {
    let arrBahan = []

    for (var i = 0; i < bahan.length; i++) {
        let obj = bahan[i].split(':')
      let beobj = {
        name : obj[1],
        amount : obj[0]
      }
    arrBahan.push(beobj)
    }
    return arrBahan
  }

  getSugar(no){
    let arrSugar = []
    for(let i = 0; i < no.length; i++) {
      if (/sugar/g.test(no)){
        return 'Has Sugar'
      } else {
        return 'Free Sugar'
      }

  }
}
}

class PeanutButter extends Cookie {
  constructor(name,ingredient) {
    super(name,ingredient)
    // this.ingredient = new Ingredient(name, amount, has_sugar)
    // this.ingredients = ...manggil method(ingredient)
    this.name = name
    this.peanut_count = 100
  }

  // method(ingredient) {
  //   let arr = []
  //   looping ingredient
  //     split by :, supaya dapet nama ing & amount ingrd
  //     arr.push(newIngredient(nama_ing, amount_ingr, hasSugar))
  // }
  // this.ingredients
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
    let getName = options[i].split(' = ')
      if (getName[0] === 'peanut butter') {
        arrCookie.push(new PeanutButter(getName[0].trim(),getName[1].toString().split(',')))
      }
      else if (options[i] === 'chocolate chip') {
        arrCookie.push(new ChocolateChip(getName[0].trim(),getName[1].toString().split(',')))
      }
      else {
        arrCookie.push(new OtherCookie(getName[0].trim(),getName[1].toString().split(',')))
      }
    }
    return arrCookie
  }
  static cookieRecommendation(day, cookiesList){
    let recom = []
    if( day !== 'tuesday'){
      return 'Just eat everything'
    } else {
      for(let i =0; i < cookiesList.length; i++){
        if(cookiesList[i].sugar === 'Free Sugar'){
          recom.push(cookiesList[i].name)
        }
      }
    }
    // console.log('===============' + recom);
    return recom
}
}
let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies); //result array of object


let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday', batch_of_cookies);
console.log("========== SUGAR FREE CAKES ARE: ==========");
for(let i = 0; i < sugarFreeFoods.length; i++){
  console.log(sugarFreeFoods[i]);
}
