const colorScale = [
  { id: 1, group: 1, title: 'A1' },
  { id: 2, group: 1, title: 'A2' },
  { id: 3, group: 1, title: 'A3' },
  { id: 4, group: 1, title: 'A3.5' },
  { id: 5, group: 1, title: 'A4' },
  { id: 6, group: 1, title: 'B1' },
  { id: 7, group: 1, title: 'B2' },
  { id: 8, group: 1, title: 'B3' },
  { id: 9, group: 1, title: 'B4' },
  { id: 10, group: 1, title: 'C1' },
  { id: 11, group: 1, title: 'C2' },
  { id: 12, group: 1, title: 'C3' },
  { id: 13, group: 1, title: 'C4' },
  { id: 14, group: 1, title: 'D2' },
  { id: 15, group: 1, title: 'D3' },
  { id: 16, group: 1, title: 'D4' },
  { id: 17, group: 1, title: 'BL1' },
  { id: 18, group: 1, title: 'BL2' },
  { id: 19, group: 1, title: 'BL3' },
  { id: 20, group: 1, title: 'BL4' },
  { id: 21, group: 2, title: '60' },
  { id: 22, group: 2, title: '61' },
  { id: 23, group: 2, title: '62' },
  { id: 24, group: 2, title: '66' },
  { id: 25, group: 2, title: '67' },
  { id: 26, group: 2, title: '69' },
  { id: 27, group: 3, title: 'STG-2' },
  { id: 28, group: 3, title: 'STG-4' },
  { id: 29, group: 3, title: 'STG-5' },
  { id: 31, group: 3, title: 'STG-6A' },
  { id: 32, group: 3, title: 'STG-8' },
  { id: 33, group: 3, title: 'STG-8A' },
  { id: 34, group: 3, title: 'STG-10' },
  { id: 35, group: 3, title: 'STG-13' },
  { id: 36, group: 3, title: 'STG-14' },
  { id: 37, group: 3, title: 'STG-14A' },
  { id: 38, group: 3, title: 'STG-15' },
  { id: 39, group: 3, title: 'STG-16' },
];

export type Color = { id: number; group: number; title: string };

export type Option = {
  id: number;
  title: string;
  price: number;
  elements?: number[];
};

export type Service = {
  id: number;
  title: string;
  description: string | null;
  category: number;
  options: Option[];
  elements: boolean;
  colors: number;
  price: number | null;
};

const newServices: Service[] = [
  {
    id: 1,
    title: 'Faceta',
    description: null,
    category: 1,
    options: [
      { id: 1, title: 'Dissilicato de lítio', price: 38000 },
      { id: 2, title: 'Feldspática', price: 40000 },
    ],
    elements: true,
    colors: 1,
    price: null,
  },
  {
    id: 2,
    category: 1,
    title: 'Coroa',
    description: null,
    options: [
      { id: 1, title: 'Dissilicato de lítio', price: 38000 },
      { id: 2, title: 'Metalocerâmica s/ implante', price: 28000 },
      { id: 3, title: 'Metalocerâmica s/ dente', price: 22000 },
      { id: 4, title: 'Cerômero', price: 18000 },
      { id: 5, title: 'Resina fotopolimerizável', price: 20000 },
      { id: 6, title: 'Zircônia', price: 40000 },
    ],
    elements: true,
    colors: 1,
    price: null,
  },
  {
    id: 3,
    category: 1,
    title: 'Onlay/Inlay/Overlay',
    description: null,
    options: [
      { id: 1, title: 'Dissilicato de lítio', price: 38000 },
      { id: 2, title: 'Resina fotopolimerizável', price: 20000 },
      { id: 3, title: 'Zircônia', price: 40000 },
    ],
    elements: true,
    colors: 1,
    price: null,
  },
  {
    id: 4,
    category: 1,
    title: 'Adesiva',
    description: null,
    options: [
      { id: 1, title: 'Dissilicato de lítio', price: 38000 },
      { id: 2, title: 'Cerômero', price: 18000 },
    ],
    elements: true,
    colors: 1,
    price: null,
  },
  {
    id: 5,
    category: 2,
    title: 'Enceramento diagnóstico',
    description: null,
    options: [
      { id: 1, title: 'Digital', price: 5000 },
      { id: 2, title: 'Analógico', price: 6000 },
    ],
    elements: true,
    colors: 0,
    price: null,
  },
  {
    id: 6,
    category: 3,
    title: 'Mockup + Guias de desgaste',
    description: null,
    options: [],
    elements: false,
    colors: 0,
    price: 7500,
  },
  {
    id: 7,
    category: 3,
    title: 'Modelo de estudo',
    description: null,
    options: [],
    elements: false,
    colors: 0,
    price: 3000,
  },
  {
    id: 8,
    category: 2,
    title: 'Provisório',
    description: null,
    options: [
      { id: 1, title: 'Sobre implante', price: 8500 },
      { id: 2, title: 'Sobre dente', price: 6000 },
    ],
    elements: true,
    colors: 2,
    price: null,
  },
  {
    id: 9,
    category: 2,
    title: 'Aplicação de gengiva',
    description: null,
    options: [],
    elements: true,
    colors: 3,
    price: 8000,
  },
  {
    id: 10,
    category: 2,
    title: 'Ombro cerâmico',
    description: null,
    options: [],
    elements: true,
    colors: 1,
    price: 6000,
  },
  {
    id: 11,
    category: 3,
    title: 'Placa de clareamento',
    description: null,
    options: [
      {
        id: 1,
        title: 'Superior',
        elements: [
          11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 27,
        ],
        price: 6000,
      },
      {
        id: 2,
        title: 'Inferior',
        elements: [
          31, 32, 33, 34, 35, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48,
        ],
        price: 6000,
      },
      {
        id: 3,
        title: 'Sup + Inf',
        elements: [
          11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 27, 31,
          32, 33, 34, 35, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48,
        ],
        price: 10000,
      },
    ],
    elements: false,
    colors: 0,
    price: null,
  },
];

