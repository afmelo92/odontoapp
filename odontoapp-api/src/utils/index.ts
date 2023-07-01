function setAccountType(type: number) {
  switch (type) {
    case 1:
      return 'DENTIST';
    case 2:
      return 'LAB';
    case 3:
      return 'PATIENT';
    default:
      return 'PATIENT';
  }
}

export { setAccountType };
