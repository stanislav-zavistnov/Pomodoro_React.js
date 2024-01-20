import React, { useState } from "react";
import styles from './statmain.module.css';
import pomodorIcon from '../../assets/images/pomodor.svg';
import focusIcon from '../../assets/images/focus.svg';
import pauseTime from '../../assets/images/pauseTime.svg';
import pauseCount from '../../assets/images/pauseCount.svg';
import { IDayStat, RootState } from "../../store";
import { secondsToMinutes } from "../../utilits/secondsToMinutes";
import { useSelector } from "react-redux";

interface IPropsData {
    props: Array<IDayStat>
}

export function StatMain(props: IPropsData) {
    const [currentDayTaskTime, setCurrenDayTaskTime] = useState(secondsToMinutes(props.props[0].timeOnTask));
    const [currentDayPomodor, setCurrentDayPomodor] = useState(props.props[0].pomodorFinished);
    const mondayFocus = Math.round((1 - (props.props[0].timeOnPause / props.props[0].timeOnTask)) * 100);
    const [currentDayFocus, setCurrentDayFocus] = useState(mondayFocus ? mondayFocus : 0);
    const [currentDayTimeOnPause, setCurrentDayTimeOnPause] = useState(secondsToMinutes(props.props[0].timeOnPause));
    const [currentDayPauseCount, setCurrentDayPauseCount] = useState(props.props[0].countOfPauses);
    const isEnglishLanguage = useSelector<RootState, boolean>(state => state.isEnglishChosen);
    const [currentDay, setCurrentDay] = useState(isEnglishLanguage ? 'Monday' : 'Понедельник');

    function changeCurrentDay(day: string, index: number) {
        setCurrentDay(day);
        setCurrenDayTaskTime(secondsToMinutes(props.props[index].timeOnTask));
        setCurrentDayPomodor(props.props[index].pomodorFinished);
        const focus = Math.round((1 - (props.props[index].timeOnPause / props.props[index].timeOnTask)) * 100);
        setCurrentDayFocus(focus ? focus : 0);
        setCurrentDayTimeOnPause(secondsToMinutes(props.props[index].timeOnPause));
        setCurrentDayPauseCount(props.props[index].countOfPauses);
    }

    function setDiagramHeight(day: string, index: number) {
        const timeOnTask = props.props[index].timeOnTask;
        if (timeOnTask) {
            return { height: `${timeOnTask * 0.011764}%`, backgroundColor: `${currentDay === day ? 'var(--red)' : 'var(--red_column)'}` }
        } else {
            return { height: '5px', backgroundColor: `${currentDay === day ? 'var(--red)' : 'var(--grey_c4)'}` }
        }
    }
    return (
        <div className={styles.statMainWrap}>
            <div className={styles.statMainDay}>
                <p className={styles.statMainDay__title}>
                    {currentDay}
                </p>
                <p className={styles.statMainDay__descr}>
                    {isEnglishLanguage ? 'Total worktime\u00A0' : 'Вы работали над задачами в\u00A0'}&nbsp;
                    <span className={styles.statMainDay__descr_accent}>{isEnglishLanguage
                        ? `${currentDayTaskTime} min`
                        : `течение ${currentDayTaskTime} мин`}</span>
                </p>
            </div>
            <div className={styles.statPomodor}>
                <div className={styles.statPomodor__info}>
                    <img className={styles.statPomodor__info_icon} src={pomodorIcon} alt="pomodor" />
                    <p className={styles.statPomodor__info_count}>
                        {currentDayPomodor ? `x ${currentDayPomodor}` : ''}
                    </p>
                </div>
                <div className={styles.statPomodor__titleWrap}>
                    <p className={styles.statPomodor__titleWrap__title}>
                        {currentDayPomodor
                            ? `${currentDayPomodor} ${isEnglishLanguage ? 'pomodor' : 'помидора'}`
                            : `0 ${isEnglishLanguage ? 'pomodor' : 'помидор'}`}
                    </p>
                </div>
            </div>
            <div className={styles.statDiagram}>
                <div className={styles.statDiagram__line_one}>
                    <span className={styles.statDiagram__line_one_line}></span>
                    <span className={styles.statDiagram__line_one_descr}>
                        1 {isEnglishLanguage ? 'h' : 'ч'} 40 {isEnglishLanguage ? 'min' : 'мин'}
                    </span>
                </div>
                <div className={styles.statDiagram__line_two}>
                    <span className={styles.statDiagram__line_one_line}></span>
                    <span className={styles.statDiagram__line_one_descr}>
                        1 {isEnglishLanguage ? 'h' : 'ч'} 15 {isEnglishLanguage ? 'min' : 'мин'}
                    </span>
                </div>
                <div className={styles.statDiagram__line_three}>
                    <span className={styles.statDiagram__line_one_line}></span>
                    <span className={styles.statDiagram__line_one_descr}>
                        50 {isEnglishLanguage ? 'min' : 'мин'}
                    </span>
                </div>
                <div className={styles.statDiagram__line_four}>
                    <span className={styles.statDiagram__line_one_line}></span>
                    <span className={styles.statDiagram__line_one_descr}>
                        25 {isEnglishLanguage ? 'min' : 'мин'}
                    </span>
                </div>
                <div className={styles.statDiagram__bottom}></div>
                <div className={styles.statDiagram__diagram}>
                    <p className={`${styles.statDiagram__diagram_monday_descr} ${styles.diagramDay} ${currentDay === 'Понедельник' || 'Monday' ? styles.activeDay : ''}`}>
                        {isEnglishLanguage ? 'Mon' : 'Пн'}
                    </p>
                    <p className={`${styles.statDiagram__diagram_tuesday_descr} ${styles.diagramDay} ${currentDay === 'Вторник' ? styles.activeDay : ''}`}>
                        {isEnglishLanguage ? 'Tue' : 'Вт'}
                    </p>
                    <p className={`${styles.statDiagram__diagram_wednesday_descr} ${styles.diagramDay} ${currentDay === 'Среда' ? styles.activeDay : ''}`}>
                        {isEnglishLanguage ? 'Wed' : 'Ср'}
                    </p>
                    <p className={`${styles.statDiagram__diagram_thursday_descr} ${styles.diagramDay} ${currentDay === 'Четверг' ? styles.activeDay : ''}`}>
                        {isEnglishLanguage ? 'Thu' : 'Чт'}
                    </p>
                    <p className={`${styles.statDiagram__diagram_friday_descr} ${styles.diagramDay} ${currentDay === 'Пятница' ? styles.activeDay : ''}`}>
                        {isEnglishLanguage ? 'Fri' : 'Пт'}
                    </p>
                    <p className={`${styles.statDiagram__diagram_saturday_descr} ${styles.diagramDay} ${currentDay === 'Суббота' ? styles.activeDay : ''}`}>
                        {isEnglishLanguage ? 'Sat' : 'Сб'}
                    </p>
                    <p className={`${styles.statDiagram__diagram_sunday_descr} ${styles.diagramDay} ${currentDay === 'Воскресенье' ? styles.activeDay : ''}`}>
                        {isEnglishLanguage ? 'Sun' : 'Вс'}
                    </p>
                    <div className={`${styles.statDiagram__diagram_monday_column} ${styles.diagramColumn}`}>
                        <div onClick={() => { changeCurrentDay(isEnglishLanguage ? 'Monday' : 'Понедельник', 0) }}
                            style={setDiagramHeight(isEnglishLanguage ? 'Monday' : 'Понедельник', 0)}></div>
                    </div>
                    <div className={`${styles.statDiagram__diagram_tuesday_column} ${styles.diagramColumn}`}>
                        <div onClick={() => { changeCurrentDay(isEnglishLanguage ? 'Tuesday' : 'Вторник', 1) }}
                            style={setDiagramHeight(isEnglishLanguage ? 'Tuesday' : 'Вторник', 1)}></div>
                    </div>
                    <div className={`${styles.statDiagram__diagram_wednesday_column} ${styles.diagramColumn}`}>
                        <div onClick={() => { changeCurrentDay(isEnglishLanguage ? 'Wednesday' : 'Среда', 2) }}
                            style={setDiagramHeight(isEnglishLanguage ? 'Wednesday' : 'Среда', 2)}></div>
                    </div>
                    <div className={`${styles.statDiagram__diagram_thursday_column} ${styles.diagramColumn}`}>
                        <div onClick={() => { changeCurrentDay(isEnglishLanguage ? 'Thursday' : 'Четверг', 3) }}
                            style={setDiagramHeight(isEnglishLanguage ? 'Thursday' : 'Четверг', 3)}></div>
                    </div>
                    <div className={`${styles.statDiagram__diagram_friday_column} ${styles.diagramColumn}`}>
                        <div onClick={() => { changeCurrentDay(isEnglishLanguage ? 'Friday' : 'Пятница', 4) }}
                            style={setDiagramHeight(isEnglishLanguage ? 'Friday' : 'Пятница', 4)}></div>
                    </div>
                    <div className={`${styles.statDiagram__diagram_saturday_column} ${styles.diagramColumn}`}>
                        <div onClick={() => { changeCurrentDay(isEnglishLanguage ? 'Saturday' : 'Суббота', 5) }}
                            style={setDiagramHeight(isEnglishLanguage ? 'Saturday' : 'Суббота', 5)}></div>
                    </div>
                    <div className={`${styles.statDiagram__diagram_sunday_column} ${styles.diagramColumn}`}>
                        <div onClick={() => { changeCurrentDay(isEnglishLanguage ? 'Sunday' : 'Воскресенье', 6) }}
                            style={setDiagramHeight(isEnglishLanguage ? 'Sunday' : 'Воскресенье', 6)}></div>
                    </div>
                </div>
            </div>
            <div className={styles.statFocus}>
                <div className={styles.statFocus__textWrap}>
                    <p className={styles.statFocus__textWrap_title}>
                        {isEnglishLanguage ? 'Focus' : 'Фокус'}
                    </p>
                    <p className={styles.statFocus__textWrap_count}>
                        {`${currentDayFocus}%`}
                    </p>
                </div>
                <img src={focusIcon} alt="icon" />
            </div>
            <div className={styles.statPauseTime}>
                <div className={styles.statFocus__textWrap}>
                    <p className={styles.statFocus__textWrap_title}>
                        {isEnglishLanguage ? 'On pause' : 'Время на паузе'}
                    </p>
                    <p className={styles.statFocus__textWrap_count}>
                        {`${currentDayTimeOnPause}${isEnglishLanguage ? 'm' : 'м'}`}
                    </p>
                </div>
                <img src={pauseTime} alt="icon" />
            </div>
            <div className={styles.statPauseCount}>
                <div className={styles.statFocus__textWrap}>
                    <p className={styles.statFocus__textWrap_title}>
                        {isEnglishLanguage ? 'Pauses' : 'Остановки'}
                    </p>
                    <p className={styles.statFocus__textWrap_count}>
                        {currentDayPauseCount}
                    </p>
                </div>
                <img src={pauseCount} alt="icon" />
            </div>
        </div>
    );
}