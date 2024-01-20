import React, { ChangeEvent, useState } from "react";
import styles from './statistic.module.css';
import { StatMain } from "./StatMain/StatMain";
import { useSelector } from "react-redux";
import { IDayStat, RootState } from "../store";
import { getCurrentThisWeekDays } from "../utilits/getCurrentThisWeekDays";
import { getCurrentPreviousWeekDays } from "../utilits/getCurrentPreviousWeekDays";
import { getCurrentTwoWeekAgoDays } from "../utilits/getCurrentTwoWeekAgoDays";
import { mergeStatisticsWithZeroes } from "../utilits/mergeStatisticsWithZeroes";

export function Statistic() {
    const statisticArray = useSelector<RootState, Array<IDayStat>>(state => state.statistics);
    const [currentArray, setCurrentArray] = useState(mergeStatisticsWithZeroes(statisticArray, getCurrentThisWeekDays()));
    const isEnglishLanguage = useSelector<RootState, boolean>(state => state.isEnglishChosen);
    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        if (selectedValue === 'thisWeek') {
            const newWeekDays = getCurrentThisWeekDays();
            setCurrentArray(mergeStatisticsWithZeroes(statisticArray, newWeekDays));
        } else if (selectedValue === 'lastWeek') {
            const newWeekDays = getCurrentPreviousWeekDays();
            setCurrentArray(mergeStatisticsWithZeroes(statisticArray, newWeekDays));
        } else if (selectedValue === 'twoWeekAgo') {
            const newWeekDays = getCurrentTwoWeekAgoDays();
            setCurrentArray(mergeStatisticsWithZeroes(statisticArray, newWeekDays));
        }
    };
    return (
        <div className="container">
            <div className={styles.statHeaderWrap}>
                <p className={styles.statTitle}>
                    {isEnglishLanguage ? 'Your activity' : 'Ваша активность'}
                </p>
                <select className={styles.statSelect} onChange={handleSelectChange}>
                    <option value="thisWeek">
                        {isEnglishLanguage ? 'This week' : 'Эта неделя'}
                    </option>
                    <option value="lastWeek">
                        {isEnglishLanguage ? 'Last week' : 'Прошлая неделя'}
                    </option>
                    <option value="twoWeekAgo">
                        {isEnglishLanguage ? '2 weeks ago' : '2 недели назад'}
                    </option>
                </select>
            </div>
            <StatMain props={currentArray} />
        </div>
    );
}