"use strict"
const fs = require('fs');

class File{
  constructor(file){
    this.file = file
  }

  readFile(callback){
    fs.readFile(this.file, 'utf-8', function(err, data){
      callback(data)
    })
  }

  resep(callback){//untuk mengkonvert isi dalam file txt, yg awalnya string menjadi array
    this.readFile(function(data){
      var hasilSplit = [];
      var push1 = [];
      var push2 = [];
      hasilSplit = data.split("\n")
      let x;
      for(let i=0; i<hasilSplit.length; i++)
      {
        x = hasilSplit[i].split("=");
        push1.push(x);
      }

      CookieFactory.create(push1);
      callback(push1);
    })
  }
}
//-----------------------------//
class Cookie{
  constructor(name, ingredients){
    this.name = name
    this.status = "mentah"
    this.ingredients = this.ingredientsObject(ingredients)// manggil method
    //this.has_sugar = /sugar/.test(ingredients);// regex buat chect kalau ada kata suga atau ga
  }

  //method composition ke class ingredients
  ingredientsObject(ingredients){
    var newArray = [];
    var semiArray = [];
    var splitkoma = ingredients.split(',');
    //console.log("splitkoma===> ", splitkoma);
    for(let i=0; i<splitkoma.length; i++)
    {
      let splitSemiColon = splitkoma[i].split(':');
      //console.log('-------------->', splitSemiColon);
      let objIng = new Ingredients(splitSemiColon);
      semiArray.push(objIng);
    }
    //console.log("====>"+semiArray.length);
    return JSON.stringify(semiArray);
  }

  bake(){
    this.status = "selesai di masak"
  }
}

class PeanutButter extends Cookie{
  constructor(name, ingredients){
    super(name, ingredients)
    this.peanut_count = 100
  }
}

class ChocholateChip extends Cookie {
  constructor(name, ingredients){
    super(name, ingredients)
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie{
  constructor(name, ingredients){
    super(name, ingredients)
    this.other_count = 150;
  }
}

class Ingredients{
  constructor(options){
    //console.log("=x=x=x=>> ", options);
    this.name = options[1];
    this.amount = options[0];
    this.has_sugar = options['has_sugar']
  }
}

//============================================//
//factory
class CookieFactory{
  constructor(){
    //ZONKKKK
  }

  //CREATE
  static create(options) {
    let tampung = []
    //console.log("===>",options);
    for(var i=0; i<options.length-1; i++)
    {
      if(options[i][0].trim() == 'peanut butter')
      {
        tampung.push(new PeanutButter(options[i][0], options[i][1]))
      }
      else if(options[i][0].trim() == 'chocolate chip')
      {
        tampung.push(new ChocholateChip(options[i][0], options[i][1]))
      }
      else {
        tampung.push(new OtherCookie(options[i][0], options[i][1]))
      }
    }
    return tampung
  }

  //RECOMMENDED
  static cookieRecommned(kue)
  {
    for(let i=0; i<kue.length-1; i++)
    {
      if(!/sugar/.test(kue[i])){
        console.log("\nThe Less Sugar Cookie on Tuesday is",kue[i][0]);
      }
    }
  }
}

var read = new File("cookies.txt");
// read.readFile(function(data){
//   // console.log(data);
// })

//untuk liat realease 0 aja
// var isiOptions = read.readFile(function(data){
//   let batch_of_cookies = CookieFactory.create(data)
//   console.log(batch_of_cookies);
// })

// realese 1 menampilkan dengan ingredients
read.resep(function(data){
  let batch_of_cookies = CookieFactory.create(data)
  console.log(batch_of_cookies);
})

read.resep(function(data){
  let batch_of_cookies = CookieFactory.cookieRecommned(data)
  //console.log(batch_of_cookies);
})
