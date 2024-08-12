export const errorMessages: any = {
  cep: [
    { type: 'required', message: 'Por favor, informe um cep' },
    { type: 'maxlength', message: 'Cep deve ter no máximo 9 caracteres' },
    { type: 'minlength', message: 'Cep deve ter no minimo 8 caracteres' },
  ],
  comment: [
    { type: 'required', message: 'Por favor, informe um Comentário' },
    { type: 'maxlength', message: 'Limite de caracteres do Comentário atingido' },
    { type: 'minlength', message: 'O Comentário deve ter no mínimo 4 caracteres' },
  ],
}
