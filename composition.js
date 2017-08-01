const fs = require('fs');

class Ingredient{
  constructor(options){
    this.name = options.name;
    this.amount = options.amount;
    this.hasSugar = options.hasSugar;
  }
}

class Cookie{
  constructor(ingredient){
    this.name = ingredient[0];
    this.status = 'mentah';
    this.ingredient = this.ing(ingredient);
  }
  ing(ingredient){
    let sp = ingredient[1].toString().split(',');
    let ingr = [];
    for(let i=0; i<sp.length; i++){
      let spl = sp[i].toString().split(':');
      let sugar = false;
      if(spl[1].trim()=='sugar'){
        sugar = true;
      }
      let options = {name: spl[1].trim(), amount: spl[0].trim(), hasSugar:sugar}
      ingr.push(new Ingredient(options));
    }
    return ingr;
  }
  bake(){
    this.status = 'selesai dimasak';
  }
}

class PeanutButter extends Cookie{
  constructor(opsi){
    super(opsi);
    this.peanut_count = 100;
  }
}

class ChocholateChip extends Cookie{
  constructor(opsi){
    super(opsi);
    this.chocChip_count = 200;
  }
}

class OtherCookie extends Cookie{
  constructor(opsi){
    super(opsi);
    this.other_count = 150;
  }
}

class CookieFactory{
  constructor(){
  }

  static create(options){
    let batch = [];
    for(let i=0; i<options.length; i++){
      let ops = options[i].toString().split('=');
      if(ops[0].trim()=='peanut butter'){
        batch.push(new PeanutButter(ops));
      }
      else if(ops[0].trim()=='chocolate Chip'){
        batch.push(new ChocholateChip(ops));
      }
      else{
        batch.push(new OtherCookie(ops));
      }
    }
    return batch;
  }
  static recommend(day, batch){
    let recomm = [];
    for(let i=0; i<batch.length; i++){
      let count = 0;
      for(let j=0; j<batch[i].ingredient.length; j++){
        if(!batch[i].ingredient[j].hasSugar){
          count++;
        }
      }
      if(count == batch[i].ingredient.length){
        recomm.push(batch[i]);
      }
    }
    return recomm;
  }
}

let options = fs.readFileSync('cookies.txt', 'utf8').toString().trim().split('\n');
let batchOfCookies = CookieFactory.create(options);
console.log(batchOfCookies);

let sugarFreeFoods = CookieFactory.recommend('tuesday', batchOfCookies);
console.log('\nsugar free cakes are :');
for(let i=0; i<sugarFreeFoods.length; i++){
  console.log(sugarFreeFoods[i].name);
  console.log('\nbecause the ingredients is\n',sugarFreeFoods[i].ingredient);
}
