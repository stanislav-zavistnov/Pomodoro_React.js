export function requestNotification() {
    if ('Notification' in window) {
        if (Notification.permission === 'granted') {
            return;
        }

        const userResponse = window.confirm('Хотите разрешить уведомления?');

        if (userResponse) {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    alert('Разрешение получено!');
                } else {
                    alert('Разрешение отклонено');
                }
            });
        } else {
            alert('Разрешение отклонено');
        }
    }
}