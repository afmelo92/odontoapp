"use client";

import { useContext } from "react";
import { AppointmentsContext } from "../_contexts/AppointmentContext";

export const useAppointments = () => useContext(AppointmentsContext);
