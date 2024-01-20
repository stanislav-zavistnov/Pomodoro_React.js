import React, { useRef, useState } from 'react';
import logo from '../assets/images/logo.svg';
import styles from './header.module.css';
import { Link } from 'react-router-dom';
import { ClearAllSetIntervals } from '../utilits/clearAllSetIntarvals';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, changeLanguage, setTimerRun } from '../store';
import { SetupMenu } from './SetupMenu/SetupMenu';
export function Header() {
    const dispatch = useDispatch();
    const ref = useRef(null);
    const arraySetIntervalsIds = useSelector<RootState, Array<NodeJS.Timer>>(state => state.arraySetIntervalsIds);
    const isEnglishLanguage = useSelector<RootState, boolean>(state => state.isEnglishChosen);
    const [isSetupOpen, setIsSetupOpen] = useState(false);
    function handleOpen() {
        setIsSetupOpen(!isSetupOpen);
    }
    function closeSetupMenu() {
        setIsSetupOpen(false);
    }
    const handleClearIntervals = () => {
        ClearAllSetIntervals(arraySetIntervalsIds);
        dispatch(setTimerRun(false));
    }
    const handleChangeLanguage = () => {
        dispatch(changeLanguage(!isEnglishLanguage))
    }
    return (
        <div className={`${styles.header} container`}>
            <Link to={'/'} className={styles.logoWrap}>
                <img className={styles.logo} src={logo} alt='logo' />
                <p className={styles.logo__descr}>
                    pomodoro_box
                </p>
            </Link>
            <div className={styles.buttonsWrap}>
                <button className={`${styles.statisticWrap} btn-reset`} onClick={handleChangeLanguage}>
                    <p className={styles.stat__descr}>
                        {isEnglishLanguage ? 'EN' : 'RU'}
                    </p>
                </button>
                <button className={`${styles.statisticWrap} btn-reset`} onClick={handleOpen} ref={ref}>
                    <div className={styles.gearIcon} />
                    <p className={styles.stat__descr}>
                        {isEnglishLanguage ? 'Settings' : 'Настройки'}
                    </p>
                </button>
                <Link to={'/statistic'} className={styles.statisticWrap} onClick={handleClearIntervals}>
                    <div className={styles.statIcon} />
                    <p className={styles.stat__descr}>
                    {isEnglishLanguage ? 'Statistic' : 'Статистика'}
                    </p>
                </Link>
                {isSetupOpen && (
                    <SetupMenu closeSetupMenu={closeSetupMenu} />
                )}
            </div>
        </div>

    )
}