import React from "react";
import styles from './manual.module.css';
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export function Manual() {
    const isEnglishLanguage = useSelector<RootState, boolean>(state => state.isEnglishChosen);
    return (
        <div className={styles.manual}>
            <ul className={`list-reset ${styles.manualList}`}>
                <li className={styles.manualList__item}>
                    {isEnglishLanguage
                        ? 'Choose a category and name current task'
                        : 'Выберите категорию и напишите название текущей задачи'}
                </li>
                <li className={styles.manualList__item}>
                    {isEnglishLanguage ? 'Start "pomodoro" timer' : 'Запустите таймер «помидор»'}
                </li>
                <li className={styles.manualList__item}>
                    {isEnglishLanguage ? 'Work till "pomodoro" timer goes off' : 'Работайте пока «помидор» не прозвонит'}
                </li>
                <li className={styles.manualList__item}>
                    {isEnglishLanguage ? 'Take a short break of 3-5 minutes' : 'Сделайте короткий перерыв 3-5 минут'}
                </li>
                <li className={styles.manualList__item}>
                    {isEnglishLanguage
                        ? `Continue doing "pomodoro" after "pomodoro" until the task is completed.
                        Every 4 pomodoros, take a long break of 15-30 minutes.`
                        : `Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. 
                        Каждые 4 «помидора» делайте длинный перерыв 15-30 минут.`}
                </li>
            </ul>
        </div>
    );
}