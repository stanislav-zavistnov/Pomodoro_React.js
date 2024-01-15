import React from "react";
import styles from './task.module.css';
import { Dropdown } from "../../../Dropdown/Dropdown";
import { ITask } from "../../../../store";

interface IPropsData<T> {
    data: T
}

export function Task(props: IPropsData<ITask>) {
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    React.useEffect(() => setIsDropdownOpen(isDropdownOpen), [isDropdownOpen]);
    return (
        <li className={styles.task}>
            <div className={styles.taskText}>
                <p className={styles.task__count}>
                    {props.data.countPomodor}
                </p>
                <p className={styles.task__descr}>
                    {props.data.name}
                </p>
            </div>
            <Dropdown taskId={props.data.id} countPomodor={props.data.countPomodor} taskName={props.data.name}/>
        </li>
    );
}