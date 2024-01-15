import React from "react";
import styles from './deletetaskmenu.module.css';
import cross from '../../../../assets/images/close_window_btn.svg';

interface IDropdownProps {
    taskId: string;
}

export function DeleteTaskMenu(props: IDropdownProps) {
    return (
        <div className={styles.deleteMenuWrap}>
            <div className={styles.deleteWindow}>
                <button className={`btn-reset ${styles.deleteWindow__closeButton}`}>
                    <img src={cross} alt="Закрыть окно" />
                </button>
                <p className={styles.deleteWindow__title}>
                    Удалить задачу?
                </p>
                <button className={`btn-reset ${styles.deleteWindow__deleteBtn}`}>
                    Удалить
                </button>
                <button className={`btn-reset ${styles.deleteWindow__cancelBtn}`}>
                    Отмена
                </button>
            </div>
        </div>
    );
}