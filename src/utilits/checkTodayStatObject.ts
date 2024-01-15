import { Dispatch } from "react";
import { AnyAction } from "redux";
import { IDayStat, createNewStatisticDay } from "../store";
import { getCurrentDay } from "./getCurrentDay";

export function checkTodayStatObject(
    dispatch: Dispatch<AnyAction> = (value: AnyAction) => void 0,
    array: Array<IDayStat> | []) {
    const currentDate = getCurrentDay();
    const isDateExists = array.some((item) => item.date === currentDate);

    if (!isDateExists) {
        dispatch(createNewStatisticDay({
            date: currentDate,
            pomodorFinished: 0,
            timeOnPause: 0,
            countOfPauses: 0,
            timeOnTask: 0,
        }));
    }
}