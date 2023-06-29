"use client";

import { PaginationStateProps } from "@/app/_components/Pagination";
import {
  Patient,
  patientsMock,
} from "@/app/(dashboard)/patients/_contexts/PatientsContext";
import { createContext, useReducer } from "react";

export type Appointment = {
  id: number;
  patient: Patient;
  age: number;
  sex: "M" | "F";
  reason: string;
  date: Date | number;
  formattedDate?: string;
  confirmed: boolean;
};

export type StateProps = {
  searchData: string;
  appointments: Appointment[];
  filtered: Appointment[];
  pagination: PaginationStateProps;
};

const mock: Appointment[] = [
  {
    id: 1,
    patient: patientsMock[0],
    age: 61,
    sex: "M",
    reason: "Canal",
    date: new Date("2023-06-16T13:30:00.000Z"),
    confirmed: true,
  },
  {
    id: 2,
    patient: patientsMock[1],
    age: 64,
    sex: "M",
    reason: "Avaliação",
    date: new Date("2023-06-16T15:30:00.000Z"),
    confirmed: true,
  },
  {
    id: 3,
    patient: patientsMock[2],
    age: 62,
    sex: "M",
    reason: "Extração",
    date: new Date("2023-06-16T16:30:00.000Z"),
    confirmed: true,
  },
  {
    id: 4,
    patient: patientsMock[3],
    age: 44,
    sex: "M",
    reason: "Facetas",
    date: new Date("2023-06-16T18:30:00.000Z"),
    confirmed: false,
  },
  {
    id: 5,
    patient: patientsMock[4],
    age: 50,
    sex: "M",
    reason: "Avaliação",
    date: new Date("2023-06-16T19:30:00.000Z"),
    confirmed: false,
  },
  {
    id: 6,
    patient: patientsMock[5],
    age: 33,
    sex: "M",
    reason: "Avaliação",
    date: new Date("2023-06-16T20:30:00.000Z"),
    confirmed: true,
  },
  {
    id: 7,
    patient: patientsMock[5],
    age: 30,
    sex: "M",
    reason: "Harmonização facial",
    date: new Date("2023-06-17T11:30:00.000Z"),
    confirmed: false,
  },
  {
    id: 8,
    patient: patientsMock[6],
    age: 39,
    sex: "M",
    reason: "Harmonização facial",
    date: new Date("2023-06-30T11:30:00.000Z"),
    confirmed: false,
  },
];

export type ActionProps = {
  type: "SET_NEXT_PAGE" | "SET_PREV_PAGE" | "FILTER_DATA";
  payload?: any;
};

const initialState = {
  searchData: "",
  appointments: mock.map((appointment) => ({
    ...appointment,
    formattedDate: new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
    }).format(new Date(appointment.date)),
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
      const nextFiltered = state.appointments.slice(
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
      const prevFiltered = state.appointments.slice(
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
          ? state.appointments.filter(
              (appointment) =>
                appointment.patient.name
                  .toLowerCase()
                  .includes(data.toLowerCase()) ||
                appointment.reason.toLowerCase().includes(data.toLowerCase()) ||
                appointment?.formattedDate
                  ?.toLowerCase()
                  .includes(data.toLowerCase()) ||
                appointment.sex.toLowerCase().includes(data.toLowerCase()) ||
                appointment.date.toString().includes(data)
            )
          : state.appointments;
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

const AppointmentsContext = createContext<ContextProps>({
  state: initialState,
  dispatch: () => null,
});

const AppointmentsContextProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    const firstSlice = init.appointments.slice(
      init.pagination.index,
      init.pagination.perPage
    );

    return {
      ...init,
      filtered: firstSlice,
      pagination: {
        ...init.pagination,
        totalPages: Math.ceil(
          init.appointments.length / init.pagination.perPage
        ),
        next: firstSlice.length <= init.pagination.perPage,
      },
    };
  });

  return (
    <AppointmentsContext.Provider value={{ state, dispatch }}>
      {children}
    </AppointmentsContext.Provider>
  );
};

export { AppointmentsContextProvider, AppointmentsContext };
