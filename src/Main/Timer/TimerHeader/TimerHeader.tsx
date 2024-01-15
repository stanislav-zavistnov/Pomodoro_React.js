import React from "react";
import styles from './timerHeader.module.css';
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface ITimerProps {
    titleTask: string | '',
    countPomodor: number | '',
}

export function TimerHeader(props: ITimerProps) {
    const isTimerRun = useSelector<RootState, boolean>(state => state.isTimerRun);
    const isBreakTime = useSelector<RootState, boolean>(state => state.isBreakTime);
    return (
        <div className={`${styles.timerHeader} ${isTimerRun ? `${styles.timerHeader__active}` : ''}`}>
            <p className={styles.timerHeader__title}>
                {props.titleTask ? props.titleTask : 'нет задач'}
            </p>
            <p className={styles.timerHeader__current}>
                {isBreakTime ? 'Перерыв' : `Осталось помидор ${props.countPomodor ? props.countPomodor : ''}`}
            </p>
        </div>
    );
}