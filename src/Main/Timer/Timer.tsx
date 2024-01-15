import React from "react";
import styles from './timer.module.css';
import { TimerHeader } from "./TimerHeader/TimerHeader";
import { TimerDisplay } from "./TimerDisplay/TimerDisplay";
import { useSelector } from "react-redux";
import { ITask, RootState } from "../../store";

export function Timer() {
    const task = useSelector<RootState, ITask | undefined>(state => state.tasks[0]);
    return (
        <div className={styles.timerWrap}>
            <TimerHeader titleTask={task ? task.name : ''} countPomodor={task ? task.countPomodor : ''} />
            <TimerDisplay
                taskId={task ? task.id : ''}
                titleTask={task ? task.name : ''}
                countPomodor={task ? task.countPomodor : 0} />
        </div>
    );
}