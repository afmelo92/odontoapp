"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useReducer,
  useState,
} from "react";
import usePagination, {
  Pagination,
  initialPaginationState,
} from "@/app/_hooks/usePagination";
import { useSession } from "next-auth/react";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { getUserProstheticOrders } from "@/services/queries";
import { formatOrderStatus } from "@/utils";

export type ProstheticsService = {
  id: number;
  uid: string;
  patient_uid: string;
  dentist_name: string | null;
  patient_name: string | null;
  dentist_clinic: string | null;
  dentist_uid: string | null;
  lab_uid: string;
  description: string | null;
  service_name: string;
  service_material: string | null;
  service_color: string | null;
  service_deadline: string;
  delivered_at: string | null;
  status: number;
  formattedStatus?: string;
  elements: number[];
  sequence: number | null;
  master_uid: string | null;
  total: number;
  createdAt: string;
  updatedAt: string;
  lab: {
    name: string | null;
  };
  dentist: {
    name: string | null;
  };
  patient: {
    name: string | null;
  };
};

export type StateProps = {
  searchData: string;
  orders: ProstheticsService[];
  filtered: ProstheticsService[];
  selected: ProstheticsService | null;
  pagination: {
    index: number;
    perPage: number;
    totalPages: number;
    page: number;
    next: boolean;
    prev: boolean;
  };
};

export type ActionProps = {
  type: "SET_NEXT_PAGE" | "SET_PREV_PAGE" | "SELECT_ORDER";
  payload?: any;
};

const initialState = {
  searchData: "",
  orders: [],
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
      const nextFiltered = state.orders.slice(
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
      const prevFiltered = state.orders.slice(
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
    case "SELECT_ORDER": {
      const {
        payload: { data },
      } = action;

      return {
        ...state,
        selected: state.orders.filter((order) => order.uid === data)[0] || null,
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
  orders: ProstheticsService[];
  queryReturn: UseQueryResult<any, unknown> | null;
  filtered: ProstheticsService[];
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setNextPage: () => void;
  setPrevPage: () => void;
  pagination: Pagination;
  hasNext: boolean;
  hasPrev: boolean;
  totalPages: number;
};

type ProviderProps = {
  children: React.ReactNode;
};

const ProstheticsContext = createContext<ContextProps>({
  state: initialState,
  dispatch: () => null,
  queryReturn: null,
  orders: [],
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

type QueryResponse = {
  message: string;
  data: ProstheticsService[];
};

const ProstheticsContextProvider = ({ children }: ProviderProps) => {
  const session = useSession();
  const userData = session.data?.user || null;
  const [searchValue, setSearchValue] = useState("");

  const queryReturn = useQuery<QueryResponse, Error>({
    queryKey: ["get-prosthetics-orders", userData?.id, userData?.accessToken],
    queryFn: async () => {
      return getUserProstheticOrders({
        user_token: userData?.accessToken || "",
      });
    },
    select: (data) => {
      return {
        message: data.message,
        data: data.data.map((order) => ({
          ...order,
          service_deadline: new Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "short",
            weekday: "short",
          }).format(new Date(order.service_deadline)),
          formattedStatus: formatOrderStatus(order.status),
        })),
      };
    },
  });

  const filterFn = useCallback(
    (order: ProstheticsService) =>
      order.dentist_name?.toLowerCase().includes(searchValue.toLowerCase()) ||
      order.dentist?.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
      order.patient?.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
      order.patient_name?.toLowerCase().includes(searchValue.toLowerCase()) ||
      order.dentist_clinic?.toLowerCase().includes(searchValue.toLowerCase()) ||
      order.lab.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
      order.service_name.toLowerCase().includes(searchValue.toLowerCase()) ||
      order.service_material
        ?.toLowerCase()
        .includes(searchValue.toLowerCase()) ||
      order.formattedStatus
        ?.toLowerCase()
        .includes(searchValue.toLowerCase()) ||
      order.service_deadline.toLowerCase().includes(searchValue.toLowerCase()),
    [searchValue]
  );

  const orders = queryReturn.data?.data || [];

  const {
    slicedData,
    setNextPage,
    setPrevPage,
    pagination,
    hasNext,
    hasPrev,
    totalPages,
  } = usePagination({
    data: orders,
    filterFn,
  });

  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    const firstSlice = init.orders.slice(
      init.pagination.index,
      init.pagination.perPage
    );

    return {
      ...init,
      filtered: firstSlice,
      pagination: {
        ...init.pagination,
        totalPages: Math.ceil(init.orders.length / init.pagination.perPage),
        next: firstSlice.length <= init.pagination.perPage,
      },
    };
  });

  return (
    <ProstheticsContext.Provider
      value={{
        state,
        dispatch,
        queryReturn,
        searchValue,
        setSearchValue,
        orders,
        filtered: slicedData,
        setNextPage,
        setPrevPage,
        pagination,
        hasNext,
        hasPrev,
        totalPages,
      }}
    >
      {children}
    </ProstheticsContext.Provider>
  );
};

export { ProstheticsContextProvider, ProstheticsContext };
