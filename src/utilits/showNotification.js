import pomodoroIcon from '../assets/images/pomodor.svg';

export function showNotification() {
    if ('Notification' in window) {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                new Notification('Трекер "Помидор"', {
                    body: 'Время вышло',
                    icon: pomodoroIcon,
                });
            }
        });
    }
}