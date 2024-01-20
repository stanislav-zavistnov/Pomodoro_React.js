import React, { useEffect, useState } from "react";
import styles from './timerDisplay.module.css';
import { useDispatch, useSelector } from "react-redux";
import {
    IDayStat, RootState, decreasePomodorCount, increasePomodorCount,
    removeTask, setBreakTime, setTimerRun, updateArraySetIntervalIds,
    updateBreakCurrentTime, updateCountShortBreak, updateStatisticPauseCount,
    updateStatisticPauseTime, updateStatisticPomodorCount,
    updateStatisticTasksTime, updateTaskCurrentTime
} from "../../../store";
import { convertTime } from "../../../utilits/convertTime";
import { ClearAllSetIntervals } from "../../../utilits/clearAllSetIntarvals";
import { checkTodayStatObject } from "../../../utilits/checkTodayStatObject";
import { getCurrentDay } from "../../../utilits/getCurrentDay";
import { playAlarmSound } from "../../../utilits/playAlarmSound";
import { showNotification } from "../../../utilits/showNotification";

interface ITimerDisplayProps {
    taskId: string,
    titleTask: string,
    countPomodor: number,
}

export function TimerDisplay(props: ITimerDisplayProps) {
    const dispatch = useDispatch();
    const statisticArray = useSelector<RootState, Array<IDayStat>>(state => state.statistics);
    const isTimerRun = useSelector<RootState, boolean>(state => state.isTimerRun);
    const isBreakTime = useSelector<RootState, boolean>(state => state.isBreakTime);
    const arraySetIntervalsIds = useSelector<RootState, Array<NodeJS.Timer>>(state => state.arraySetIntervalsIds);
    const [isTaskTrue, setIsTaskTrue] = useState(props.taskId ? true : false);
    const pomodorLength = useSelector<RootState, number>(state => state.pomodorLength);
    const shortBreakLength = useSelector<RootState, number>(state => state.shortBreakTime);
    const longBreakLength = useSelector<RootState, number>(state => state.longBreakTime);
    const countShortBreak = useSelector<RootState, number>(state => state.countShortBreak);
    const currentBreakTime = useSelector<RootState, number>(state => state.currentBreakTime);
    const currentTaskTime = useSelector<RootState, number>(state => state.tasks[0] ? state.tasks[0].currentTime : 0);
    const currentTaskPomodor = useSelector<RootState, number>(state => state.tasks[0] ? state.tasks[0].countPomodor : 0);
    const secondTaskExist = useSelector<RootState, boolean>(state => state.tasks[1] ? true : false);
    const isEnglishLanguage = useSelector<RootState, boolean>(state => state.isEnglishChosen);
    const [isNextTaskExist, setIsNextTaskExist] = useState(secondTaskExist);
    const [isShortBreak, setIsShortBreak] = useState(true);
    const handleIncrementCountPomodor = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(increasePomodorCount(props.taskId));
    };
    function setCurrentBreakTime() {
        if (countShortBreak === 3) {
            dispatch(updateBreakCurrentTime(longBreakLength));
        } else {
            dispatch(updateBreakCurrentTime(shortBreakLength));
        }
    }
    function timer() {
        ClearAllSetIntervals(arraySetIntervalsIds);
        checkTodayStatObject(dispatch, statisticArray);
        const currentDay = getCurrentDay();
        dispatch(setTimerRun(true));
        let t = currentTaskTime;
        const id = setInterval(() => {
            if (t === 0) {
                ClearAllSetIntervals([id]);
                dispatch(setTimerRun(false));
                dispatch(updateStatisticPomodorCount(currentDay));
                showNotification();
                playAlarmSound();
                if (currentTaskPomodor > 1) {
                    dispatch(decreasePomodorCount(props.taskId));
                    dispatch(setBreakTime(true));
                    setCurrentBreakTime();
                    dispatch(updateTaskCurrentTime(props.taskId, pomodorLength));
                } else {
                    checkNextTask();
                    dispatch(removeTask(props.taskId));
                }
            } else {
                t -= 1000;
                dispatch(updateStatisticTasksTime(currentDay));
                dispatch(updateTaskCurrentTime(props.taskId, t));
            }
        }, 1000);
        dispatch(updateArraySetIntervalIds(id));
    }
    function pauseTimer() {
        checkTodayStatObject(dispatch, statisticArray);
        const currentDay = getCurrentDay();
        dispatch(updateStatisticPauseCount(currentDay));
        const id = setInterval(() => {
            dispatch(updateStatisticPauseTime(currentDay));
        }, 1000);
        dispatch(updateArraySetIntervalIds(id));
    }
    function breakTimer() {
        ClearAllSetIntervals(arraySetIntervalsIds);
        dispatch(setTimerRun(true));
        let t = currentBreakTime;
        const id = setInterval(() => {
            if (t === 0) {
                if (countShortBreak === 3) {
                    dispatch(updateCountShortBreak(0));
                    dispatch(updateBreakCurrentTime(longBreakLength));
                    setIsShortBreak(false);
                } else {
                    dispatch(updateCountShortBreak(countShortBreak + 1));
                    dispatch(updateBreakCurrentTime(shortBreakLength));
                    setIsShortBreak(true);
                }
                ClearAllSetIntervals([id]);
                dispatch(setTimerRun(false));
                dispatch(setBreakTime(false));
                showNotification();
                playAlarmSound();
            } else {
                t -= 1000;
                dispatch(updateBreakCurrentTime(t));
            }
        }, 1000);
        dispatch(updateArraySetIntervalIds(id));
    }
    function pauseTheTimer() {
        ClearAllSetIntervals(arraySetIntervalsIds);
        dispatch(setTimerRun(false));
        pauseTimer();
    }
    function skipBreak() {
        ClearAllSetIntervals(arraySetIntervalsIds);
        if (countShortBreak === 3) {
            dispatch(updateCountShortBreak(0));
            dispatch(updateBreakCurrentTime(longBreakLength));
            setIsShortBreak(false);
        } else {
            dispatch(updateCountShortBreak(countShortBreak + 1));
            dispatch(updateBreakCurrentTime(shortBreakLength));
            setIsShortBreak(true);
        }
        dispatch(setTimerRun(false));
        dispatch(setBreakTime(false));
    }
    function skipCurrentTaskTime() {
        ClearAllSetIntervals(arraySetIntervalsIds);
        dispatch(setTimerRun(false));
        dispatch(updateTaskCurrentTime(props.taskId, pomodorLength));
    }
    function completeTask() {
        const currentDay = getCurrentDay();
        ClearAllSetIntervals(arraySetIntervalsIds);
        dispatch(setTimerRun(false));
        dispatch(setBreakTime(true));
        dispatch(updateStatisticPomodorCount(currentDay));
        checkNextTask();
        dispatch(removeTask(props.taskId));
    }
    function checkNextTask() {
        if (!isNextTaskExist) {
            dispatch(updateCountShortBreak(0));
            dispatch(setBreakTime(false));
        } else {
            dispatch(setBreakTime(true));
        };
    }
    useEffect(() => {
        setIsTaskTrue(props.taskId ? true : false);
        setIsNextTaskExist(secondTaskExist ? true : false);
    }, [props.taskId, secondTaskExist]);
    return (
        <div className={styles.timerDisplayWrap}>
            {/* ДИСПЛЕЙ И КНОПКА +_ПОМИДОР */}
            <div className={styles.currentTimeWrap}>
                <p className={styles.currentTime}>
                    {isTaskTrue ? (!isBreakTime ? convertTime(currentTaskTime) : convertTime(currentBreakTime)) : ''}
                </p>
                {isTaskTrue ?
                    <button
                        disabled={isTimerRun ? true : false}
                        className={`btn-reset ${styles.increaseButton} ${isTimerRun ? styles.disabled : ''}`}
                        onClick={handleIncrementCountPomodor} />
                    : ''}
            </div>
            {/* НАДПИСЬ ПОД ДИСПЛЕЕМ С ЗАДАЧЕЙ */}
            <div className={styles.timerDisplayDescrWrap}>
                <p className={styles.timerDisplayTitle}>
                    {isEnglishLanguage ? 'Task -\u00A0' : 'Задача -\u00A0'}
                </p>
                <p className={styles.timerDisplayDescr}>
                    {props.titleTask ? props.titleTask : isEnglishLanguage ? `\u00A0Create a task =)` : '\u00A0Создать задачу =)'}
                </p>
            </div>
            {/* КНОПКИ УПРАВЛЕНИЯ СТАРТ\СТОП\ПАУЗА\ПРОДОЛЖИТЬ */}
            {props.taskId && (
                <div className={styles.timerDisplayButtonsWrap}>
                    {isTimerRun
                        ? <button className={`btn-reset ${styles.startButton}`} onClick={pauseTheTimer}>
                            {isEnglishLanguage ? 'Pause' : 'Пауза'}
                        </button>
                        : (isBreakTime
                            ? <button className={`btn-reset ${styles.startButton}`} onClick={breakTimer}>
                                {isShortBreak
                                    ? (shortBreakLength === currentBreakTime
                                        ? isEnglishLanguage ? 'Start' : `Старт`
                                        : isEnglishLanguage ? 'Continue' : 'Продолжить')
                                    : (longBreakLength === currentBreakTime
                                        ? isEnglishLanguage ? 'Start' : `Старт`
                                        : isEnglishLanguage ? 'Continue' : 'Продолжить')}
                            </button>
                            : <button className={`btn-reset ${styles.startButton}`} onClick={timer}>
                                {pomodorLength === currentTaskTime
                                    ? isEnglishLanguage ? 'Start' : `Старт`
                                    : isEnglishLanguage ? 'Continue' : 'Продолжить'}
                            </button>
                        )};
                    {isBreakTime
                        ? <button
                            className={`btn-reset ${styles.stopButton} ${isTimerRun ? styles.stopButton__active : ''}`}
                            onClick={skipBreak}>
                            {isShortBreak
                                ? (shortBreakLength === currentBreakTime
                                    ? isEnglishLanguage ? 'Skip' : `Пропустить`
                                    : isEnglishLanguage ? 'Skip' : `Пропустить`)
                                : (longBreakLength === currentBreakTime
                                    ? isEnglishLanguage ? 'Skip' : `Пропустить`
                                    : isEnglishLanguage ? 'Skip' : `Пропустить`)}
                        </button>
                        : <button
                            className={`btn-reset ${styles.stopButton} ${isTimerRun ? styles.stopButton__active : ''}`}
                            onClick={pomodorLength !== currentTaskTime
                                ? (isTimerRun ? skipCurrentTaskTime : completeTask)
                                : skipCurrentTaskTime}>
                            {isTimerRun
                                ? isEnglishLanguage ? 'Stop' : 'Стоп'
                                : (pomodorLength !== currentTaskTime
                                    ? isEnglishLanguage ? 'Completed' : 'Сделано'
                                    : isEnglishLanguage ? 'Stop' : 'Стоп')}
                        </button>}
                </div>
            )}
        </div>
    );
}