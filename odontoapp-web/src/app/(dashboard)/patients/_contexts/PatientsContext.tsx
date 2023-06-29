"use client";

import { createContext, useReducer } from "react";

export type Patient = {
  id: number;
  name: string;
  doctor: string;
  age: number;
  sex: "M" | "F";
  next_appointments: string[];
  confirmed: boolean;
  complete_bio: boolean;
};

export type StateProps = {
  searchData: string;
  patients: Patient[];
  filtered: Patient[];
  selected: Patient | null;
  pagination: {
    index: number;
    perPage: number;
    totalPages: number;
    page: number;
    next: boolean;
    prev: boolean;
  };
};

export const patientsMock: Patient[] = [
  {
    id: 1,
    name: "Augustus",
    age: 61,
    sex: "M",
    next_appointments: [new Date("06/21/2023").toString()],
    doctor: "Dra. Daiane Odontoapp",
    confirmed: true,
    complete_bio: true,
  },
  {
    id: 2,
    name: "Tiberius",
    age: 64,
    sex: "M",
    next_appointments: [],
    doctor: "Dra. Daiane Odontoapp",
    confirmed: false,
    complete_bio: false,
  },
  {
    id: 3,
    name: "Publius Helvius Pertinax",
    age: 62,
    sex: "M",
    next_appointments: [],
    doctor: "Dra. Daiane Odontoapp",
    confirmed: true,
    complete_bio: true,
  },
  {
    id: 4,
    name: "Lucius Verus",
    age: 44,
    sex: "M",
    next_appointments: [],
    doctor: "Dra. Daiane Odontoapp",
    confirmed: false,
    complete_bio: true,
  },
  {
    id: 5,
    name: "Septimius Severus",
    age: 50,
    sex: "M",
    next_appointments: [],
    doctor: "Dra. Daiane Odontoapp",
    confirmed: false,
    complete_bio: false,
  },
  {
    id: 6,
    name: "Marcus Aurelius",
    age: 33,
    sex: "M",
    next_appointments: [],
    doctor: "Dra. Daiane Odontoapp",
    confirmed: true,
    complete_bio: true,
  },
  {
    id: 7,
    name: "Julius Caesar",
    age: 30,
    sex: "M",
    next_appointments: [],
    doctor: "Dra. Daiane Odontoapp",
    confirmed: false,
    complete_bio: false,
  },
  {
    id: 8,
    name: "Galerius Valerius Maximinus",
    age: 30,
    sex: "M",
    next_appointments: [],
    doctor: "Dra. Daiane Odontoapp",
    confirmed: false,
    complete_bio: true,
  },
];

export type ActionProps = {
  type: "SET_NEXT_PAGE" | "SET_PREV_PAGE" | "FILTER_DATA" | "SELECT_PATIENT";
  payload?: any;
};

const initialState = {
  searchData: "",
  patients: patientsMock,
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

function reducer(state: StateProps, action: ActionProps) {
  switch (action.type) {
    case "SET_NEXT_PAGE": {
      const nextPage = state.pagination.page + 1;
      const nextIndex = (nextPage - 1) * state.pagination.perPage;
      const nextFiltered = state.patients.slice(
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
      const prevFiltered = state.patients.slice(
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
      const filteredPatients =
        data !== ""
          ? state.patients.filter(
              (patient) =>
                patient.name.toLowerCase().includes(data.toLowerCase()) ||
                patient.doctor.toLowerCase().includes(data.toLowerCase()) ||
                patient.sex.toLowerCase().includes(data.toLowerCase())
            )
          : state.patients;
      const totalFilteredPages = Math.ceil(
        filteredPatients.length / state.pagination.perPage
      );
      const hasNext = totalFilteredPages > 1;
      const hasPrev = false;

      return {
        ...state,
        searchData: action.payload.data,
        filtered: filteredPatients.slice(0, state.pagination.perPage),
        pagination: {
          ...state.pagination,
          page: 1,
          totalPages: totalFilteredPages,
          next: hasNext,
          prev: hasPrev,
        },
      };
    }
    case "SELECT_PATIENT": {
      const {
        payload: { data },
      } = action;

      return {
        ...state,
        selected:
          state.patients.filter((patient) => patient.id === data)[0] || null,
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

type ProviderProps = {
  children: React.ReactNode;
};

const PatientsContext = createContext<ContextProps>({
  state: initialState,
  dispatch: () => null,
});

const PatientsContextProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    const firstSlice = init.patients.slice(
      init.pagination.index,
      init.pagination.perPage
    );

    return {
      ...init,
      filtered: firstSlice,
      pagination: {
        ...init.pagination,
        totalPages: Math.ceil(init.patients.length / init.pagination.perPage),
        next: firstSlice.length <= init.pagination.perPage,
      },
    };
  });

  return (
    <PatientsContext.Provider value={{ state, dispatch }}>
      {children}
    </PatientsContext.Provider>
  );
};

export { PatientsContextProvider, PatientsContext };
