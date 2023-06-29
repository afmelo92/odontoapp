"use client";

import { useContext } from "react";
import { ProstheticsContext } from "../_contexts/ProstheticsContext";

export const useProstheticsServices = () => useContext(ProstheticsContext);
