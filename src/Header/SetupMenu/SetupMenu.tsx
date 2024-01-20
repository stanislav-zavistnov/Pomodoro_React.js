import React, { useRef } from "react";
import styles from './setupmenu.module.css';
import { useDispatch, useSelector } from "react-redux";
import { RootState, setLongBreakTimeLength, setPomodorLength, setShortBreakTimeLength } from "../../store";

interface Iprops {
    closeSetupMenu: () => void,
}

export function SetupMenu(props: Iprops) {
    const dispatch = useDispatch();
    const pomodoroLength = useSelector<RootState, number>(state => state.pomodorLength);
    const shortBreakLength = useSelector<RootState, number>(state => state.shortBreakTime);
    const longBreakLength = useSelector<RootState, number>(state => state.longBreakTime);
    const isEnglishLanguage = useSelector<RootState, boolean>(state => state.isEnglishChosen);
    const pomodorInputRef = useRef<HTMLInputElement>(null);
    const shortBreakInputRef = useRef<HTMLInputElement>(null);
    const longBreakInputRef = useRef<HTMLInputElement>(null);
    function convetTimeIntoMinute(time: number) {
        const result = time / 60000;
        return result;
    }
    function dispatchNewParameters() {
        if (pomodorInputRef.current) {
            const pomodorValue = +pomodorInputRef.current.value;
            pomodorValue <= 0
                ? dispatch(setPomodorLength(pomodoroLength))
                : dispatch(setPomodorLength(pomodorValue * 60000));
        }
        if (shortBreakInputRef.current) {
            const shortBreakValue = +shortBreakInputRef.current.value;
            shortBreakValue <= 0
                ? dispatch(setShortBreakTimeLength(shortBreakLength))
                : dispatch(setShortBreakTimeLength(shortBreakValue * 60000));
        }
        if (longBreakInputRef.current) {
            const longBreakValue = +longBreakInputRef.current.value;
            longBreakValue <= 0
                ? dispatch(setLongBreakTimeLength(longBreakLength))
                : dispatch(setLongBreakTimeLength(longBreakValue * 60000));
        }
    }
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        dispatchNewParameters();
        props.closeSetupMenu();
    }
    function dispatchDevModeParameters() {
        dispatch(setPomodorLength(4000));
        dispatch(setShortBreakTimeLength(3000));
        dispatch(setLongBreakTimeLength(7000));
    }
    function handleDevSubmit(e: React.FormEvent) {
        e.preventDefault();
        dispatchDevModeParameters();
        props.closeSetupMenu();
    }
    return (
        <div className={styles.setupWrap}>
            <p className={styles.setupTitle}>
                {isEnglishLanguage ? 'Settings' : 'Настройки'}
            </p>
            <form className={styles.setupForm}>
                <div className={styles.setupInputWrap}>
                    <p className={styles.setupForm__input_descr}>
                        {isEnglishLanguage ? 'Pomodor length' : 'Длительность помидора'}
                    </p>
                    <div className={styles.inputWrap}>
                        <input className={styles.setupForm__input}
                            ref={pomodorInputRef}
                            type='number'
                            defaultValue={convetTimeIntoMinute(pomodoroLength)} />
                        <p className={styles.setupForm__input_descr}>
                            {isEnglishLanguage ? 'min' : 'мин'}
                        </p>
                    </div>
                </div>
                <div className={styles.setupInputWrap}>
                    <p className={styles.setupForm__input_descr}>
                        {isEnglishLanguage ? 'Short break' : 'Короткий перерыв'}
                    </p>
                    <div className={styles.inputWrap}>
                        <input className={styles.setupForm__input}
                            ref={shortBreakInputRef}
                            type='number'
                            defaultValue={convetTimeIntoMinute(shortBreakLength)} />
                        <p className={styles.setupForm__input_descr}>
                            {isEnglishLanguage ? 'min' : 'мин'}
                        </p>
                    </div>
                </div>
                <div className={styles.setupInputWrap}>
                    <p className={styles.setupForm__input_descr}>
                        {isEnglishLanguage ? 'Long break' : 'Длинный перерыв'}
                    </p>
                    <div className={styles.inputWrap}>
                        <input className={styles.setupForm__input}
                            ref={longBreakInputRef}
                            type='number'
                            defaultValue={convetTimeIntoMinute(longBreakLength)} />
                        <p className={styles.setupForm__input_descr}>
                            {isEnglishLanguage ? 'min' : 'мин'}
                        </p>
                    </div>
                </div>
                <button className={`${styles.setupForm__button} btn-reset`} onClick={handleSubmit}>
                    {isEnglishLanguage ? 'Apply' : 'Применить'}
                </button>
            </form>
            <button className={`${styles.setupForm__button} ${styles.setupForm__button_dev} btn-reset`}
                onClick={handleDevSubmit}>
                Dev_mode
            </button>
            <button className={`${styles.closeSetupButton} btn-reset`} onClick={props.closeSetupMenu}></button>
        </div>
    );
}