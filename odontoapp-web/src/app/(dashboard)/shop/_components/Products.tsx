import React from "react";
import ProductRow from "./ProductRow";

const Products: React.FC = () => {
  return (
    <div className="h-full w-full max-w-full flex flex-col overflow-x-auto product-container gap-4">
      {exhibitorMock.map((exhibitor) => (
        <ProductRow key={exhibitor.id} exhibitor={exhibitor} />
      ))}
    </div>
  );
};

export default Products;

const exhibitorMock = [
  {
    id: 1,
    name: "Dental Cremer",
    products: [
      {
        id: "DC30122",
        name: "Sugador Descartável Verde - AllPrime",
        description: "Embalagem com 40 unidades.",
        price: 6.9,
        oldPrice: 8.9,
        images: {
          default:
            "https://cdn.dentalcremer.com.br/produtos/210/lovers-sugador-odontologico-allprime-verde-126685.jpg",
        },
      },
      {
        id: "113773",
        name: "Alginato Tipo I Jeltrate Plus - Dentsply Sirona",
        description: "Embalagem com 454g.",
        price: 59.9,
        oldPrice: 72.9,
        images: {
          default: "https://cdn.dentalcremer.com.br/produtos/210/113773.jpg",
        },
      },
      {
        id: "133847",
        name: "Máscara Descartável Tripla com Clipe Nasal Branca - Sp Protection",
        description: "Embalagem com 50 unidades.",
        price: 7.9,
        oldPrice: 15.9,
        images: {
          default:
            "https://cdn.dentalcremer.com.br/produtos/210/mascara-descartavel-tripla-com-clipe-nasal-branca-sp-protection-125231-dental-cremer.jpg",
        },
      },
      {
        id: "114601",
        name: "Caixa Para Aparelho Ortodôntico - Maquira",
        description: "Embalagem com 10 unidades. Cores sortidas.",
        price: 19.9,
        oldPrice: 24.9,
        url: "/caixa-para-aparelho-ortodontico-maquira-114601.html",
        images: {
          default: "https://cdn.dentalcremer.com.br/produtos/210/114601.jpg",
        },
      },
      {
        id: "120441",
        name: "Adesivo Adper™ Single Bond 2 - 3M",
        description: "Adesivo Nanoparticulado. Seringa de 6g.",
        price: 137.9,
        oldPrice: 179.9,
        url: "/adesivo-adpertm-single-bond-2-3m-120441.html",
        images: {
          default:
            "https://cdn.dentalcremer.com.br/produtos/210/adesivo-adper-single-bond-2-3m-dental-cremer.jpg",
        },
      },
      {
        id: "113774",
        name: "Clareador Whiteness HP 35% - FGM",
        description:
          "Kit para 3 pacientes com 10g de Peróxido de Hidrogênio Concentrado + 5g de Espessante + 2g de Neutralize de solução neutralizante do peróxido + espátula e placa para preparo do gel + Instruções para o profissional + 2g de Top Dam azul + 6 ponteiras.",
        price: 141.9,
        oldPrice: 183.9,
        url: "/clareador-whiteness-hp-fgm-113774.html",
        images: {
          default:
            "https://cdn.dentalcremer.com.br/produtos/210/resina-master-flow-biodinamica-dc10871.jpg",
        },
      },
      {
        id: "121799",
        name: "Fio de Sutura Nylon - Shalon",
        description: "Embalagem com 24 unidades. Com agulha 3/8 CTI 3cm. 4-0",
        price: 46.9,
        oldPrice: 71.9,
        url: "/fio-de-sutura-nylon-shalon-121799.html",
        images: {
          default:
            "https://cdn.dentalcremer.com.br/produtos/210/fio-de-sutura-nylon-shalon-121799-dental-cremer.jpg",
        },
      },
      {
        id: "120743",
        name: "Adesivo Ambar - FGM",
        description: "Embalagem com 4ml.",
        price: 49.9,
        oldPrice: 69.9,
        url: "/adesivo-ambar-fgm-120743.html",
        images: {
          default:
            "https://cdn.dentalcremer.com.br/produtos/210/adesivo-ambar-fgm-120743-dental-cremer.jpg",
        },
      },
      {
        id: "DC26786",
        name: "Arco Flexy NiTi Superelástico Redondo - Orthometric",
        description: "Embalagem com 10 unidades. Escolha o modelo.",
        price: 9.9,
        oldPrice: 12.9,
        url: "/arco-flexy-niti-superelastico-redondo-orthometric-dc26786.html",
        images: {
          default:
            "https://cdn.dentalcremer.com.br/produtos/210/arco-flexy-niti-superelastico-redondo-orthometric-dental-cremer.jpg",
        },
      },
    ],
  },
  {
    id: 2,
    name: "Surya Dental",
    products: [
      {
        id: "DC30122",
        name: "Sugador Descartável Verde - AllPrime",
        description: "Embalagem com 40 unidades.",
        price: 6.9,
        oldPrice: 8.9,
        images: {
          default:
            "https://cdn.dentalcremer.com.br/produtos/210/lovers-sugador-odontologico-allprime-verde-126685.jpg",
        },
      },
      {
        id: "113773",
        name: "Alginato Tipo I Jeltrate Plus - Dentsply Sirona",
        description: "Embalagem com 454g.",
        price: 59.9,
        oldPrice: 72.9,
        images: {
          default: "https://cdn.dentalcremer.com.br/produtos/210/113773.jpg",
        },
      },
      {
        id: "133847",
        name: "Máscara Descartável Tripla com Clipe Nasal Branca - Sp Protection",
        description: "Embalagem com 50 unidades.",
        price: 7.9,
        oldPrice: 15.9,
        images: {
          default:
            "https://cdn.dentalcremer.com.br/produtos/210/mascara-descartavel-tripla-com-clipe-nasal-branca-sp-protection-125231-dental-cremer.jpg",
        },
      },
      {
        id: "114601",
        name: "Caixa Para Aparelho Ortodôntico - Maquira",
        description: "Embalagem com 10 unidades. Cores sortidas.",
        price: 19.9,
        oldPrice: 24.9,
        url: "/caixa-para-aparelho-ortodontico-maquira-114601.html",
        images: {
          default: "https://cdn.dentalcremer.com.br/produtos/210/114601.jpg",
        },
      },
      {
        id: "120441",
        name: "Adesivo Adper™ Single Bond 2 - 3M",
        description: "Adesivo Nanoparticulado. Seringa de 6g.",
        price: 137.9,
        oldPrice: 179.9,
        url: "/adesivo-adpertm-single-bond-2-3m-120441.html",
        images: {
          default:
            "https://cdn.dentalcremer.com.br/produtos/210/adesivo-adper-single-bond-2-3m-dental-cremer.jpg",
        },
      },
      {
        id: "113774",
        name: "Clareador Whiteness HP 35% - FGM",
        description:
          "Kit para 3 pacientes com 10g de Peróxido de Hidrogênio Concentrado + 5g de Espessante + 2g de Neutralize de solução neutralizante do peróxido + espátula e placa para preparo do gel + Instruções para o profissional + 2g de Top Dam azul + 6 ponteiras.",
        price: 141.9,
        oldPrice: 183.9,
        url: "/clareador-whiteness-hp-fgm-113774.html",
        images: {
          default:
            "https://cdn.dentalcremer.com.br/produtos/210/resina-master-flow-biodinamica-dc10871.jpg",
        },
      },
      {
        id: "121799",
        name: "Fio de Sutura Nylon - Shalon",
        description: "Embalagem com 24 unidades. Com agulha 3/8 CTI 3cm. 4-0",
        price: 46.9,
        oldPrice: 71.9,
        url: "/fio-de-sutura-nylon-shalon-121799.html",
        images: {
          default:
            "https://cdn.dentalcremer.com.br/produtos/210/fio-de-sutura-nylon-shalon-121799-dental-cremer.jpg",
        },
      },
      {
        id: "120743",
        name: "Adesivo Ambar - FGM",
        description: "Embalagem com 4ml.",
        price: 49.9,
        oldPrice: 69.9,
        url: "/adesivo-ambar-fgm-120743.html",
        images: {
          default:
            "https://cdn.dentalcremer.com.br/produtos/210/adesivo-ambar-fgm-120743-dental-cremer.jpg",
        },
      },
      {
        id: "DC26786",
        name: "Arco Flexy NiTi Superelástico Redondo - Orthometric",
        description: "Embalagem com 10 unidades. Escolha o modelo.",
        price: 9.9,
        oldPrice: 12.9,
        url: "/arco-flexy-niti-superelastico-redondo-orthometric-dc26786.html",
        images: {
          default:
            "https://cdn.dentalcremer.com.br/produtos/210/arco-flexy-niti-superelastico-redondo-orthometric-dental-cremer.jpg",
        },
      },
    ],
  },
  {
    id: 3,
    name: "Dental Med Sul",
    products: [
      {
        id: "DC30122",
        name: "Sugador Descartável Verde - AllPrime",
        description: "Embalagem com 40 unidades.",
        price: 6.9,
        oldPrice: 8.9,
        images: {
          default:
            "https://cdn.dentalcremer.com.br/produtos/210/lovers-sugador-odontologico-allprime-verde-126685.jpg",
        },
      },
      {
        id: "113773",
        name: "Alginato Tipo I Jeltrate Plus - Dentsply Sirona",
        description: "Embalagem com 454g.",
        price: 59.9,
        oldPrice: 72.9,
        images: {
          default: "https://cdn.dentalcremer.com.br/produtos/210/113773.jpg",
        },
      },
      {
        id: "133847",
        name: "Máscara Descartável Tripla com Clipe Nasal Branca - Sp Protection",
        description: "Embalagem com 50 unidades.",
        price: 7.9,
        oldPrice: 15.9,
        images: {
          default:
            "https://cdn.dentalcremer.com.br/produtos/210/mascara-descartavel-tripla-com-clipe-nasal-branca-sp-protection-125231-dental-cremer.jpg",
        },
      },
      {
        id: "114601",
        name: "Caixa Para Aparelho Ortodôntico - Maquira",
        description: "Embalagem com 10 unidades. Cores sortidas.",
        price: 19.9,
        oldPrice: 24.9,
        url: "/caixa-para-aparelho-ortodontico-maquira-114601.html",
        images: {
          default: "https://cdn.dentalcremer.com.br/produtos/210/114601.jpg",
        },
      },
      {
        id: "120441",
        name: "Adesivo Adper™ Single Bond 2 - 3M",
        description: "Adesivo Nanoparticulado. Seringa de 6g.",
        price: 137.9,
        oldPrice: 179.9,
        url: "/adesivo-adpertm-single-bond-2-3m-120441.html",
        images: {
          default:
            "https://cdn.dentalcremer.com.br/produtos/210/adesivo-adper-single-bond-2-3m-dental-cremer.jpg",
        },
      },
      {
        id: "113774",
        name: "Clareador Whiteness HP 35% - FGM",
        description:
          "Kit para 3 pacientes com 10g de Peróxido de Hidrogênio Concentrado + 5g de Espessante + 2g de Neutralize de solução neutralizante do peróxido + espátula e placa para preparo do gel + Instruções para o profissional + 2g de Top Dam azul + 6 ponteiras.",
        price: 141.9,
        oldPrice: 183.9,
        url: "/clareador-whiteness-hp-fgm-113774.html",
        images: {
          default:
            "https://cdn.dentalcremer.com.br/produtos/210/resina-master-flow-biodinamica-dc10871.jpg",
        },
      },
      {
        id: "121799",
        name: "Fio de Sutura Nylon - Shalon",
        description: "Embalagem com 24 unidades. Com agulha 3/8 CTI 3cm. 4-0",
        price: 46.9,
        oldPrice: 71.9,
        url: "/fio-de-sutura-nylon-shalon-121799.html",
        images: {
          default:
            "https://cdn.dentalcremer.com.br/produtos/210/fio-de-sutura-nylon-shalon-121799-dental-cremer.jpg",
        },
      },
      {
        id: "120743",
        name: "Adesivo Ambar - FGM",
        description: "Embalagem com 4ml.",
        price: 49.9,
        oldPrice: 69.9,
        url: "/adesivo-ambar-fgm-120743.html",
        images: {
          default:
            "https://cdn.dentalcremer.com.br/produtos/210/adesivo-ambar-fgm-120743-dental-cremer.jpg",
        },
      },
      {
        id: "DC26786",
        name: "Arco Flexy NiTi Superelástico Redondo - Orthometric",
        description: "Embalagem com 10 unidades. Escolha o modelo.",
        price: 9.9,
        oldPrice: 12.9,
        url: "/arco-flexy-niti-superelastico-redondo-orthometric-dc26786.html",
        images: {
          default:
            "https://cdn.dentalcremer.com.br/produtos/210/arco-flexy-niti-superelastico-redondo-orthometric-dental-cremer.jpg",
        },
      },
    ],
  },
];
