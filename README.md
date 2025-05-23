# Shopee Console App (Node.js)

A command-line simulation of some new Shopee features.

## Features

- Change region 
- Change language
- Random product suggester
- View sales analytics
- Check low-stock items

## How to Run

1. Open the folder in integrated terminal
2. Open a terminal and run "nodemon app.js"

The following is the app.js file from which the main interface is run
```js
const readline = require('readline');

console.log("Starting Shopee additional functionsapp");

const appFunctions = require("./functions.js");
const salesData = require("./salesData.json");
const products = require("./products.json")

const userInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (question) => {
  return new Promise((resolve, reject) => {
    userInput.question(question, (answer) => {
      resolve(answer);
    });
  });
};

async function appMenu() {
  const choice = await askQuestion(
    `Choose your option \n
    1. Region Selector
    2. Language Selector
    3. Random Item
    4. Display Statistics
    5. Check low stock items
    \n`
  )
  console.log(`You selected ${choice}.`);
  switch(choice) {
    case '1':   
      userInput.close(); 
      await appFunctions.selectRegion();
      break;
    case '2':
      userInput.close();
      await appFunctions.selectLanguage();
      break;
    case '3':
      userInput.close();
      await appFunctions.randomItem();
      break;
    case '4':
      userInput.close();
      await appFunctions.displayStats(salesData);
      break;
    case '5':
      userInput.close();
      await appFunctions.checkStock();
      break;
    default:
      console.log("Invalid Option");
      break;
  }

  userInput.close();
}

appMenu();
```

The change region function is the following code
```js
selectRegion () {
        return new Promise((resolve, reject) => {
            const userRegion = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });

            let invalidR = false;
            let selectedUrl = regions.sg.url;

            userRegion.question('Choose your Shopee Region (Indonesia, Philippines, Thailand, Vietnam, Malaysia, Singapore): ', (answer) => {
            const region = answer.toLowerCase();
            switch(region){
                case 'indonesia':
                    selectedUrl = regions.id.url;
                    break;
                case 'philippines':
                    selectedUrl = regions.ph.url;
                    break;
                case 'thailand':
                    selectedUrl = regions.th.url;
                    break;
                case 'vietnam':
                    selectedUrl = regions.vn.url;
                    break;
                case 'malaysia':
                    selectedUrl = regions.my.url;
                    break;
                case 'singapore':
                    selectedUrl = regions.sg.url;
                    break;
                default:
                    invalidR = true
                    break;
                }
            if (invalidR != true){
                console.log(`You selected ${answer.charAt(0).toUpperCase()+answer.slice(1).toLowerCase()}. `)
            }
            else {
                console.log(`Invalid response, using default link. `)
            }
            console.log(`Use the following link: ${selectedUrl}`)

            userRegion.close();
            resolve();
            });
        });
    },
```
It uses the following Regions JSON to execute
```js
const regions = {
    id: { country: "Indonesia", url: "https://shopee.co.id/" },
    ph: { country: "Philippines", url: "https://shopee.ph/" },
    th: { country: "Thailand", url: "https://shopee.co.th/" },
    vn: { country: "Vietnam", url: "https://shopee.vn/" },
    my: { country: "Malaysia", url: "https://shopee.com.my/" },
    sg: { country: "Singapore", url: "https://shopee.sg/" },
};
```
If an invalid response is given it defaults to the Singapore Shopee link

The Change Language function uses the following code
```js
selectLanguage () {
        return new Promise((resolve, reject) => {
            const userLanguage = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });

            let invalidR = false;
            let selectedLan = "System Default"

            userLanguage.question('Choose your Shopee Language (English, Chinese, Malay): ', (answer) => {
            const language = answer.toLowerCase();
            switch(language){
                case 'english':
                    selectedLan = languages.en;
                    break;
                case 'chinese':
                    selectedLan = languages.ch;
                    break;
                case 'malay':
                    selectedLan = languages.my;
                    break;
                default:
                    invalidR = true
                    break;
                }
            if (invalidR != true){
                console.log(`You selected ${answer.charAt(0).toUpperCase()+answer.slice(1).toLowerCase()}. `)
            }
            else {
                console.log(`Invalid response, `)
            }
            console.log(`Language changed to ${selectedLan}`)

            userLanguage.close();
            resolve();
            });
        });
    },
```
and the following Language JSON to run
```js
const languages = {
    en: "English",
    ch: "Chinese",
    my: "Malay",
};
```
This will simulate changing the language used. If an invalid response is given it defaults to system default

The Random Product suggester uses the following codes to run
```js
function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    }
```
```js
    randomItem(){
        const randomised = randint(0, products.length - 1);
        const randProduct = products[randomised];
        console.log(`Suggested item is ${randProduct.name}`);
    },
```
The rand int function is used outside the exports as otherwise it is not defined in the randomItem function
It will redirect the user to a random product in the catalog

The Display Statistics function uses the following codes
```js
displayStats (data) {
        console.log('Shopee Stats');

        const totalRevenue = data.reduce((acc, item) => acc + item.revenue, 0);
        const topSeller = data.reduce((prev, current) => (prev.quantity > current.quantity) ? prev : current);

        console.log(`Total Revenue: $${totalRevenue}`);
        console.log(`Top Seller: ${topSeller.product} (${topSeller.quantity} sold)`);
        console.log('\nDetails:');
        data.forEach(item => {
            console.log(`- ${item.product}: ${item.quantity} units, $${item.revenue} revenue`);
        });
    },
```
and the saleData.json file
It will simply display the amount sold and revenue generated of and by each item

The low stock function uses the following codes
```js
checkStock() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        // Ensure products is an array
        if (!Array.isArray(products)) {
            console.log('Invalid products data');
            rl.close();
            return;
        }

        rl.question('Enter stock threshold: ', (input) => {
            const threshold = parseInt(input, 10);
            
            if (isNaN(threshold)) {
                console.log('Invalid threshold. Please enter a number.');
            } else {
                const lowStockProducts = products.filter(p => p.stock <= threshold);

                if (lowStockProducts.length === 0) {
                    console.log('No products are below the stock threshold.');
                } else {
                    console.log('Low stock products:');
                    lowStockProducts.forEach(p => {
                        console.log(`- ${p.name}: ${p.stock} units left (Threshold: ${threshold})`);
                    });
                }
            }

            rl.close();
        });
    },
```
and the products.json file
The code will prompt you for a minimum threshold, after which. should the answer given be a number, the code will show all the product items that have stock numbers below the threshold

# References
Shopee E-store (https://shopee.sg)
W3Schools for coding help (https://w3schools.com)
