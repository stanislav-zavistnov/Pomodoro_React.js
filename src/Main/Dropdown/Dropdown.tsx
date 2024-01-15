import React, { useEffect, useRef } from "react";
import styles from './dropdown.module.css';
import dropdownButtonIcon from '../../assets/images/dropdown.svg';
import { DropdownMenu } from "./DropdownMenu/DropdownMenu";

interface IDropdownProps {
    taskId: string;
    countPomodor: number;
    taskName: string;
}

export function Dropdown(props: IDropdownProps) {
    const dropdownRef = useRef(null);
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    React.useEffect(() => setIsDropdownOpen(isDropdownOpen), [isDropdownOpen]);
    const handleOpen = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !(dropdownRef.current as HTMLElement).contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    }

    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);
    return (
        <div className={styles.dropdownButtonWrap} ref={dropdownRef}>
            <div className={`${styles.dropdownButton}`} onClick={handleOpen}>
                <img className={styles.dropdownButtonIcon} src={dropdownButtonIcon} alt="dropdown-button" />
                <div>
                    {isDropdownOpen && (
                        <DropdownMenu taskId={props.taskId} countPomodor={props.countPomodor} taskName={props.taskName} />
                    )}
                </div>
            </div>
        </div>
    );
}