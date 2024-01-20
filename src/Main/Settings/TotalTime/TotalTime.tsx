import React, { useEffect, useState } from "react";
import styles from './totalTime.module.css';
import { useSelector } from "react-redux";
import { ITask, RootState } from "../../../store";
import { formattedMilliseconds } from "../../../utilits/formattedMilliseconds";

export function TotalTime() {
    const tasksArray = useSelector<RootState, Array<ITask>>(state => state.tasks);
    const pomodoroLength = useSelector<RootState, number>(state => state.pomodorLength);
    const isEnglishLanguage = useSelector<RootState, boolean>(state => state.isEnglishChosen);
    const [currentRemainingTime, setCurrentRemainingTime] = useState(0);
    useEffect(() => {
        if (!tasksArray[0]) {
            setCurrentRemainingTime(0);
        }
        function getRemainingTime() {
            if (tasksArray.length !== 0) {
                let newRemainingTime = 0;
                tasksArray.forEach((item) => {
                    const pomodorCountMultiplyPomodorLength = (item.countPomodor - 1) * pomodoroLength;
                    newRemainingTime += item.currentTime + pomodorCountMultiplyPomodorLength;
                });
                setCurrentRemainingTime(newRemainingTime);
            }
        }

        getRemainingTime();
    }, [tasksArray, pomodoroLength]);
    return (
        <span className={styles.totalTime}>
            {formattedMilliseconds(currentRemainingTime, isEnglishLanguage)}
        </span>
    );
}