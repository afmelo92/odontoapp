"use client";

import { useContext } from "react";
import { PatientsContext } from "../_contexts/PatientContext";

export const usePatients = () => useContext(PatientsContext);
