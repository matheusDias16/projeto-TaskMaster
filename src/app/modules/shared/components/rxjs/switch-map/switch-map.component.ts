import {
  Subscription,
  debounceTime,
  delay,
  exhaustMap,
  filter,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-switch-map',
  templateUrl: './switch-map.component.html',
  styleUrl: './switch-map.component.scss',
})
export class SwitchMapComponent {
  input = new FormControl<string>('');

  constructor() {
    //tem um subscribe para observar a variável
    /* this.input.valueChanges.subscribe((value) => {
      //outro subscribe para observar o retorno da request
      this.buscarPesquisa(value || '').subscribe(resultado => console.log(resultado)
      )
    }); */

    //com o switchMap para resolver o problema de múltiplos subscribes aninhados
    this.input.valueChanges
      .pipe(
        filter((value) => !!value),
        //espera uma certa quantidade de tempo não receber nenhuma entrada de dados do subscribe para acioar o switchMap
        debounceTime(500),
        //quando temos muitas entradas ao mesmo tempo, o switchMap ignora as antigas e segue com a última
        //switchMap((valorPesquisa) => this.buscarPesquisa(valorPesquisa || ''))

        //enquanto não terminar a solicitação do primeiro dado entrado no subscribe, ele não parte para outra
        //tudo que ocorre de entrada de dados no subscribe nesse meio tempo até o retorno da "requisição" é ignorado e não realiza nenhuma solicitação de requisição
        //após o retorno da 'requisição', se ocorrer a entrada de algum dado novo no subscribe, aí realiza uma nova solicitação 
        exhaustMap((valorPesquisa) => this.buscarPesquisa(valorPesquisa || ''))
      )
      .subscribe((resultadoPesquisa) => console.log(resultadoPesquisa));
  }

  //simulando uma request http
  buscarPesquisa(pesquisa: string) {
    //of() retorna um observable que entrega esse valor na hora
    //como se fosse uma promisse que está resolvendo na hora
    return of(`Resultado... ${pesquisa}`).pipe(
      tap((valor) => console.log(`Buscando... ${pesquisa}`)),
      delay(3000)
    );
  }
}
