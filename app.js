const readline = require('readline');

console.log("Starting Shopee additional functionsapp");

const appFunctions = require("./YuFengAddShopeeFeatures.js");
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
