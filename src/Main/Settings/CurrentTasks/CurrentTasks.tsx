import React from "react";
import styles from './currentTasks.module.css';
import { Task } from "./Task/Task";
import { useSelector } from "react-redux";
import { RootState, ITask } from "../../../store";

export function CurrentTasks() {
    const tasksArray = useSelector<RootState, Array<ITask>>(state => state.tasks);
    const isEnglishLanguage = useSelector<RootState, boolean>(state => state.isEnglishChosen);
    return (
        <ul className={`${styles.currentTasks} list-reset`}>
            {(tasksArray.length === 0) && (
                <li>
                    {isEnglishLanguage ? 'No tasks' : 'Заданий нет'}
                    
                </li>
            )}
            {tasksArray.map((index: ITask) => {
                return (
                    <Task key={index.id} data={index} />
                );
            })}
        </ul>
    );
}