const defaultServices = [
  {
    id: 1,
    group: 'Primary',
    title: 'Faceta',
    materials: [1, 2],
    options: [],
    elements: true,
    colors: true,
  },
  {
    id: 2,
    group: 'Primary',
    title: 'Coroa',
    materials: [1, 3, 4, 5, 6, 7],
    options: [],
    elements: true,
    colors: true,
  },
  {
    id: 3,
    group: 'Primary',
    title: 'Onlay/Inlay/Overlay',
    materials: [1, 5, 6],
    options: [],
    elements: true,
    colors: true,
  },
  {
    id: 4,
    group: 'Primary',
    title: 'Adesiva',
    materials: [1, 4],
    options: [],
    elements: true,
    colors: true,
  },
  {
    id: 5,
    group: 3,
    title: 'Enceramento diagnóstico',
    materials: [],
    options: [
      { id: 1, title: 'Digital' },
      { id: 2, title: 'Analógico' },
    ],
    elements: true,
    colors: false,
  },
  {
    id: 6,
    group: 'Secondary',
    title: 'Mockup + Guias de desgaste',
    materials: [],
    options: [],
    elements: false,
    colors: false,
  },
  {
    id: 7,
    group: 'Secondary',
    title: 'Modelo de estudo',
    materials: [],
    options: [],
    elements: false,
    colors: false,
  },
  {
    id: 8,
    group: 'Secondary',
    title: 'Provisório',
    materials: [],
    options: [],
    elements: true,
    colors: true,
  },
  {
    id: 9,
    group: 'Secondary',
    title: 'Aplicação de gengiva',
    materials: [],
    options: [],
    elements: true,
    colors: false,
  },
  {
    id: 10,
    group: 'Secondary',
    title: 'Ombro cerâmico',
    materials: [],
    options: [],
    elements: true,
    colors: true,
  },
  {
    id: 11,
    group: 3,
    title: 'Placa de clareamento',
    materials: [],
    options: [
      {
        id: 1,
        title: 'Superior',
        elements: [
          11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 27,
        ],
      },
      {
        id: 2,
        title: 'Inferior',
        elements: [
          31, 32, 33, 34, 35, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48,
        ],
      },
      {
        id: 3,
        title: 'Sup + Inf',
        elements: [
          11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 27, 31,
          32, 33, 34, 35, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48,
        ],
      },
    ],
    elements: true,
    colors: false,
  },
];

const defaultMaterials = [
  { id: 1, title: 'Dissilicato de lítio', price: 38000 },
  { id: 2, title: 'Feldspática', price: 45000 },
  { id: 3, title: 'Metalocerâmica s/ implante', price: 28000 },
  { id: 4, title: 'Metalocerâmica s/ dente', price: 22000 },
  { id: 5, title: 'Cerômero', price: 18000 },
  { id: 6, title: 'Resina fotopolimerizável', price: 20000 },
  { id: 7, title: 'Zircônia', price: 40000 },
];

export { colorScale, defaultServices, defaultMaterials, newServices };
