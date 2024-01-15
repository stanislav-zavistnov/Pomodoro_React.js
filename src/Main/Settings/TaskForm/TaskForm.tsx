import React, { FormEvent, useRef, useState } from "react";
import styles from './taskForm.module.css';
import { useDispatch, useSelector } from "react-redux";
import { IDayStat, ITask, RootState, createNewTask } from "../../../store";
import { generateRandomString } from "../../../utilits/generateRandomString";
import { checkTodayStatObject } from "../../../utilits/checkTodayStatObject";

export function TaskForm() {
    const dispatch = useDispatch();
    const statisticArray = useSelector<RootState, Array<IDayStat>>(state => state.statistics);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [valid, setValid] = useState(true);
    const pomodorLength = useSelector<RootState, number>(state => state.pomodorLength)
    function handleChange() {
        if (inputRef.current) {
            if (inputRef.current.value) {
                setValid(true);
            } else {
                inputRef.current.placeholder = 'Введите название задачи';
            }
        }
    }
    function handleSubmit(e: FormEvent) {
        checkTodayStatObject(dispatch, statisticArray);
        e.preventDefault();
        if (inputRef.current) {
            if (inputRef.current.value) {
                const objectTask: ITask = {
                    id: generateRandomString(),
                    is_Done: false,
                    name: inputRef.current.value,
                    countPomodor: 1,
                    successedPomodor: 0,
                    currentTime: pomodorLength,
                    setIntervalId: [],
                }
                dispatch(createNewTask(objectTask));
                inputRef.current.value = '';
                inputRef.current.placeholder = 'Введите название задачи';
                setValid(true);
            } else {
                inputRef.current.placeholder = 'Задача должна иметь любое название';
                setValid(false);
            }
        }
    }
    return (
        <div className={styles.taskFormWrap}>
            <form className={styles.taskForm} onSubmit={handleSubmit}>
                <input
                    className={`${styles.taskForm__input} ${valid ? '' : styles.placeholderStyle}`}
                    type="text"
                    placeholder="Введите название задачи"
                    ref={inputRef}
                    onChange={handleChange} />
                <button className={`${styles.taskForm__btn} btn-reset`} >
                    Добавить
                </button>
            </form>
        </div>
    );
}