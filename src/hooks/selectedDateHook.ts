import { useState } from "react";

export const currentDateHook = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    return { currentDate, setCurrentDate };
};
