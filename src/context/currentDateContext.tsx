import { createContext } from "react";
import { currentDateHook } from "../hooks/selectedDateHook";

export const CurrentDateContext = createContext<ReturnType<typeof currentDateHook>>({} as ReturnType<typeof currentDateHook>);
