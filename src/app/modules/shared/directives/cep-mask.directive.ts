  import { Directive, ElementRef, HostListener } from '@angular/core';
  import { NgControl } from '@angular/forms';

  @Directive({
    selector: '[appCepMask]',
  })
  export class CepMaskDirective {
    /**
     * Construtor da diretiva.
     * @param {ElementRef} element - Referência ao elemento HTML do campo de entrada.
     * @param {NgControl} ngControl - Controle do formulário associado ao campo de entrada.
     */
    constructor(private element: ElementRef, private ngControl: NgControl) {}
    /**
     * Ouvinte de evento para 'input', acionado quando o valor do elemento de entrada é alterado.
     * @param {any} event - Evento de entrada.
     */
    @HostListener('input', ['$event'])
    onInputChange(event: any) {
      this.formatCep(event);
    }
    /**
     * Ouvinte de evento para 'paste', acionado quando o usuário cola texto no campo de entrada.
     * @param {ClipboardEvent} event - Evento de colagem.
     */
    @HostListener('paste', ['$event'])
    onPaste(event: ClipboardEvent) {
      const clipboardData = event.clipboardData;
      const pasteText = clipboardData?.getData('text') || '';
      // Limita o texto colado para o comprimento máximo de um CEP
      const maxLength = 9;
      if (pasteText.length > maxLength) {
        return;
      }
      // Formata o texto colado de acordo com a máscara do CEP
      const pastedValue = this.formatCepRegex(pasteText);
      const startPosition = this.element.nativeElement.selectionStart;
      const endPosition = this.element.nativeElement.selectionEnd;
      const currentValue = this.element.nativeElement.value;
      const modifiedValue =
        currentValue.slice(0, startPosition) +
        pastedValue +
        currentValue.slice(endPosition);
      const formattedValue = this.formatCepRegex(modifiedValue);
      this.element.nativeElement.value = formattedValue;
    }
    /**
     * Função para aplicar a máscara de CEP ao valor do campo de entrada.
     * @param {any} event - Evento de entrada.
     */
    formatCep(event: any): void {
      const input = event.target;
      const value = input.value.replace(/\D/g, '');
      // Se o valor do CEP tiver 7 ou menos dígitos, mantém o valor original
      if (value.length <= 7) {
        this.ngControl.control?.setValue(value, { emitEvent: false });
      } else {
        // Se o valor do CEP tiver mais de 7 dígitos, aplica a máscara "(XXXXX-XXX)"
        const formattedValue = `${value.slice(0, 5)}-${value.slice(5, 8)}`;
        this.ngControl.control?.setValue(formattedValue, { emitEvent: false });
      }
    }
    /**
     * Função para aplicar a formatação do CEP usando expressão regular.
     * @param {string} cep - Valor do CEP.
     * @returns {string} - CEP formatado.
     */
    formatCepRegex(cep: string): string {
      // Aplica a formatação do CEP usando expressão regular (Regex)
      return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
  }



