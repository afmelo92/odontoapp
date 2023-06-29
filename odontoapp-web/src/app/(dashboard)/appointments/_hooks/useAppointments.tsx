"use client";

import { useContext } from "react";
import { AppointmentsContext } from "../_contexts/AppointmentsContext";

export const useAppointments = () => useContext(AppointmentsContext);
