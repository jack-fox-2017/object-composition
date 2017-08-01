class Ingredients {
  constructor(options) {
    this.name = options['name']
    this.amount = options['amount']
    this.has_sugar = options['has_sugar']
  }
}

class Cookie {
  constructor(name, ingredients) {
    this.name = name
    this.status = 'mentah'
    this.ingredients = ingredients
    //this.parseIngredient(ingredients)
  }

  parseIngredient(str) {
    //return [object dari class Ingredients]
  }

  bake(){
    this.status = 'selesai di masak'
  }
}

let fs = require('fs')
this.fileContent = fs.readFileSync('cookies.txt', 'utf8')
let options = this.fileContent.split('\n')

class PeanutButter extends Cookie {
  constructor(name, ingredients) {
    super()
    this.name = name
    this.ingredients   = ingredients
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(name, ingredients) {
    super()
    this.name = name
    this.ingredients   = ingredients
    this.Choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(name, ingredients) {
    super()
    this.name = name
    this.ingredients   = ingredients
    this.other_count = 150
  }
}

class CookieFactory {
  constructor() {}
  static create(options){
    let tmp = []

      for( let i = 0; i < options.length; i++){
        let splitOptions = options[i].split(' = ');

        if(splitOptions[0] === 'peanut butter'){
          // let splitPisah = splitOptions[1].split(',')
          tmp.push(new PeanutButter(splitOptions[0], this.addIngredients(splitOptions[1])))

        }
        else if (splitOptions[0] === 'chocolate chip') {
          tmp.push(new ChocolateChip(splitOptions[0], this.addIngredients(splitOptions[1])))
        }
        else if (splitOptions[0] === 'chocolate cheese') {
          tmp.push(new OtherCookie(splitOptions[0],  this.addIngredients(splitOptions[1])))
        }
        else if (splitOptions[0] === 'chocolate butter') {
          tmp.push(new OtherCookie(splitOptions[0],  this.addIngredients(splitOptions[1])))
        }
      }

      return tmp
  }

  static addIngredients(ingredients){
    let arr= []
    let bahan = ingredients.split(", ")
    for (var i = 0; i<bahan.length; i++){
      var obj = {}
      var bahan_arr = bahan[i].split(" : ")
      obj.name = bahan_arr[1];
      obj.amount = bahan_arr[0]
      obj.has_sugar = null
      arr.push(new Ingredients(obj))
    }
      return arr;
  }

}


let batch_of_cookies = CookieFactory.create(options)
// console.log(batch_of_cookies); masi berbentuk objek
console.log(JSON.stringify(batch_of_cookies,null,2)); // 2 adalah agar lebih rapi pada pemaggilan objek
