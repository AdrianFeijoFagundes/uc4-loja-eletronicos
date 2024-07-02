export class Product {
    id: number;
    name: string;
    brand: string;
    price: number;
    finalPrice: number;
    stockAmount : number;
    
    constructor(id: number, name: string, brand: string, price: number, finalPrice: number, stockAmount: number) {
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.price = price;
        this.finalPrice = finalPrice;
        this.stockAmount = stockAmount;
    }

    getProduct(): string {
         return `${this.id} - ${this.name} - ${this.brand}\n   R$${this.finalPrice}\n   Quantidade: ${this.stockAmount}`
    }

    setProduct(name: string, brand: string, price: number, finalPrice: number, category: string, stockAmount: number): void {
        this.name = name;
        this.brand = brand;
        this.price = price;
        this.finalPrice = finalPrice;
        this.stockAmount = stockAmount;
    }

    calcProfit(): number {
        return this.finalPrice - this.price;
    }

}