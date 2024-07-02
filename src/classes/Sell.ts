import * as readLineSync from 'readline-sync';

import { Product } from "./Product";

export class Sell {
    id: number;
    clientName: string;
    product: Product;
    amout: number;
    total: number;
    finalPrice: number;
    date: string;
    discount: boolean;
    discountValue: number;
    discountPercentage: number;
    totalDiscount: number;
    paymentMethod: string;
    paymentType: string;
    installmentsAmount: number;
    installmentsValue: number;

    constructor(id: number, clientName: string, product: Product, amout: number, date: string) {
        this.id = id
        this.clientName = clientName;
        this.product = product;
        this.amout = amout;
        this.date = date;

        this.paymentMethod =  "";
        this.paymentType = "";
        
        this.discount = false;
        this.discountValue = 0;
        this.discountPercentage = 0;
        this.totalDiscount = 0
        this.installmentsAmount = 0;
        this.installmentsValue = 0;

        this.total = this.product.finalPrice * this.amout;
        this.finalPrice = this.total - this.totalDiscount;
    }
    getSell(): string {
        return `\n Venda ${this.id}\n ------------ \n Id: ${this.id}\n Cliente: ${this.clientName}\n Data da venda: ${this.date}\n Produto vendido: ${this.product.name}\n Quantidade: ${this.amout}\n Método de pagamento: ${this.paymentMethod}\n Tipo de Pagamento: ${this.paymentType}\n Quantidade de parcalas: ${this.installmentsAmount}\n Valor de cada parcela: ${this.installmentsValue}\n Total sem descontos: ${this.total}\n Valor do Desconto: ${this.totalDiscount}\n Preço Final: ${this.finalPrice}`
    }
    calcTotal(): number {
        return this.product.finalPrice * this.amout;
    }
    calcDiscont(): number { 
        this.totalDiscount = 0;

        if (this.discount) {
            this.totalDiscount = (this.calcTotal() / 100 ) * this.discountPercentage;
            this.totalDiscount += this.discountValue;  
            
            return this.totalDiscount;
        }
        console.log("Não foi aplicado nenhum desconto");
        return 0;
    }
    calcFinalPrice() : number {
        if (this.total < this.totalDiscount) {
            console.log("O desconto total não pode ser maior que o valor final da Venda")
            console.log("Insira valores válidos")
            return 0
        }
        return this.total - this.totalDiscount
    }
    calcProfit(): number {
        return this.finalPrice - (this.product.price * this.amout);
    }
    setDiscountValues( discountValue : number, discountPercentage: number): void {
        this.discount = true
        this.discountValue = discountValue;
        this.discountPercentage = discountPercentage;
        
        this.totalDiscount = this.calcDiscont();
        if (this.totalDiscount === 0) {
            this.discount = false
        }
        this.total = this.calcTotal();
        this.finalPrice = this.calcFinalPrice();
        
    }
    setInstallments(installmentsAmount: number) : void {
        this.installmentsAmount = installmentsAmount
        this.installmentsValue = Math.ceil(this.finalPrice / installmentsAmount)
    }
    setPayment(paymentMethod: string) : void {
        this.paymentMethod = paymentMethod
        if (paymentMethod !== 'Crédito') {
            this.paymentType = 'Á vista'
        } else {    
            console.log("Deseja qual opção?\n 1. Á vista\n 2. Parcelado")
            const option = readLineSync.questionInt()
            
            console.clear()
            
            if (option === 1) {
                this.paymentType = 'Á vista'
            }
            if (option === 2) {
                this.paymentType = 'Parcelado'
                
                console.log('Deseja parcelar em quantas vezes? (No máximo 12 vezes)') 
                let chose = readLineSync.questionInt()
                while (true) {
                    if (chose < 13) {
                        this.setInstallments(chose)
                        break
                    } else {
                        console.log("Digite um valor válido:")
                        chose = readLineSync.questionInt()
                    }
                }                
            }
            console.clear() 
        }
        
    }
}