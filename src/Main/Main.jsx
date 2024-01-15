import styles from './main.module.css';
import { Settings } from './Settings/Settings';
import { Timer } from './Timer/Timer';

export function Main() {
    return (
        <div className={`${styles.main} container`}>
            <Settings />
            <Timer />
        </div>
    );
}