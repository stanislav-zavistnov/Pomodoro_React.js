export function getCurrentThisWeekDays() {
    // Получаем текущую дату и день недели
    const currentDate = new Date();
    const currentDay = currentDate.getDay();

    // Вычисляем количество дней до понедельника
    const daysToMonday = currentDay === 0 ? 6 : currentDay - 1; // 0 - воскресенье, поэтому если сегодня воскресенье, возвращаем 6 (6 дней до понедельника)

    // Находим дату понедельника текущей недели
    const mondayDate = new Date(currentDate);
    mondayDate.setDate(currentDate.getDate() - daysToMonday);

    // Создаем массив для хранения дат текущей недели
    const weekDates = [];

    // Заполняем массив датами с понедельника по воскресенье
    for (let i = 0; i < 7; i++) {
        // Создаем новую дату на основе понедельника и добавляем i дней
        const date = new Date(mondayDate);
        date.setDate(mondayDate.getDate() + i);

        // Форматируем дату в требуемый формат "дд.мм.гг" и добавляем в массив
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear() % 100}`;
        weekDates.push(formattedDate);
    }

    // Возвращаем массив дат текущей недели
    return weekDates;
}