const readline = require('readline');
const products = require("./products.json");
const { randomInt } = require('crypto');
console.log(module)

const regions = {
    id: { country: "Indonesia", url: "https://shopee.co.id/" },
    ph: { country: "Philippines", url: "https://shopee.ph/" },
    th: { country: "Thailand", url: "https://shopee.co.th/" },
    vn: { country: "Vietnam", url: "https://shopee.vn/" },
    my: { country: "Malaysia", url: "https://shopee.com.my/" },
    sg: { country: "Singapore", url: "https://shopee.sg/" },
};
const languages = {
    en: "English",
    ch: "Chinese",
    my: "Malay",
};

//Function to generate a random number
function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    }

//Region select function
function selectRegion () {
   
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
    });
};

//Language select function
function selectLanguage () {
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
    }

//Display sales analytics function
function displayStats (data) {
    console.log('Shopee Stats');

    const totalRevenue = data.reduce((acc, item) => acc + item.revenue, 0);
    const topSeller = data.reduce((prev, current) => (prev.quantity > current.quantity) ? prev : current);

    console.log(`Total Revenue: $${totalRevenue}`);
    console.log(`Top Seller: ${topSeller.product} (${topSeller.quantity} sold)`);
    console.log('\nDetails:');
    data.forEach(item => {
        console.log(`- ${item.product}: ${item.quantity} units, $${item.revenue} revenue`);
    });
}

//function to send user to a random item
function randomItem(){
    const randomised = randint(0, products.length - 1);
    const randProduct = products[randomised];
    console.log(`Suggested item is ${randProduct.name}`);
}

    //function to check items that are low on stock
function checkStock() {
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
}
module.exports = {
    selectRegion,
    selectLanguage,
    randomItem,
    checkStock,
    displayStats
};
