import React from "react";
import styles from './settings.module.css';
import { Manual } from "./Manual/Manual";
import { TaskForm } from "./TaskForm/TaskForm";
import { CurrentTasks } from "./CurrentTasks/CurrentTasks";
import { TotalTime } from "./TotalTime/TotalTime";

export function Settings() {
    return (
        <div className={styles.settingsWrap}>
            <h2 className={styles.settings__title}>
                Ура! Теперь можно начать работать:
            </h2>
            <Manual />
            <TaskForm />
            <CurrentTasks />
            <TotalTime />
        </div>
    );
}