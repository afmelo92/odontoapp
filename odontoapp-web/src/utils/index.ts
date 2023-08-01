function cnpjMask(value: string) {
  return value
    .replace(/\D+/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
}

function cpfMask(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
}

function cellphoneMask(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})(\d+?)$/, "$1");
}

function zipCodeMask(value: string) {
  return value.replace(/^(\d{5})(\d{3})$/, "$1-$2");
}

function onlyNumbers(value: string) {
  return value.replace(/[^0-9]/g, "");
}

function formatOrderStatus(status: number) {
  switch (status) {
    case 1:
      return "Enviado";
    case 2:
      return "Confirmado";
    case 3:
      return "Em Produção";
    case 4:
      return "Ajuste";
    case 5:
      return "Cancelado";
    case 6:
      return "Finalizado";
    case 7:
      return "Em análise";
    default:
      return "";
  }
}

export {
  cnpjMask,
  cpfMask,
  cellphoneMask,
  zipCodeMask,
  onlyNumbers,
  formatOrderStatus,
};
