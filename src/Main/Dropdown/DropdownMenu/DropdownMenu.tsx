import React, { useEffect, useRef, useState } from "react";
import styles from './dropdownmenu.module.css';
import { useDispatch, useSelector } from "react-redux";
import incrBtnIcon from '../../../assets/images/plus_btn.svg';
import decrBtnIcon from '../../../assets/images/minus_btn.svg';
import changeBtnIcon from '../../../assets/images/change_btn.svg';
import deleteBtnIcon from '../../../assets/images/delete_btn.svg';
import arrowUpIcon from '../../../assets/images/arrow-up.svg';
import arrowDownIcon from '../../../assets/images/arrow-down.svg';
import { IDayStat, RootState, decreasePomodorCount, increasePomodorCount, moveTaskDown, moveTaskUp, removeTask, setBreakTime, setTimerRun, updateCountShortBreak, updateTaskName } from "../../../store";
import cross from '../../../assets/images/close_window_btn.svg';
import { ClearAllSetIntervals } from "../../../utilits/clearAllSetIntarvals";
import { checkTodayStatObject } from "../../../utilits/checkTodayStatObject";

interface IDropdownProps {
    taskId: string;
    countPomodor: number;
    taskName: string;
}

export function DropdownMenu(props: IDropdownProps) {
    const dispatch = useDispatch();
    const statisticArray = useSelector<RootState, Array<IDayStat>>(state => state.statistics);
    const changeInputRef = useRef<HTMLInputElement | null>(null);
    const secondTaskExist = useSelector<RootState, boolean>(state => state.tasks[1] ? true : false);
    const [isNextTaskExist, setIsNextTaskExist] = useState(secondTaskExist);
    const [isOpenChange, setIsOpenChange] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isDeleteWindowOpen, setIsDeleteWindowOpen] = useState(false);
    const arraySetIntervalsIds = useSelector<RootState, Array<NodeJS.Timer>>(state => state.arraySetIntervalsIds);
    const isTimerRun = useSelector<RootState, boolean>(state => state.isTimerRun);
    const handleClearIntervals = () => {
        ClearAllSetIntervals(arraySetIntervalsIds);
        dispatch(setTimerRun(false));
    }
    const handleMoveUpTask = () => {
        ClearAllSetIntervals(arraySetIntervalsIds);
        dispatch(moveTaskUp(props.taskId));
    }
    const handleMoveDownTask = () => {
        ClearAllSetIntervals(arraySetIntervalsIds);
        dispatch(moveTaskDown(props.taskId));
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
        checkButtonDisabled();
    });
    useEffect(() => {
        setIsNextTaskExist(secondTaskExist ? true : false);
    }, [secondTaskExist]);
    const checkButtonDisabled = () => {
        if (props.countPomodor <= 1) {
            setIsButtonDisabled(true);
        } else {
            setIsButtonDisabled(false);
        }
    }
    const handleRemoveTask = () => {
        checkTodayStatObject(dispatch, statisticArray);
        checkNextTask();
        dispatch(removeTask(props.taskId));
    };
    const handleIncrementCountPomodor = (e: React.MouseEvent) => {
        checkTodayStatObject(dispatch, statisticArray);
        e.stopPropagation();
        dispatch(increasePomodorCount(props.taskId));
        if (props.countPomodor === 1) {
            setIsButtonDisabled(false);
        }
    };
    const handleDecrementCountPomodor = (e: React.MouseEvent) => {
        checkTodayStatObject(dispatch, statisticArray);
        e.stopPropagation();
        if (props.countPomodor > 1) {
            dispatch(decreasePomodorCount(props.taskId));
        }
        if (props.countPomodor === 2) {
            setIsButtonDisabled(true);
        }
    };
    const handleOpenChangeForm = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpenChange(true);
    }
    const handleChangeTaskName = (e: React.MouseEvent) => {
        checkTodayStatObject(dispatch, statisticArray);
        e.stopPropagation();
        if (changeInputRef.current) {
            if (changeInputRef.current.value) {
                dispatch(updateTaskName(props.taskId, changeInputRef.current.value));
                setIsOpenChange(false);
            }
        }
    }
    const handleCloseDeleteWindow = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDeleteWindowOpen(false)
    }
    const handleOpenDeleteWindow = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDeleteWindowOpen(true)
    }
    return (
        <div>
            <div className={styles.dropdownWrap}>
                <ul className={`list-reset ${styles.dropdownList}`}>
                    <li className={styles.dropdownList__item}>
                        <button
                            disabled={isTimerRun ? true : false}
                            className={`btn-reset ${styles.dropdownList__itemBtn} ${isTimerRun ? styles.disabledButton : ''}`}
                            onClick={handleIncrementCountPomodor}>
                            <img className={styles.dropdownList__itemImg} src={incrBtnIcon} alt="inrease" />
                            <p className={styles.dropdownList__itemText}>
                                Увеличить
                            </p>
                        </button>
                    </li>
                    <li className={styles.dropdownList__item}>
                        <button
                            className={`btn-reset ${styles.dropdownList__itemBtn} ${isButtonDisabled ? styles.disabledButton : ''}`}
                            onClick={handleDecrementCountPomodor}>
                            <img className={styles.dropdownList__itemImg} src={decrBtnIcon} alt="inrease" />
                            <p className={styles.dropdownList__itemText}>
                                Уменьшить
                            </p>
                        </button>
                    </li>
                    <li className={styles.dropdownList__item} onClick={handleOpenChangeForm}>
                        <button className={`btn-reset ${styles.dropdownList__itemBtn} ${styles.changeBtn}`}>
                            <img className={styles.dropdownList__itemImg} src={changeBtnIcon} alt="inrease" />
                            <p className={styles.dropdownList__itemText}>
                                Редактировать
                            </p>
                            {isOpenChange && (
                                <form className={styles.changeForm}>
                                    <input
                                        type="text"
                                        className={styles.changeInput}
                                        defaultValue={props.taskName}
                                        placeholder="Нужно назвать задачу"
                                        ref={changeInputRef} />
                                    <div className={styles.applyChangeBtn} onClick={handleChangeTaskName}>
                                        ок
                                    </div>
                                </form>
                            )}
                        </button>
                    </li>
                    <li className={styles.dropdownList__item}>
                        <button className={`btn-reset ${styles.dropdownList__itemBtn}`} onClick={handleMoveUpTask}>
                            <img className={styles.dropdownList__itemImg} src={arrowUpIcon} alt="move up" />
                            <p className={styles.dropdownList__itemText}>
                                Поднять
                            </p>
                        </button>
                    </li>
                    <li className={styles.dropdownList__item}>
                        <button className={`btn-reset ${styles.dropdownList__itemBtn}`} onClick={handleMoveDownTask}>
                            <img className={styles.dropdownList__itemImg} src={arrowDownIcon} alt="move down" />
                            <p className={styles.dropdownList__itemText}>
                                Опустить
                            </p>
                        </button>
                    </li>
                    <li className={styles.dropdownList__item}>
                        <button className={`btn-reset ${styles.dropdownList__itemBtn}`} onClick={handleOpenDeleteWindow}>
                            <img className={styles.dropdownList__itemImg} src={deleteBtnIcon} alt="inrease" />
                            <p className={styles.dropdownList__itemText}>
                                Удалить
                            </p>
                        </button>
                    </li>
                </ul>
            </div>
            {isDeleteWindowOpen && (
                <div className={styles.deleteMenuWrap}>
                    <div className={styles.deleteWindow}>
                        <button
                            className={`btn-reset ${styles.deleteWindow__closeButton}`}
                            onClick={handleCloseDeleteWindow}>
                            <img src={cross} alt="Закрыть окно" />
                        </button>
                        <p className={styles.deleteWindow__title}>
                            Удалить задачу?
                        </p>
                        <button
                            className={`btn-reset ${styles.deleteWindow__deleteBtn}`}
                            onClick={() => { handleRemoveTask(); handleClearIntervals() }}>
                            Удалить
                        </button>
                        <button
                            className={`btn-reset ${styles.deleteWindow__cancelBtn}`}
                            onClick={handleCloseDeleteWindow}>
                            Отмена
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}