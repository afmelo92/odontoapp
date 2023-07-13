"use client";
import { getUserPatients } from "@/services/queries";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useReducer,
  useState,
} from "react";
import { differenceInYears } from "date-fns";
import usePagination, {
  Pagination,
  initialPaginationState,
} from "@/app/_hooks/usePagination";

export type Patient = {
  uid: string;
  name: string;
  email: string;
  birth: string;
  cellphone: string;
  cpf: string;
  zip_code: string;
  doctor?: string;
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

export const patientsMock = [
  {
    uid: 1,
    name: "Augustus",
    age: 61,
    sex: "M",
    next_appointments: [new Date("06/21/2023").toString()],
    doctor: "Dra. Daiane Odontoapp",
    confirmed: true,
    complete_bio: true,
  },
  {
    uid: 2,
    name: "Tiberius",
    age: 64,
    sex: "M",
    next_appointments: [],
    doctor: "Dra. Daiane Odontoapp",
    confirmed: false,
    complete_bio: false,
  },
  {
    uid: 3,
    name: "Publius Helvius Pertinax",
    age: 62,
    sex: "M",
    next_appointments: [],
    doctor: "Dra. Daiane Odontoapp",
    confirmed: true,
    complete_bio: true,
  },
  {
    uid: 4,
    name: "Lucius Verus",
    age: 44,
    sex: "M",
    next_appointments: [],
    doctor: "Dra. Daiane Odontoapp",
    confirmed: false,
    complete_bio: true,
  },
  {
    uid: 5,
    name: "Septimius Severus",
    age: 50,
    sex: "M",
    next_appointments: [],
    doctor: "Dra. Daiane Odontoapp",
    confirmed: false,
    complete_bio: false,
  },
  {
    uid: 6,
    name: "Marcus Aurelius",
    age: 33,
    sex: "M",
    next_appointments: [],
    doctor: "Dra. Daiane Odontoapp",
    confirmed: true,
    complete_bio: true,
  },
  {
    uid: 7,
    name: "Julius Caesar",
    age: 30,
    sex: "M",
    next_appointments: [],
    doctor: "Dra. Daiane Odontoapp",
    confirmed: false,
    complete_bio: false,
  },
  {
    uid: 8,
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
  patients: [],
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
                // patient.doctor.toLowerCase().includes(data.toLowerCase()) ||
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
          state.patients.filter((patient) => patient.uid === data)[0] || null,
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
  patients: Patient[];
  queryReturn: UseQueryResult<any, unknown> | null;
  filtered: Patient[];
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setNextPage: () => void;
  setPrevPage: () => void;
  pagination: Pagination;
  hasNext: boolean;
  hasPrev: boolean;
  totalPages: number;
};

type QueryResponse = {
  message: string;
  data: {
    uid: string;
    name: string;
    patients: Patient[];
  };
};

type ProviderProps = {
  children: React.ReactNode;
};

const PatientsContext = createContext<ContextProps>({
  state: initialState,
  dispatch: () => null,
  queryReturn: null,
  patients: [],
  filtered: [],
  searchValue: "",
  setSearchValue: (prev) => prev,
  setNextPage: () => null,
  setPrevPage: () => null,
  pagination: {
    ...initialPaginationState,
  },
  hasNext: true,
  hasPrev: false,
  totalPages: 1,
});

const PatientsContextProvider = ({ children }: ProviderProps) => {
  const session = useSession();

  const userData = session.data?.user || null;

  const [searchValue, setSearchValue] = useState("");

  const queryReturn = useQuery<QueryResponse, Error>({
    queryKey: ["get-patients", userData?.id, userData?.accessToken],
    queryFn: async () => {
      return getUserPatients({
        user_id: userData?.id || "",
        user_token: userData?.accessToken || "",
      });
    },
    select: (data) => {
      return {
        ...data,
        data: {
          ...data.data,
          patients: data?.data.patients.map((patient) => ({
            ...patient,
            sex: patient.sex ? "M" : "F",
            birth: new Date(patient.birth).toISOString(),
            age: differenceInYears(new Date(), new Date(patient.birth)),
            doctor: data.data.name,
          })),
        },
      };
    },
  });

  const filterFn = useCallback(
    (patient: Patient) =>
      patient.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchValue.toLowerCase()) ||
      patient.doctor?.toLowerCase().includes(searchValue.toLowerCase()) ||
      patient.sex.toLowerCase().includes(searchValue.toLowerCase()),
    [searchValue]
  );

  const patients = queryReturn.data?.data.patients || [];

  const {
    slicedData,
    setNextPage,
    setPrevPage,
    pagination,
    hasNext,
    hasPrev,
    totalPages,
  } = usePagination({
    data: patients,
    filterFn,
  });

  // reducer logic
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
        next: firstSlice.length < init.pagination.perPage,
      },
    };
  });

  return (
    <PatientsContext.Provider
      value={{
        state,
        dispatch,
        patients: patients,
        queryReturn,
        filtered: slicedData,
        searchValue,
        setSearchValue,
        setNextPage,
        setPrevPage,
        pagination,
        hasNext,
        hasPrev,
        totalPages,
      }}
    >
      {children}
    </PatientsContext.Provider>
  );
};

export { PatientsContextProvider, PatientsContext };
