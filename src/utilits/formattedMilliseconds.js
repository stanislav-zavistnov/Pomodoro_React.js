export function formattedMilliseconds(milliseconds) {

    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const remainingSeconds = seconds % 60;
    const remainingMinutes = minutes % 60;

    let formattedTime = '';

    if (hours > 0) {
        formattedTime += `${hours}ч `;
    }

    if (remainingMinutes > 0 || hours === 0) {
        formattedTime += `${remainingMinutes}мин `;
    }

    if (remainingSeconds > 0 || minutes === 0) {
        formattedTime += `${remainingSeconds}сек`;
    }

    return formattedTime.trim();
}