"use client";

import { createContext, useReducer } from "react";

export type Customer = {
  id: number;
  name: string;
  doctor: string;
  cnpj: string;
};

export type StateProps = {
  searchData: string;
  customers: Customer[];
  filtered: Customer[];
  selected: Customer | null;
  pagination: {
    index: number;
    perPage: number;
    totalPages: number;
    page: number;
    next: boolean;
    prev: boolean;
  };
};

const mock: Customer[] = [
  {
    id: 1,
    name: "Blanda-O'Keefe Odonto",
    doctor: "Terry Crews",
    cnpj: "11.111.111/0001-55",
  },
  {
    id: 2,
    name: "Aufderhar-Cronin Clinic",
    doctor: "Sheldon Cooper",
    cnpj: "22.222.222/0001-55",
  },
  {
    id: 3,
    name: "Lindgren LLC",
    doctor: "Terrill Terribile",
    cnpj: "33.333.333/0001-55",
  },
  {
    id: 4,
    name: "Wolf and Sons",
    doctor: "Miles Davis",
    cnpj: "44.444.444/0001-55",
  },
  {
    id: 5,
    name: "Adams Inc",
    doctor: "Penelope Cruz",
    cnpj: "55.555.555/0001-55",
  },
  {
    id: 6,
    name: "D'amore odonto",
    doctor: "Alison Reichert",
    cnpj: "66.666.666/0001-55",
  },
  {
    id: 7,
    name: "Casper Inc",
    doctor: "Danny DeVito",
    cnpj: "77.777.777/0001-55",
  },
  {
    id: 8,
    name: "Crey Odonto",
    doctor: "Raphael Almeida",
    cnpj: "88.888.888/0001-55",
  },
  {
    id: 9,
    name: "Boyle and Boyle Dental Studio",
    doctor: "Corey Taylor",
    cnpj: "99.999.999/0001-55",
  },
  {
    id: 10,
    name: "Jobson ",
    doctor: "Fabio Jr",
    cnpj: "12.345.678/0001-55",
  },
];

const initialState = {
  searchData: "",
  customers: mock.map((customer) => ({
    ...customer,
  })),
  filtered: [],
  selected: null,
  pagination: {
    index: 0,
    perPage: 6,
    page: 1,
    totalPages: 1,
    next: true,
    prev: false,
  },
};

export type ActionProps = {
  type: "SET_NEXT_PAGE" | "SET_PREV_PAGE" | "FILTER_DATA" | "SELECT_CUSTOMER";
  payload?: any;
};

function reducer(state: StateProps, action: ActionProps) {
  switch (action.type) {
    case "SET_NEXT_PAGE": {
      const nextPage = state.pagination.page + 1;
      const nextIndex = (nextPage - 1) * state.pagination.perPage;
      const nextFiltered = state.customers.slice(
        nextIndex,
        nextIndex + state.pagination.perPage
      );
      const hasNext = nextPage < state.pagination.totalPages;
      const hasPrev = true;

      return {
        ...state,
        filtered: nextFiltered,
        pagination: {
          ...state.pagination,
          page: nextPage,
          next: hasNext,
          prev: hasPrev,
        },
      };
    }
    case "SET_PREV_PAGE": {
      const prevPage = state.pagination.page - 1;
      const prevIndex = (prevPage - 1) * state.pagination.perPage;
      const prevFiltered = state.customers.slice(
        prevIndex,
        prevIndex + state.pagination.perPage
      );
      const hasPrev = prevPage > 1;
      const hasNext = true;

      return {
        ...state,
        filtered: prevFiltered,
        pagination: {
          ...state.pagination,
          page: prevPage,
          next: hasNext,
          prev: hasPrev,
        },
      };
    }
    case "FILTER_DATA": {
      const {
        payload: { data },
      } = action;
      const filteredCustomers =
        data !== ""
          ? state.customers.filter(
              (customer) =>
                customer.name.toLowerCase().includes(data.toLowerCase()) ||
                customer.cnpj.toLowerCase().includes(data.toLowerCase()) ||
                customer?.doctor?.toLowerCase().includes(data.toLowerCase())
            )
          : state.customers;
      const totalFilteredPages = Math.ceil(
        filteredCustomers.length / state.pagination.perPage
      );
      const hasNext = totalFilteredPages > 1;
      const hasPrev = false;

      return {
        ...state,
        searchData: action.payload.data,
        filtered: filteredCustomers.slice(0, state.pagination.perPage),
        pagination: {
          ...state.pagination,
          page: 1,
          totalPages: totalFilteredPages,
          next: hasNext,
          prev: hasPrev,
        },
      };
    }
    case "SELECT_CUSTOMER": {
      const {
        payload: { data },
      } = action;

      return {
        ...state,
        selected:
          state.customers.filter((customer) => customer.id === data)[0] || null,
        pagination: {
          ...state.pagination,
        },
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

type ContextProps = {
  state: StateProps;
  dispatch: React.Dispatch<ActionProps>;
};

const CustomersContext = createContext<ContextProps>({
  state: initialState,
  dispatch: () => null,
});

type ProviderProps = {
  children: React.ReactNode;
};

const CustomersContextProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    const firstSlice = init.customers.slice(
      init.pagination.index,
      init.pagination.perPage
    );

    return {
      ...init,
      filtered: firstSlice,
      pagination: {
        ...init.pagination,
        totalPages: Math.ceil(init.customers.length / init.pagination.perPage),
        next: firstSlice.length <= init.pagination.perPage,
      },
    };
  });

  return (
    <CustomersContext.Provider value={{ state, dispatch }}>
      {children}
    </CustomersContext.Provider>
  );
};

export { CustomersContextProvider, CustomersContext };
