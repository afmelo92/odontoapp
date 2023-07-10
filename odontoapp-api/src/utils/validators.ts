/* eslint-disable no-useless-escape */
const validateCNPJ = (cnpj: string) => {
  return /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/.test(
    cnpj
  );
};

const validateCPF = (cpf: string) => {
  return /^\d{3}[\.]?\d{3}[\.]?\d{3}[\-]?\d{2}$/.test(cpf);
};

const validateCPFCNPJ = (cpfOrCnpj: string) => {
  return /(^\d{3}[\.]?\d{3}[\.]?\d{3}[\-]?\d{2}$)|(^\d{2}[\.]?\d{3}[\.]?\d{3}[\/]?\d{4}[\-]?\d{2}$)/.test(
    cpfOrCnpj
  );
};

const validateEmail = (mail: string) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
};

const validatePhone = (phone: string) => {
  return /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9\s?\d|[2-9])\d{3})\-?(\d{4}))$/.test(
    phone
  );
};

const validateUUID = (uuid: string) => {
  return /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
    uuid
  );
};

function verifica_cpf_cnpj(valor: string) {
  valor = valor.toString();

  valor = valor.replace(/[^0-9]/g, '');

  if (valor.length === 11) {
    return 'CPF';
  } else if (valor.length === 14) {
    return 'CNPJ';
  } else {
    return false;
  }
}

function calc_digitos_posicoes(
  digitos: string,
  posicoes = 10,
  soma_digitos = 0
) {
  digitos = digitos.toString();

  for (let i = 0; i < digitos.length; i++) {
    soma_digitos = soma_digitos + Number(digitos[i]) * posicoes;

    posicoes--;

    if (posicoes < 2) {
      posicoes = 9;
    }
  }

  soma_digitos = soma_digitos % 11;

  if (soma_digitos < 2) {
    soma_digitos = 0;
  } else {
    soma_digitos = 11 - soma_digitos;
  }

  const cpf = digitos + soma_digitos;

  return cpf;
}

function valida_cpf(valor: string) {
  valor = valor.toString();

  valor = valor.replace(/[^0-9]/g, '');

  const digitos = valor.substr(0, 9);

  let novo_cpf = calc_digitos_posicoes(digitos);

  novo_cpf = calc_digitos_posicoes(novo_cpf, 11);

  if (novo_cpf === valor) {
    return true;
  } else {
    return false;
  }
}

function valida_cnpj(valor: string) {
  valor = valor.toString();

  valor = valor.replace(/[^0-9]/g, '');

  const cnpj_original = valor;

  const primeiros_numeros_cnpj = valor.substr(0, 12);

  const primeiro_calculo = calc_digitos_posicoes(primeiros_numeros_cnpj, 5);

  const segundo_calculo = calc_digitos_posicoes(primeiro_calculo, 6);

  const cnpj = segundo_calculo;

  if (cnpj === cnpj_original) {
    return true;
  }

  return false;
}

function valida_cpf_cnpj(valor: string) {
  const valida = verifica_cpf_cnpj(valor);

  valor = valor.toString();

  valor = valor.replace(/[^0-9]/g, '');

  if (valida === 'CPF') {
    return valida_cpf(valor);
  } else if (valida === 'CNPJ') {
    return valida_cnpj(valor);
  } else {
    return false;
  }
}

function formata_cpf_cnpj(valor: string) {
  let formatado: boolean | string = false;

  const valida = verifica_cpf_cnpj(valor);

  valor = valor.toString();

  valor = valor.replace(/[^0-9]/g, '');

  if (valida === 'CPF') {
    if (valida_cpf(valor)) {
      formatado = valor.substr(0, 3) + '.';
      formatado += valor.substr(3, 3) + '.';
      formatado += valor.substr(6, 3) + '-';
      formatado += valor.substr(9, 2) + '';
    }
  } else if (valida === 'CNPJ') {
    if (valida_cnpj(valor)) {
      formatado = valor.substr(0, 2) + '.';
      formatado += valor.substr(2, 3) + '.';
      formatado += valor.substr(5, 3) + '/';
      formatado += valor.substr(8, 4) + '-';
      formatado += valor.substr(12, 14) + '';
    }
  }

  return formatado;
}

export {
  validateCPF,
  validateCNPJ,
  validateCPFCNPJ,
  validateEmail,
  validatePhone,
  validateUUID,
  valida_cpf,
  valida_cnpj,
  valida_cpf_cnpj,
  formata_cpf_cnpj,
};
