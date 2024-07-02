"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readLineSync = require("readline-sync");
var Product_1 = require("./classes/Product");
var Sell_1 = require("./classes/Sell");
var item1 = new Product_1.Product(1, 'Realme 7', 'Realme', 700, 1500, 70);
var item2 = new Product_1.Product(2, 'Controle de PS5', 'Sony', 100, 200, 200);
var item3 = new Product_1.Product(3, 'Fones de ouvido', 'Genérico', 15, 30, 300);
var allProducts = [];
allProducts.push(item1);
allProducts.push(item2);
allProducts.push(item3);
var totalSells = [];
function printProducts() {
    for (var i = 0; i < allProducts.length; i++) {
        console.log(allProducts[i].getProduct());
    }
}
function printSells() {
    for (var i = 0; i < totalSells.length; i++) {
        console.log(totalSells[i].getSell());
    }
}
function selectedProduct(arr) {
    var option = readLineSync.questionInt() - 1;
    return arr[option];
}
function selectedSell(arr) {
    var option = readLineSync.questionInt() - 1;
    return arr[option];
}
function main() {
    var menu = '';
    while (menu != 'N' && menu != 'n') {
        console.log(" ========= Menu =========\n 1. Cadastrar novo Produto\n 2. Ver produtos\n 3. Realizar Venda\n 4. Ver vendas\n 5. Atualizar dados de um produto\n 6. Atualizar dados de uma venda\n 7. Sair do programa\n ========================\n");
        console.log(" Escolha uma opção");
        var option = readLineSync.questionInt();
        console.clear();
        switch (option) {
            case 1:
                var idProduct = allProducts.length + 1;
                console.log("Qual o nome do produto?");
                var productName = readLineSync.question();
                console.clear();
                console.log("Qual a marca do produto?");
                var brand = readLineSync.question();
                console.clear();
                console.log("Qual o preço de custo do produto?");
                var initialPrice = readLineSync.questionInt();
                console.clear();
                console.log("Qual o preço final do produto?");
                var finalPrice = readLineSync.questionInt();
                console.clear();
                console.log("Qual a quantidade em estoque?");
                var stockAmount = readLineSync.questionInt();
                console.clear();
                var newProduct = new Product_1.Product(idProduct, productName, brand, initialPrice, finalPrice, stockAmount);
                allProducts.push(newProduct);
                break;
            case 2:
                printProducts();
                console.log("Deseja ver o lucro de cada produto?");
                break;
            case 3:
                var idSells = totalSells.length + 1;
                var date = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
                var discountValue = 0;
                var discountPercentage = 0;
                var client = readLineSync.question('Qual o nome do cliente? ');
                console.clear();
                printProducts();
                var product = selectedProduct(allProducts);
                console.clear();
                var amout = readLineSync.questionInt('Qual a quantidade? ');
                console.clear();
                var sell = new Sell_1.Sell(idSells, client, product, amout, date);
                console.log("Vai ser aplicado desconto nessa venda?\n 1. Sim\n 2. Não");
                option = readLineSync.questionInt();
                console.clear();
                if (option === 1) {
                    console.log("O desconto é em:\n 1. Valor fixo\n 2. Porcentagem\n 3. Porcentagem + Valor fixo");
                    option = readLineSync.questionInt();
                    console.clear();
                    switch (option) {
                        case 1:
                            console.log("Qual o valor do desconto?");
                            discountValue = readLineSync.questionInt();
                            console.clear();
                            break;
                        case 2:
                            console.log("Qual a porcentagem do desconto?");
                            discountPercentage = readLineSync.questionInt();
                            console.clear();
                            break;
                        case 3:
                            console.log("Qual a porcentagem do desconto?");
                            discountPercentage = readLineSync.questionInt();
                            console.clear();
                            console.log("Qual o valor do desconto?");
                            discountValue = readLineSync.questionInt();
                            console.clear();
                            break;
                    }
                }
                if (option === 1) {
                    sell.setDiscountValues(discountValue, discountPercentage);
                }
                console.log("Total sem descontos: R$" + sell.calcTotal());
                console.log("Descontos: R$" + sell.calcDiscont());
                console.log("Preço final: R$" + sell.calcFinalPrice());
                console.log("\n Qual o método de pagamento? \n 1.PIX\n 2.Crédito\n 3.Débito\n 4.Dinheiro\n");
                option = readLineSync.questionInt() - 1;
                var paymentMethodsList = ['PIX', 'Crédito', 'Débito', 'Dinheiro'];
                var paymentMethod = paymentMethodsList[option];
                console.clear();
                sell.setPayment(paymentMethod);
                totalSells.push(sell);
                break;
            case 4:
                printSells();
                console.log("Deseja ver o lucro total de todas Vendas?");
                break;
            case 5:
                printProducts();
                console.log("\n Qual produto você deseja atualizar?");
                product = selectedProduct(allProducts);
                console.clear();
                break;
            case 6:
                printSells();
                console.log("\n Qual venda você deseja atualizar?");
                option = readLineSync.questionInt() - 1;
                sell = selectedSell(totalSells);
                console.clear();
                break;
            case 7:
                break;
        }
        console.log("Deseja continuar usando o programa? (S/N)");
        menu = readLineSync.question();
        console.clear();
        option = 0;
    }
}
main();
// \n 3. Atualizar Produto
