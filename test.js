const fs = require('fs');

let cookiesTxt = fs.readFileSync('./cookies.txt', 'utf8')
let cookies = cookiesTxt.split("\n")

for(let i=0; i<cookies.length-1; i++) {
  let cookies_and_ingdr = cookies[i].split('=')
  let name = cookies_and_ingdr[0]
  let ing = cookies_and_ingdr[1]

  let name_and_amount = ing.split(',')
  console.log(name_and_amount);
  for(let j=0; j<name_and_amount.length-1; j++) {
    let one_ing = name_and_amount[j]
    let separate_name_ampunt = one_ing.split(':')
    let ing_name = separate_name_ampunt[0]
    let ing_amount = separate_name_ampunt[1]

    console.log('----', ing_name);
    console.log('----', ing_amount);

  }

}

// console.log(cookies);
