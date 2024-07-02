"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var Product = /** @class */ (function () {
    function Product(id, name, brand, price, finalPrice, stockAmount) {
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.price = price;
        this.finalPrice = finalPrice;
        this.stockAmount = stockAmount;
    }
    Product.prototype.getProduct = function () {
        return "".concat(this.id, " - ").concat(this.name, " - ").concat(this.brand, "\n   R$").concat(this.finalPrice, "\n   Quantidade: ").concat(this.stockAmount);
    };
    Product.prototype.setProduct = function (name, brand, price, finalPrice, category, stockAmount) {
        this.name = name;
        this.brand = brand;
        this.price = price;
        this.finalPrice = finalPrice;
        this.stockAmount = stockAmount;
    };
    Product.prototype.calcProfit = function () {
        return this.finalPrice - this.price;
    };
    return Product;
}());
exports.Product = Product;
