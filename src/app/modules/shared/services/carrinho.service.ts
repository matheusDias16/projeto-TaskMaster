import { Injectable } from '@angular/core';
import { Compra } from '../models/compra.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private carrinho: Compra[] = [];
  produtoAdicionado$ = new Subject<number>()
  //private produtoAdicionado$ = new Subject<number>()
  //private produtoAdicionado$ = new BehaviorSubject<number>(0)
  constructor() {}

  obterQtdeCarrinho() {
    return this.produtoAdicionado$.asObservable()
  }

  adicionarProduto(produto: string) {
    const produtoCompra: Compra = {
      produto: produto,
      id: this.carrinho.length + 1,
    };
    this.carrinho.push(produtoCompra);
    console.log(this.carrinho);
    
    this.produtoAdicionado$.next(this.carrinho.length);
  }
}
