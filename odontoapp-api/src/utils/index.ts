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

function mapBodyErrorFields(body: Record<string, any>) {
  return [
    ...Object.entries(body)
      .map(([key, value]) => (Boolean(value) === false ? key : null))
      .filter(Boolean),
  ];
}

export { setAccountType, mapBodyErrorFields };
