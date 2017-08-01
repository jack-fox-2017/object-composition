"use strict"
let fs = require("fs");

class Ingredient {
  constructor(name,amount){
    this.name = name
    this.amount = amount

  }

  static pisah(){
  }
}

class Cookie {
  constructor(name,bahan) {
    this.name = name
    this.status = "mentah"
    this.has_sugar = this.gula(bahan)
    // this.bahan = this.ambilBahan(bahan)
  }

  gula(bahan) {
    // console.log(option[1].trim().split(':')[1]);
    // for(let i = 0; i < bahan.length; i++) {
    //   if(/sugar/g.test(option[1].trim().split(':')[1])) {
    //     return true
    //   } else {
    //       return false;
    //   }
    // }
  }

  bake() {
    this.status = "selesai dimasak"
  }

  ambilBahan(bahan){
    let data = bahan.split(",")
    let bahan1 = []
    let bahanPerkoma = {}
    let bahanPerkue = []
    for (var i = 0; i < data.length; i++) {
      bahan1.push(data[i].split(':'))
      bahanPerkoma = new Ingredient(bahan1[i][1],bahan1[i][0])
      bahanPerkue.push(bahanPerkoma)
    }
    return JSON.stringify(bahanPerkue)//split(',')//data[2].split('=')[1]
   }
   }

class PeanutButter extends Cookie {
  constructor(name,bahan){
    super(name)
    this.name = name
    this.ingredients = this.ambilBahan(bahan)
    this.peanut_count = 100
  }
}

class ChoclateChip extends Cookie {
  constructor(name,bahan){
    super(name)
    this.name = name
    this.ingredients = this.ambilBahan(bahan)
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(name,bahan){
    super(name)
    this.name = name
    this.ingredients = this.ambilBahan(bahan)
    this.other_count = 150
  }
}


class CookieFactory {
  static create(options){
    this.options = options
    let data = fs.readFileSync(this.options,'utf8').trim().trim().split('\n')
    let objek = []
    let kue = []
    for (var i = 0; i < data.length; i++) {
      kue = data[i].split(" = ")
      if (kue[0] == 'peanut butter'){
         objek.push(new PeanutButter(kue[0],kue[1]))
      }else if (kue[0] == 'chocolate chip'){
         objek.push(new ChoclateChip(kue[0],kue[1]))
      }else {
         objek.push(new OtherCookie(kue[0],kue[1]))
      }
    }
    return objek
  }
}





// let bacth_of_cookies = CookieFactory.create('cookies.txt');
// console.log(bacth_of_cookies);


// console.log(Ingredient.pisah());

// let kue = new PeanutButter("peanut")
// console.log(kue.nama);

// let ingred = new Ingredient({name : 'ing',amount: 'eng',has_sugar : true})
// console.log(ingred);

console.log(CookieFactory.create('cookies.txt'));

// console.log(CookieFactory.ambilBahan());





//*******************************objek

// "use strict"
// let fs = require("fs");
//
// class Ingredient {
//   constructor(options){
//     this.name = options['name']
//     this.amount = options['amount']
//     this.has_sugar = options['has_sugar']
//   }
//
//   static pisah(){
//    let data = fs.readFileSync("cookies.txt",'utf8').trim().split('\n')
//    let bahan =  []
//    for (var i = 0; i < data.length; i++) {
//      bahan.push(data[i].split('=')[1])
//    }
//    return bahan//split(',')//data[2].split('=')[1]
//   }
//
// }
//
// class Cookie {
//   constructor(name,ingredients) {
//     this.name = name
//     this.status = "mentah"
//     this.ingredients = new Ingredient({name : 'flour',amount: 1,has_sugar : true})
//   }
//
//   bake() {
//     this.status = "selesai dimasak"
//   }
// }
//
// class PeanutButter extends Cookie {
//   constructor(name){
//     super(name)
//     this.name = name
//     this.peanut_count = 100
//   }
// }
//
// class ChoclateChip extends Cookie {
//   constructor(name){
//     super(name)
//     this.name = name
//     this.choc_chip_count = 200
//   }
// }
//
// class OtherCookie extends Cookie {
//   constructor(name){
//     super(name)
//     this.name = name
//     this.other_count = 150
//   }
// }
//
//
// class CookieFactory {
//   static create(options){
//     this.options = options
//     let data = fs.readFileSync(this.options,'utf8').trim().split("\n")
//     // this.options = this.ambil()
//     let objek = []
//     for (var i = 0; i < data.length; i++) {
//       if (data[i] == 'peanut butter'){
//          objek.push(new PeanutButter('PeanutButter'))
//       }else if (data[i] == 'chocolate chip'){
//          objek.push(new ChoclateChip('ChoclateChip'))
//       }else {
//         objek.push(new OtherCookie('OtherCookie'))
//       }
//     }
//     return objek
//   }
// }
//
//
// let bacth_of_cookies = CookieFactory.create('cookies.txt');
// // console.log(bacth_of_cookies);
//
//
// console.log(Ingredient.pisah());
//
// // let kue = new PeanutButter("peanut")
// // console.log(kue.nama);
//
// // let ingred = new Ingredient({name : 'ing',amount: 'eng',has_sugar : true})
// // console.log(ingred);
//
// console.log(CookieFactory.create('cookies.txt'));
// console.log(CookieFactory('cookies.txt'));
//
// // console.log(CookieFactory.create());
//










//*********************************************************release 0

// "use strict"
// let fs = require("fs");
//
// class Cookie {
//   constructor(name) {
//     this.name = name
//     this.status = "mentah"
//     this.ingredients = []
//   }
//
//   bake() {
//     this.status = "selesai dimasak"
//   }
// }
//
// class PeanutButter extends Cookie {
//   constructor(name){
//     super(name)
//     this.name = name
//     this.peanut_count = 100
//   }
// }
//
// class ChoclateChip extends Cookie {
//   constructor(name){
//     super(name)
//     this.name = name
//     this.choc_chip_count = 200
//   }
// }
//
// class OtherCookie extends Cookie {
//   constructor(name){
//     super(name)
//     this.name = name
//     this.other_count = 150
//   }
// }
//
//
// class CookieFactory {
//   static create(options){
//     this.options = options
//     let data = fs.readFileSync(this.options,'utf8').trim().split("\n")
//     // this.options = this.ambil()
//     let objek = []
//     for (var i = 0; i < data.length; i++) {
//       if (data[i] == 'peanut butter'){
//          objek.push(new PeanutButter('PeanutButter'))
//       }else if (data[i] == 'chocolate chip'){
//          objek.push(new ChoclateChip('ChoclateChip'))
//       }else {
//         objek.push(new OtherCookie('OtherCookie'))
//       }
//     }
//     return objek
//   }
// }
//
//
// let bacth_of_cookies = CookieFactory.create('cookies.txt');
// console.log(bacth_of_cookies);

// let kue = new PeanutButter("peanut")
// console.log(kue.nama);


// console.log(CookieFactory.create('cookies.txt'));
// console.log(CookieFactory('cookies.txt'));

// console.log(CookieFactory.create());
