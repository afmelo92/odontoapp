"use client";

import { useContext } from "react";
import { PatientsContext } from "../_contexts/PatientsContext";

export const usePatients = () => useContext(PatientsContext);
