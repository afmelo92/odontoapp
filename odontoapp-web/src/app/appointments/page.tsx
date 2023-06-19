"use client";

import React, { useMemo, useReducer } from "react";
import Table from "./_components/Table";
import Header from "./_components/Header";

type StateProps = {
  searchData: string;
  appointments: Appointment[];
  filtered: Appointment[];
  pagination: {
    index: number;
    offset: number;
    perPage: number;
    page: number;
    next: boolean;
    prev: boolean;
  };
};

export type ActionProps = {
  type: "SET_NEXT_PAGE" | "SET_PREV_PAGE" | "FILTER_DATA";
  payload?: any;
};

function reducer(state: StateProps, action: ActionProps) {
  switch (action.type) {
    case "SET_NEXT_PAGE": {
      const nextIndex = state.pagination.index + state.pagination.perPage;
      const hasNext =
        nextIndex + state.pagination.perPage < state.filtered.length;

      return {
        ...state,
        filtered: state.appointments
          .filter(
            (appointment) =>
              appointment.patient
                .toLowerCase()
                .includes(state.searchData?.toLowerCase()) ||
              appointment.reason
                .toLowerCase()
                .includes(state.searchData?.toLowerCase()) ||
              appointment?.formattedDate
                ?.toLowerCase()
                .includes(state.searchData?.toLowerCase()) ||
              appointment.sex
                .toLowerCase()
                .includes(state.searchData?.toLowerCase()) ||
              appointment.date.toString().includes(state.searchData)
          )
          .slice(nextIndex, nextIndex + state.pagination.perPage),
        pagination: {
          ...state.pagination,
          index: state.pagination.index + state.pagination.offset,
          offset: state.pagination.offset + state.pagination.perPage,
          page: state.pagination.page + 1,
          next: hasNext,
        },
      };
    }
    case "SET_PREV_PAGE": {
      const prevIndex = state.pagination.index - state.pagination.perPage;
      const newOffset = state.pagination.offset - state.pagination.perPage;
      const hasPrev = prevIndex >= 0;

      return {
        ...state,
        filtered: state.appointments
          .filter(
            (appointment) =>
              appointment.patient
                .toLowerCase()
                .includes(state.searchData?.toLowerCase()) ||
              appointment.reason
                .toLowerCase()
                .includes(state.searchData?.toLowerCase()) ||
              appointment?.formattedDate
                ?.toLowerCase()
                .includes(state.searchData?.toLowerCase()) ||
              appointment.sex
                .toLowerCase()
                .includes(state.searchData?.toLowerCase()) ||
              appointment.date.toString().includes(state.searchData)
          )
          .slice(prevIndex, prevIndex + state.pagination.perPage),
        pagination: {
          ...state.pagination,
          index: prevIndex,
          offset: newOffset,
          page:
            (state.pagination.offset + state.pagination.perPage) /
            (state.pagination.index + state.pagination.offset),
        },
        prev: hasPrev,
      };
    }
    case "FILTER_DATA": {
      return {
        ...state,
        searchData: action.payload.data,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const AppointmentsPage: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log({ state });

  const filteredData = useMemo(
    () =>
      state.appointments.filter(
        (appointment) =>
          appointment.patient
            .toLowerCase()
            .includes(state.searchData?.toLowerCase()) ||
          appointment.reason
            .toLowerCase()
            .includes(state.searchData?.toLowerCase()) ||
          appointment?.formattedDate
            ?.toLowerCase()
            .includes(state.searchData?.toLowerCase()) ||
          appointment.sex
            .toLowerCase()
            .includes(state.searchData?.toLowerCase()) ||
          appointment.date.toString().includes(state.searchData)
      ),
    [state.appointments, state.searchData]
  );

  return (
    <>
      <h1 className="font-bold text-2xl text-gray-900">Appointments</h1>
      <div className="bg-white w-full h-full rounded-lg shadow-sm shadow-gray-500 flex flex-col gap-4">
        <Header searchData={state.searchData} dispatch={dispatch} />
        <Table data={state.filtered} dispatch={dispatch} />
      </div>
    </>
  );
};

export default AppointmentsPage;

export type Appointment = {
  id: number;
  patient: string;
  age: number;
  sex: "M" | "F";
  reason: string;
  date: Date | number;
  formattedDate?: string;
};

const mock: Appointment[] = [
  {
    id: 1,
    patient: "Vladmir Putin",
    age: 61,
    sex: "M",
    reason: "Canal",
    date: new Date("2023-06-16T13:30:00.000Z"),
  },
  {
    id: 2,
    patient: "Donald Trump",
    age: 64,
    sex: "M",
    reason: "Avaliação",
    date: new Date("2023-06-16T15:30:00.000Z"),
  },
  {
    id: 3,
    patient: "Jair Bolsonaro",
    age: 62,
    sex: "M",
    reason: "Extração",
    date: new Date("2023-06-16T16:30:00.000Z"),
  },
  {
    id: 4,
    patient: "Javier Milei",
    age: 44,
    sex: "M",
    reason: "Facetas",
    date: new Date("2023-06-16T18:30:00.000Z"),
  },
  {
    id: 5,
    patient: "Ron DeSantis",
    age: 50,
    sex: "M",
    reason: "Avaliação",
    date: new Date("2023-06-16T19:30:00.000Z"),
  },
  {
    id: 6,
    patient: "Marcus Aurelius",
    age: 33,
    sex: "M",
    reason: "Avaliação",
    date: new Date("2023-06-16T20:30:00.000Z"),
  },
];

const initialState = {
  searchData: "",
  appointments: mock.map((appointment) => ({
    ...appointment,
    formattedDate: new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
    }).format(new Date(appointment.date)),
  })),
  filtered: mock.map((appointment) => ({
    ...appointment,
    formattedDate: new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
    }).format(new Date(appointment.date)),
  })),
  pagination: {
    index: 0,
    offset: 6,
    perPage: 3,
    page: 1,
    next: true,
    prev: false,
  },
};
