export const validateCPF = (strCPF, helper) => {
  let Soma;
  let Resto;
  
  Soma = 0;
  
  if (strCPF == "00000000000") return helper.error('any.invalid');

  for (let i = 1; i <= 9; i++) {
    Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  }

  Resto = (Soma * 10) % 11;
  if ((Resto == 10) || (Resto == 11)) {
    Resto = 0;
  }
  if (Resto != parseInt(strCPF.substring(9, 10)) ) {
    return helper.error('any.invalid');
  }

  Soma = 0;
  for (let i = 1; i <= 10; i++) {
    Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
  }

  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11)) {
    Resto = 0;
  }
  if (Resto != parseInt(strCPF.substring(10, 11) )) {
    return helper.error('any.invalid');
  }

  return strCPF;
}

export const validateCNPJ = (cnpj, helper) => {
  let tamanho;
  let numeros;
  let digitos;
  let soma;
  let pos;
  let resultado;
  const invalidSeq = ['00000000000000', '11111111111111', '22222222222222', '33333333333333', '44444444444444', '55555555555555', '66666666666666', '77777777777777', '88888888888888', '99999999999999'];

  cnpj = cnpj.replace(/[^\d]+/g,'');

  if(cnpj === '' || cnpj.length != 14 || invalidSeq.includes(cnpj)) {
    return helper.error('any.invalid');
  }

  tamanho = cnpj.length - 2
  numeros = cnpj.substring(0,tamanho);
  digitos = cnpj.substring(tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(0)) {
    return helper.error('any.invalid');
  }

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0,tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(1)) {
    return helper.error('any.invalid');
  }

  return cnpj;
}