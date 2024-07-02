"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sell = void 0;
var readLineSync = require("readline-sync");
var Sell = /** @class */ (function () {
    function Sell(id, clientName, product, amout, date) {
        this.id = id;
        this.clientName = clientName;
        this.product = product;
        this.amout = amout;
        this.date = date;
        this.paymentMethod = "";
        this.paymentType = "";
        this.discount = false;
        this.discountValue = 0;
        this.discountPercentage = 0;
        this.totalDiscount = 0;
        this.installmentsAmount = 0;
        this.installmentsValue = 0;
        this.total = this.product.finalPrice * this.amout;
        this.finalPrice = this.total - this.totalDiscount;
    }
    Sell.prototype.getSell = function () {
        return "\n Venda ".concat(this.id, "\n ------------ \n Id: ").concat(this.id, "\n Cliente: ").concat(this.clientName, "\n Data da venda: ").concat(this.date, "\n Produto vendido: ").concat(this.product.name, "\n Quantidade: ").concat(this.amout, "\n M\u00E9todo de pagamento: ").concat(this.paymentMethod, "\n Tipo de Pagamento: ").concat(this.paymentType, "\n Quantidade de parcalas: ").concat(this.installmentsAmount, "\n Valor de cada parcela: ").concat(this.installmentsValue, "\n Total sem descontos: ").concat(this.total, "\n Valor do Desconto: ").concat(this.totalDiscount, "\n Pre\u00E7o Final: ").concat(this.finalPrice);
    };
    Sell.prototype.calcTotal = function () {
        return this.product.finalPrice * this.amout;
    };
    Sell.prototype.calcDiscont = function () {
        this.totalDiscount = 0;
        if (this.discount) {
            this.totalDiscount = (this.calcTotal() / 100) * this.discountPercentage;
            this.totalDiscount += this.discountValue;
            return this.totalDiscount;
        }
        console.log("Não foi aplicado nenhum desconto");
        return 0;
    };
    Sell.prototype.calcFinalPrice = function () {
        if (this.total < this.totalDiscount) {
            console.log("O desconto total não pode ser maior que o valor final da Venda");
            console.log("Insira valores válidos");
            return 0;
        }
        return this.total - this.totalDiscount;
    };
    Sell.prototype.calcProfit = function () {
        return this.finalPrice - (this.product.price * this.amout);
    };
    Sell.prototype.setDiscountValues = function (discountValue, discountPercentage) {
        this.discount = true;
        this.discountValue = discountValue;
        this.discountPercentage = discountPercentage;
        this.totalDiscount = this.calcDiscont();
        if (this.totalDiscount === 0) {
            this.discount = false;
        }
        this.total = this.calcTotal();
        this.finalPrice = this.calcFinalPrice();
    };
    Sell.prototype.setInstallments = function (installmentsAmount) {
        this.installmentsAmount = installmentsAmount;
        this.installmentsValue = Math.ceil(this.finalPrice / installmentsAmount);
    };
    Sell.prototype.setPayment = function (paymentMethod) {
        this.paymentMethod = paymentMethod;
        if (paymentMethod !== 'Crédito') {
            this.paymentType = 'Á vista';
        }
        else {
            console.log("Deseja qual opção?\n 1. Á vista\n 2. Parcelado");
            var option = readLineSync.questionInt();
            console.clear();
            if (option === 1) {
                this.paymentType = 'Á vista';
            }
            if (option === 2) {
                this.paymentType = 'Parcelado';
                console.log('Deseja parcelar em quantas vezes? (No máximo 12 vezes)');
                var chose = readLineSync.questionInt();
                while (true) {
                    if (chose < 13) {
                        this.setInstallments(chose);
                        break;
                    }
                    else {
                        console.log("Digite um valor válido:");
                        chose = readLineSync.questionInt();
                    }
                }
            }
            console.clear();
        }
    };
    return Sell;
}());
exports.Sell = Sell;
