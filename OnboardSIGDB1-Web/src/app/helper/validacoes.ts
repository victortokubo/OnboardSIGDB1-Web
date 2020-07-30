import { AbstractControl } from '@angular/forms';

export function CnpjValido(control: AbstractControl) {
  let cnpj = control.value.replace(/[^\d]+/g, '');

  if (cnpj == '')
    return { cnpjInvalido: true };

  if (cnpj.length != 14)
    return { cnpjInvalido: true };

  // Elimina CNPJs invalidos conhecidos
  if (cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999")
    return { cnpjInvalido: true };

  // Valida DVs
  let tamanho = cnpj.length - 2
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
      pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(0))
    return { cnpjInvalido: true };

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
      pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(1))
    return { cnpjInvalido: true };

  return null;
}

export function CpfValido(control: AbstractControl) {
  let cpf: string = control.value.replace(/[^\d]+/g, '');

  let multiplicador1 = [10, 9, 8, 7, 6, 5, 4, 3, 2];
  let multiplicador2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
  let tempCpf: string;
  let digito: string;
  let soma: number;
  let resto: number;
  cpf = cpf.trim();
  cpf.replace(".", "").replace("-", "");
  if (cpf.length != 11)
    return { cpfInvalido: true };
  tempCpf = cpf.substring(0, 9);
  soma = 0;

  for (let i = 0; i < 9; i++)
    soma += Number.parseInt(tempCpf[i].toString()) * multiplicador1[i];
  resto = soma % 11;
  if (resto < 2)
    resto = 0;
  else
    resto = 11 - resto;
  digito = resto.toString();
  tempCpf = tempCpf + digito;
  soma = 0;
  for (let i = 0; i < 10; i++)
    soma += Number.parseInt(tempCpf[i].toString()) * multiplicador2[i];
  resto = soma % 11;
  if (resto < 2)
    resto = 0;
  else
    resto = 11 - resto;
  digito = digito + resto.toString();

  if (cpf.endsWith(digito)) {
    return null;
  }

  return { cpfInvalido: true };
}