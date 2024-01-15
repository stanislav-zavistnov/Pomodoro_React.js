import React, { useState } from "react";
import styles from './statmain.module.css';
import pomodorIcon from '../../assets/images/pomodor.svg';
import focusIcon from '../../assets/images/focus.svg';
import pauseTime from '../../assets/images/pauseTime.svg';
import pauseCount from '../../assets/images/pauseCount.svg';
import { IDayStat } from "../../store";
import { secondsToMinutes } from "../../utilits/secondsToMinutes";

interface IPropsData {
    props: Array<IDayStat>
}

export function StatMain(props: IPropsData) {
    const [currentDay, setCurrentDay] = useState('Понедельник');
    const [currentDayTaskTime, setCurrenDayTaskTime] = useState(secondsToMinutes(props.props[0].timeOnTask));
    const [currentDayPomodor, setCurrentDayPomodor] = useState(props.props[0].pomodorFinished);
    const mondayFocus = Math.round((1 - (props.props[0].timeOnPause / props.props[0].timeOnTask)) * 100);
    const [currentDayFocus, setCurrentDayFocus] = useState(mondayFocus ? mondayFocus : 0);
    const [currentDayTimeOnPause, setCurrentDayTimeOnPause] = useState(secondsToMinutes(props.props[0].timeOnPause));
    const [currentDayPauseCount, setCurrentDayPauseCount] = useState(props.props[0].countOfPauses);

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
                    Вы работали над задачами в&nbsp;
                    <span className={styles.statMainDay__descr_accent}>{`течение ${currentDayTaskTime} мин`}</span>
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
                        {currentDayPomodor ? `${currentDayPomodor} помидора` : '0 помидор'}
                    </p>
                </div>
            </div>
            <div className={styles.statDiagram}>
                <div className={styles.statDiagram__line_one}>
                    <span className={styles.statDiagram__line_one_line}></span>
                    <span className={styles.statDiagram__line_one_descr}>
                        1 ч 40 мин
                    </span>
                </div>
                <div className={styles.statDiagram__line_two}>
                    <span className={styles.statDiagram__line_one_line}></span>
                    <span className={styles.statDiagram__line_one_descr}>
                        1 ч 15 мин
                    </span>
                </div>
                <div className={styles.statDiagram__line_three}>
                    <span className={styles.statDiagram__line_one_line}></span>
                    <span className={styles.statDiagram__line_one_descr}>
                        50 мин
                    </span>
                </div>
                <div className={styles.statDiagram__line_four}>
                    <span className={styles.statDiagram__line_one_line}></span>
                    <span className={styles.statDiagram__line_one_descr}>
                        25 мин
                    </span>
                </div>
                <div className={styles.statDiagram__bottom}></div>
                <div className={styles.statDiagram__diagram}>
                    <p className={`${styles.statDiagram__diagram_monday_descr} ${styles.diagramDay} ${currentDay === 'Понедельник' ? styles.activeDay : ''}`}>
                        Пн
                    </p>
                    <p className={`${styles.statDiagram__diagram_tuesday_descr} ${styles.diagramDay} ${currentDay === 'Вторник' ? styles.activeDay : ''}`}>
                        Вт
                    </p>
                    <p className={`${styles.statDiagram__diagram_wednesday_descr} ${styles.diagramDay} ${currentDay === 'Среда' ? styles.activeDay : ''}`}>
                        Ср
                    </p>
                    <p className={`${styles.statDiagram__diagram_thursday_descr} ${styles.diagramDay} ${currentDay === 'Четверг' ? styles.activeDay : ''}`}>
                        Чт
                    </p>
                    <p className={`${styles.statDiagram__diagram_friday_descr} ${styles.diagramDay} ${currentDay === 'Пятница' ? styles.activeDay : ''}`}>
                        Пт
                    </p>
                    <p className={`${styles.statDiagram__diagram_saturday_descr} ${styles.diagramDay} ${currentDay === 'Суббота' ? styles.activeDay : ''}`}>
                        Сб
                    </p>
                    <p className={`${styles.statDiagram__diagram_sunday_descr} ${styles.diagramDay} ${currentDay === 'Воскресенье' ? styles.activeDay : ''}`}>
                        Вс
                    </p>
                    <div className={`${styles.statDiagram__diagram_monday_column} ${styles.diagramColumn}`}>
                        <div onClick={() => { changeCurrentDay('Понедельник', 0) }}
                            style={setDiagramHeight('Понедельник', 0)}></div>
                    </div>
                    <div className={`${styles.statDiagram__diagram_tuesday_column} ${styles.diagramColumn}`}>
                        <div onClick={() => { changeCurrentDay('Вторник', 1) }}
                            style={setDiagramHeight('Вторник', 1)}></div>
                    </div>
                    <div className={`${styles.statDiagram__diagram_wednesday_column} ${styles.diagramColumn}`}>
                        <div onClick={() => { changeCurrentDay('Среда', 2) }}
                            style={setDiagramHeight('Среда', 2)}></div>
                    </div>
                    <div className={`${styles.statDiagram__diagram_thursday_column} ${styles.diagramColumn}`}>
                        <div onClick={() => { changeCurrentDay('Четверг', 3) }}
                            style={setDiagramHeight('Четверг', 3)}></div>
                    </div>
                    <div className={`${styles.statDiagram__diagram_friday_column} ${styles.diagramColumn}`}>
                        <div onClick={() => { changeCurrentDay('Пятница', 4) }}
                            style={setDiagramHeight('Пятница', 4)}></div>
                    </div>
                    <div className={`${styles.statDiagram__diagram_saturday_column} ${styles.diagramColumn}`}>
                        <div onClick={() => { changeCurrentDay('Суббота', 5) }}
                            style={setDiagramHeight('Суббота', 5)}></div>
                    </div>
                    <div className={`${styles.statDiagram__diagram_sunday_column} ${styles.diagramColumn}`}>
                        <div onClick={() => { changeCurrentDay('Воскресенье', 6) }}
                            style={setDiagramHeight('Воскресенье', 6)}></div>
                    </div>
                </div>
            </div>
            <div className={styles.statFocus}>
                <div className={styles.statFocus__textWrap}>
                    <p className={styles.statFocus__textWrap_title}>
                        Фокус
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
                        Время на паузе
                    </p>
                    <p className={styles.statFocus__textWrap_count}>
                        {`${currentDayTimeOnPause}м`}
                    </p>
                </div>
                <img src={pauseTime} alt="icon" />
            </div>
            <div className={styles.statPauseCount}>
                <div className={styles.statFocus__textWrap}>
                    <p className={styles.statFocus__textWrap_title}>
                        Остановки
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