"use client";

import { createContext, useReducer } from "react";
import { PaginationStateProps } from "@/app/_components/Pagination";
import {
  Patient,
  patientsMock,
} from "@/app/patients/_contexts/PatientsContext";

export type ProstheticsService = {
  id: number;
  patient: Patient;
  age: number;
  sex: "M" | "F";
  name: string;
  deadline: Date | number;
  formattedDate?: string;
  status: number;
  formattedStatus?: string;
  lab: string;
  confirmed: boolean;
};

export type StateProps = {
  searchData: string;
  services: ProstheticsService[];
  filtered: ProstheticsService[];
  pagination: PaginationStateProps;
};

export type ActionProps = {
  type: "SET_NEXT_PAGE" | "SET_PREV_PAGE" | "FILTER_DATA";
  payload?: any;
};

const mock: ProstheticsService[] = [
  {
    id: 1,
    patient: patientsMock[0],
    age: 61,
    sex: "M",
    name: "Facetas em dissilicato de lítio",
    deadline: new Date("2023-07-01T13:30:00.000Z"),
    lab: "Pucci Dental Lab",
    status: 1,
    confirmed: true,
  },
  {
    id: 2,
    patient: patientsMock[1],
    age: 64,
    sex: "M",
    name: "Coroa metalocerâmica sobre implante",
    deadline: new Date("2023-07-01T15:30:00.000Z"),
    lab: "Pucci Dental Lab",
    status: 2,
    confirmed: false,
  },
  {
    id: 3,
    patient: patientsMock[2],
    age: 62,
    sex: "M",
    name: "Adesiva",
    deadline: new Date("2023-07-01T16:30:00.000Z"),
    lab: "Pucci Dental Lab",
    status: 1,
    confirmed: true,
  },
  {
    id: 4,
    patient: patientsMock[3],
    age: 44,
    sex: "M",
    name: "Onlay/Inlay/Overlay",
    deadline: new Date("2023-07-02T18:30:00.000Z"),
    lab: "Pucci Dental Lab",
    status: 4,
    confirmed: false,
  },
  {
    id: 5,
    patient: patientsMock[4],
    age: 50,
    sex: "M",
    name: "Provisório",
    deadline: new Date("2023-07-03T19:30:00.000Z"),
    lab: "Pucci Dental Lab",
    status: 3,
    confirmed: false,
  },
  {
    id: 6,
    patient: patientsMock[5],
    age: 33,
    sex: "M",
    name: "Placa de clareamento",
    deadline: new Date("2023-07-03T20:30:00.000Z"),
    lab: "Pucci Dental Lab",
    status: 5,
    confirmed: true,
  },
  {
    id: 7,
    patient: patientsMock[6],
    age: 30,
    sex: "M",
    name: "Planejamento digital",
    deadline: new Date("2023-07-04T11:30:00.000Z"),
    lab: "Pucci Dental Lab",
    status: 2,
    confirmed: false,
  },
  {
    id: 8,
    patient: patientsMock[7],
    age: 39,
    sex: "M",
    name: "Mockup + guias de desgaste",
    deadline: new Date("2023-07-05T11:30:00.000Z"),
    lab: "Pucci Dental Lab",
    status: 2,
    confirmed: false,
  },
];

const initialState = {
  searchData: "",
  services: mock.map((service) => ({
    ...service,
    formattedDate: new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
    }).format(new Date(service.deadline)),
    formattedStatus:
      service.status === 1
        ? "Finished"
        : service.status === 2
        ? "Delayed"
        : service.status === 3
        ? "Adjustments"
        : service.status === 4
        ? "On progress"
        : "Canceled",
  })),
  filtered: [],
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
      const nextFiltered = state.services.slice(
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
      const prevFiltered = state.services.slice(
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
      const filteredServices =
        data !== ""
          ? state.services.filter(
              (service) =>
                service.patient.name
                  .toLowerCase()
                  .includes(data.toLowerCase()) ||
                service.name.toLowerCase().includes(data.toLowerCase()) ||
                service?.formattedDate
                  ?.toLowerCase()
                  .includes(data.toLowerCase()) ||
                service.sex.toLowerCase().includes(data.toLowerCase()) ||
                service.deadline.toString().includes(data) ||
                service.formattedStatus?.toLocaleLowerCase().includes(data)
            )
          : state.services;
      const totalFilteredPages = Math.ceil(
        filteredServices.length / state.pagination.perPage
      );
      const hasNext = totalFilteredPages > 1;
      const hasPrev = false;

      return {
        ...state,
        searchData: action.payload.data,
        filtered: filteredServices.slice(0, state.pagination.perPage),
        pagination: {
          ...state.pagination,
          page: 1,
          totalPages: totalFilteredPages,
          next: hasNext,
          prev: hasPrev,
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

const ProstheticsContext = createContext<ContextProps>({
  state: initialState,
  dispatch: () => null,
});

const ProstheticsContextProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    const firstSlice = init.services.slice(
      init.pagination.index,
      init.pagination.perPage
    );

    return {
      ...init,
      filtered: firstSlice,
      pagination: {
        ...init.pagination,
        totalPages: Math.ceil(init.services.length / init.pagination.perPage),
        next: firstSlice.length <= init.pagination.perPage,
      },
    };
  });

  return (
    <ProstheticsContext.Provider value={{ state, dispatch }}>
      {children}
    </ProstheticsContext.Provider>
  );
};

export { ProstheticsContextProvider, ProstheticsContext };
