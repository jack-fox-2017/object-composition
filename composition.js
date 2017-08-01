"use strict"

const fs = require('fs'); //untuk memanggil file lain

class Cookie {
  constructor (name, ingredients){
    this.status = 'mentah'
    this.name = name
    this.ingredients = ingredients
  }
  bake(){
    this.status = 'selesai dimasak'
  }
}

class PeanutButter extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients) //wajib ditambahkan super == kenapa?
    this.peanut_count = 100
  }
}

class ChocholateChip extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients) //wajib ditambahkan super == kenapa?
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(name, ingredients){
    super(name, ingredients) //wajib ditambahkan super == kenapa?
    this.other_count = 150
  }
}

class Ingredients {
  constructor(options){
    this.name = options.name
    this.amount = options.amount
    this.has_sugar = options.has_sugar
  }
}

class CookieFactory {  //class Factory-nya
  constructor(){}

  static create(options){  //method create
    var tampung = []

    for(var i = 0; i < options.length; i++){
      let split_nama_Ing = options[i].split(' = ')
      if(split_nama_Ing[0]==='peanut butter'){
        tampung.push(new PeanutButter(split_nama_Ing[0],this.olahBahan(split_nama_Ing[1])))
      }
      else if (split_nama_Ing[0] === "chocolate chip") {
        tampung.push(new ChocholateChip(split_nama_Ing[0], this.olahBahan(split_nama_Ing[1])))
      }
      else if (split_nama_Ing[0] === "chocolate cheese") {
        tampung.push(new OtherCookie(split_nama_Ing[0], this.olahBahan(split_nama_Ing[1])))
      }
      else if (split_nama_Ing[0] === "chocolate butter") {
        tampung.push(new OtherCookie(split_nama_Ing[0], this.olahBahan(split_nama_Ing[1])))
      }
    }
    return tampung
  }

  static olahBahan(ingredients){
    let tampungDua = []
    let bahan = ingredients.split(', ')

    for (var i = 0; i<bahan.length; i++){
      var obj = {}
      var bahan_arr = bahan[i].split(" : ")
      obj.name = bahan_arr[1];
      obj.amount = bahan_arr[0]
      obj.has_sugar = bahan_arr[2]
      tampungDua.push(new Ingredients(obj))
    }
    return tampungDua
  }
}


var options = fs.readFileSync("./cookies.txt","utf8").split('\n'); //memanggil file lain dan dijadikan variabel options
let batch_of_cookies = CookieFactory.create(options); //CookieFactory mengacunya kemana? **********
// console.log(batch_of_cookies);
// console.log(batch_of_cookies)
console.log(JSON.stringify(batch_of_cookies,null,2))

/*
** MASALAH
** 1. Kenapa pas di looping kohasilnya beda jumlah? + 1
*/
