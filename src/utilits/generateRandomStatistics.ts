const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // добавляем 1, так как месяцы в JavaScript начинаются с 0
    const year = date.getFullYear().toString().slice(-2);
    return `${day}.${month}.${year}`;
};

export const generateRandomStatistics = () => {
    const startDate = new Date('2023-12-10');
    const todayDate = new Date();
    const endDate = new Date(todayDate.setDate(todayDate.getDate() - 1));

    const statistics = [];

    while (startDate <= endDate) {
        const date = formatDate(startDate);

        const dayStat = {
            date: date,
            pomodorFinished: getRandomNumber(0, 5),
            timeOnPause: getRandomNumber(0, 1000),
            countOfPauses: getRandomNumber(0, 20),
            timeOnTask: getRandomNumber(0, 9000),
        };

        statistics.push(dayStat);

        startDate.setDate(startDate.getDate() + 1); // увеличиваем дату на один день
    }

    return statistics;
};