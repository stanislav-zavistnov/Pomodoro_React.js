import React from "react";
import styles from './manual.module.css';

export function Manual() {
    return (
        <div className={styles.manual}>
            <ul className={`list-reset ${styles.manualList}`}>
                <li className={styles.manualList__item}>
                    Выберите категорию и напишите название текущей задачи
                </li>
                <li className={styles.manualList__item}>
                    Запустите таймер «помидор»
                </li>
                <li className={styles.manualList__item}>
                    Работайте пока «помидор» не прозвонит
                </li>
                <li className={styles.manualList__item}>
                    Сделайте короткий перерыв 3-5 минут
                </li>
                <li className={styles.manualList__item}>
                    Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена.
                    Каждые 4 «помидора» делайте длинный перерыв 15-30 минут.
                </li>
            </ul>
        </div>
    );
}