export function getCurrentPreviousWeekDays() {
    const currentDate = new Date();

    // Определяем день недели текущей даты
    const currentDay = currentDate.getDay();

    // Вычисляем количество дней, которые нужно отнять, чтобы вернуться к понедельнику прошлой недели
    const daysToMonday = currentDay === 0 ? 6 : currentDay - 1;

    // Находим дату понедельника прошлой недели
    const mondayDate = new Date(currentDate);
    mondayDate.setDate(currentDate.getDate() - daysToMonday - 7); // Отнимаем 7 для получения прошлой недели

    // Создаем массив для хранения дат прошлой недели
    const weekDates = [];

    // Заполняем массив датами с понедельника по воскресенье
    for (let i = 0; i < 7; i++) {
        const date = new Date(mondayDate);
        date.setDate(mondayDate.getDate() + i);

        // Форматируем дату в требуемый формат "дд.мм.гг" и добавляем в массив
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear() % 100}`;
        weekDates.push(formattedDate);
    }

    // Возвращаем массив дат прошлой недели
    return weekDates;
}