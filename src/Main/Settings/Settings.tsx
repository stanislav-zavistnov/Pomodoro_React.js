import React from "react";
import styles from './settings.module.css';
import { Manual } from "./Manual/Manual";
import { TaskForm } from "./TaskForm/TaskForm";
import { CurrentTasks } from "./CurrentTasks/CurrentTasks";
import { TotalTime } from "./TotalTime/TotalTime";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

export function Settings() {
    const isEnglishLanguage = useSelector<RootState, boolean>(state => state.isEnglishChosen);
    return (
        <div className={styles.settingsWrap}>
            <h2 className={styles.settings__title}>
                {isEnglishLanguage ? 'Wow! You can start work now:' : 'Ура! Теперь можно начать работать:'}
            </h2>
            <Manual />
            <TaskForm />
            <CurrentTasks />
            <TotalTime />
        </div>
    );
}