// bkin clss ingredients yang masuk k class cookie
// factory pas outcome nya include ingredients nya
// composition yang msk akal hanya bilsa masuk ke class yg lbh besar kyk mango di mango tree

// var employee = new employee('john','doe' )
// var group = new Group('xxx', employee) aggregation parent nya gk mati klo anakny di delete

// RELEASE 1
'use strict'
const fs = require('fs');

var options = fs.readFileSync('cookies.txt').toString().split('\n');
options.pop();

class Cookie {
  constructor(nama,ingredients,status){
    this.nama = nama;
    this.status = 'mentah';
    this.ingredients = ingredients;
  }

  bake(){
    this.status = 'selesai dimasak';
  }
}

class Ingredients {
  constructor(options) {
    this.name = options['name']
    this.amount = options['amount']
    this.has_sugar = options['has_sugar']
    // this.totalIngredients = ingredients.length;
  }
}

class PeanutButter extends Cookie{
  constructor(nama,ingredients,status){
    super(nama,ingredients,status)
    this.peanut_count = 100;
  }
}

class ChocholateChip extends Cookie{
  constructor(nama,ingredients,status){
    super(nama,ingredients,status)
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie{
  constructor(nama,ingredients,status){
    super(nama,ingredients,status)
    this.other_count = 150;
  }
}

class CookieFactory { // menghasilkan objects di dalem array
  constructor() {
    // this.batch = [];
  }
  // console.log(listed[0].Ingredient[0]);
  // { name: 'flour', amount: '1 cup', has_sugar: false }
  // console.log(listed[0].Ingredient[0]['has_sugar']);
  //flour
  static create (options) {
    var listOfCakes = this.parseBahan(options);
    // console.log(JSON.stringify(listOfCakes,null,2));
    // console.log(listOfCakes.length);
    var batch = [];
    for (let i=0; i<listOfCakes.length; i++) {
      if (listOfCakes[i].CakeName == 'peanut butter') {
        batch.push(new PeanutButter(listOfCakes[i].CakeName, listOfCakes[i].Ingredient));
      }
      else if (listOfCakes[i].CakeName == 'chocolate chip') {
        batch.push(new ChocholateChip(listOfCakes[i].CakeName, listOfCakes[i].Ingredient));
      } else {
        batch.push(new OtherCookie(listOfCakes[i].CakeName, listOfCakes[i].Ingredient));
      }
    }
    return batch;
  }

  static parseBahan(options) {
    for (let i=1; i<options.length;i+=2) {
      var list = options[i].split(',');
      var arr = [];
      for (let q=0; q<list.length; q++) {
        var obj = {};
        var eachIngre = list[q].split(' : ');
        obj['name'] = eachIngre[1]
        obj['amount'] = eachIngre[0]

        if (eachIngre[1] == 'sugar') {
          obj['has_sugar'] = true;
        } else {
          obj['has_sugar'] = false;
        }
        arr.push(obj);
      }
      options[i] = arr;
    }

    var listed=[]
    for (let i =0; i<options.length; i+=2) {
      var cakeName = {}
      cakeName['CakeName'] = options[i]
      cakeName['Ingredient'] = options[i+1]
      listed.push(cakeName);
    }
    return listed;
  }

  static cookieRecommendation(day, input) {

    let recommendation = [];
    if (day == 'tuesday') {
                label:
                for (let i=0; i<input.length; i++) {
                  // console.log(input[3].ingredients[0].has_sugar);
                  for (let q=0; q<input[i].ingredients.length; q++) {
                    // console.log('yoo');
                    // console.log(input[3].ingredients[0].has_sugar);
                    if (input[i].ingredients[q].has_sugar == true) {
                      continue label;
                    }
                  }
                  recommendation.push(input[i]);

                }
    }
    return recommendation;
  }

}

let batch_of_cookies = CookieFactory.create(options);
console.log(JSON.stringify(batch_of_cookies,null,2));

let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday', batch_of_cookies);
console.log(sugarFreeFoods);

console.log('sugar free cakes are :');
for(let i = 0; i < sugarFreeFoods.length; i++ )
{
  console.log(sugarFreeFoods[i].nama)
}










// RELEASE 0
// 'use strict'
// const fs = require('fs');
//
// var options = fs.readFileSync('cookies.txt').toString().split('\n');
// options.pop();
//
// class Cookie {
//   constructor(nama,status,ingredients){
//     this.nama = nama;
//     this.status = 'mentah';
//     this.ingredients = [];
//   }
//
//   bake(){
//     this.status = 'selesai dimasak';
//   }
// }
//
// class PeanutButter extends Cookie{
//   constructor(nama = 'peanut butter',status,ingredients){
//     super(nama,status,ingredients)
//     this.peanut_count = 100;
//   }
// }
//
// class ChocholateChip extends Cookie{
//   constructor(nama = 'chocolate chip',status,ingredients){
//     super(nama,status,ingredients)
//     this.choc_chip_count = 200;
//   }
// }
//
// class OtherCookie extends Cookie{
//   constructor(nama,status,ingredients){
//     super(nama,status,ingredients)
//     this.other_count = 150;
//   }
// }
//
// class CookieFactory {
//   constructor() {
//     // this.batch = [];
//   }
//
//   static create (options) {
//     var batch = [];
//     for (let i=0; i<options.length; i++) {
//       if (options[i] == 'peanut butter') {
//         batch.push(new PeanutButter());
//       }
//       else if (options[i] == 'chocolate chip') {
//         batch.push(new ChocholateChip());
//       } else {
//         batch.push(new OtherCookie(options[i]));
//       }
//     }
//     return batch;
//
//   }
// }
//
// let batch_of_cookies = CookieFactory.create(options);
// console.log(batch_of_cookies);
