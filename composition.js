class Cookie {
  constructor(name, ingredients) {
    this.name = name
    this.status = 'mentah'
    this.ingredients = ingredients;
    this.has_sugar = this.checkSugar()
  }

  checkSugar() {
    for (let i=0; i<this.ingredients.length; i++) {
      if (this.ingredients[i].name == 'sugar') {
        return true
      }
    }
    return false
  }

  bake() {
    this.status = 'selesai masak'
  }
}


class PeanutButter extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)
    this.peanut_count = 100
    this.name = name
  }
}


class ChocolateChip extends Cookie {
  constructor(name, ingredients) {
    super(name,ingredients)
    this.choco_chip_count = 200
    this.name = name
  }
}


class OtherCookie extends Cookie {
  constructor(name, ingredients) {
    super(name,ingredients)
    this.other_count = 150
    this.name = name
  }
}


class CookieFactory {
  constructor() {}

  static create(options) {
    let arr = []
    for (let i=0; i<options.length; i++) {
      if (options[i].split(' = ')[0] == 'peanut butter') {
        let arrIng = this.olahIngredients(options[i].split(' = ')[1]);
        console.log(arrIng);
        arr.push(new PeanutButter(options[i].split(' = ')[0], arrIng))
      }
      else if (options[i].split(' = ')[0] == 'chocolate chip') {
        arr.push(new ChocolateChip(options[i].split(' = ')[0], this.olahIngredients(options[i].split(' = ')[1])))
      }
      else {
        arr.push(new OtherCookie(options[i].split(' = ')[0], this.olahIngredients(options[i].split(' = ')[1])))
      }
    }
    return arr
  }

  static olahIngredients(strBahan) {
    let arr = []
    let perBahan = strBahan.split(', ')
    for (var i = 0; i < perBahan.length; i++) {
      let obj = {}
      let amountName = perBahan[i].split(' : ')
      obj.name = amountName[1]
      obj.amount = amountName[0]
      arr.push(new Ingredient(obj))
    }
    // console.log(arr);
    return arr
  }

  static cookieRecomendation(today, list) {
    if (today == 'tuesday') {
      let arr = []
      label:
      for (let i=0; i<list.length; i++) {
        for (let j=0; j<list[i].ingredients.length; j++) {
          if (list[i].ingredients[j].has_sugar == true) {
            continue label
          }
        }
        arr.push(list[i])
      }
      return arr
    }
    else {
      return list
    }
  }
}


class Ingredient {
  constructor(options) {
    this.name = options['name']
    this.amount = options['amount']
  }
}





let fs = require('fs')
let list = fs.readFileSync('cookies2.txt', 'utf8').trim().split('\n')

let batch_of_cookies = CookieFactory.create(list)
console.log(JSON.stringify( batch_of_cookies, null, 2));


// let sugarFreeFoods = CookieFactory.cookieRecomendation('tuesday', batch_of_cookies)
//
// for (let i=0; i<sugarFreeFoods.length; i++) {
//   console.log(sugarFreeFoods[i].name);
// }
