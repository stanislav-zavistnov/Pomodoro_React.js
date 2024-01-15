import React from "react";
import styles from './statheader.module.css';

export function StatHeader() {
    return (
        <div className={styles.statHeaderWrap}>
            <p className={styles.statTitle}>
                Ваша активность
            </p>
            <select className={styles.statSelect}>
                <option value="thisWeek">
                    Эта неделя
                </option>
                <option value="lastWeek">
                    Прошлая неделя
                </option>
                <option value="twoWeekAgo">
                    2 недели назад
                </option>
            </select>
        </div>
    );
}