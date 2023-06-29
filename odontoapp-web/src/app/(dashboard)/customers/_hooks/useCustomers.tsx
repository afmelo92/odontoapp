"use client";

import { useContext } from "react";
import { CustomersContext } from "../_contexts/CustomersContext";

export const useCustomers = () => useContext(CustomersContext);
