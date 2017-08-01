"use strict"

var fs = require("fs")
//let options = fs.readFileSync('cookies.txt', 'utf8').trim().split('\n');
let options = fs.readFileSync('resep.txt', 'utf8').trim().split('\n');

class Cookie{
  constructor(name, ingredients){
    this.name = name
    this.status = "mentah"
    this.ingredients = this.getIngredients(ingredients)
    this.has_sugar = /sugar/.test(ingredients);
  }

  bake(){
    return this.status = "selesai dimasak"
  }

  getIngredients(ingredients){
    let result = []
    for(let i=0; i<ingredients.length; i++){
      let pisah = ingredients[i].split(':')
      //console.log(pisah[1]);
      let obj = {
        name : pisah[1],
        amount : pisah[0]
      }
      result.push(new Ingredient(obj))
    }
    return JSON.stringify(result)
  }
}

class Ingredient{
  constructor(options){
    this.name = options['name']
    this.amount = options['amount']
    this.has_sugar = options['has_sugar']
  }
}

class PeanutButter extends Cookie{
  constructor(name,status,ingredients){
    super(name,status,ingredients)
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie{
  constructor(name,status,ingredients){
    super(name,status,ingredients)
    this.choc_chip_count = 200
  }
}
class OtherCookie extends Cookie{
  constructor(name, status, ingredients){
    super(name, status, ingredients)
    this.other_count = 150
  }
}

class CookieFactory{
  constructor(){}

  static createCookie(options){
    let save = []
    for(let i=0; i < options.length; i++){
      let kukisName =  options[i].split('=') //array
      let name = kukisName[0].trim()
      let bahan = kukisName[1].trim().split(',')
      if (name == "peanut butter") {
        this.kukis = new PeanutButter(name, bahan)
        save.push(this.kukis)
      }else if (name == "chocolate chip") {
        this.kukis = new ChocolateChip(name, bahan)
        save.push(this.kukis)
      } else {
        this.kukis = new OtherCookie(name, bahan)
        save.push(this.kukis)
      }
    }
    return save
  }


  static cookieRecomendation(day, selectCookie){
    let arrCookie = []
    if (day != "tuesday") {
      return "Day to be a Monster Cookie"
    } else{
      for (var i = 0; i < selectCookie.length; i++) {
        if (selectCookie[i].has_sugar === false) {
          arrCookie.push(selectCookie[i])
        }
      }
    }
    return arrCookie
  }

}

var batch_of_cookies = CookieFactory.createCookie(options)
console.log(batch_of_cookies);

var sugarFreeFoods = CookieFactory.cookieRecomendation("tuesday", batch_of_cookies)
console.log("Sugar free cakes are :");
for (var i = 0; i < sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i].name);
}
