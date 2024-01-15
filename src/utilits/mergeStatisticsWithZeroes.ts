import { IDayStat } from "../store";

export function mergeStatisticsWithZeroes(statistics: IDayStat[], dates: string[]): IDayStat[] {
    // Создаем новый массив, чтобы избежать изменений в оригинальном массиве
    const mergedStatistics: IDayStat[] = [];

    // Перебираем массив dates
    dates.forEach((date) => {
        // Ищем объект в массиве statistics с соответствующей датой
        const matchingObject = statistics.find((stat) => stat.date === date);

        // Если объект найден, добавляем его в новый массив
        if (matchingObject) {
            mergedStatistics.push(matchingObject);
        } else {
            // Если объект не найден, добавляем объект с нулевыми значениями
            mergedStatistics.push({
                date,
                pomodorFinished: 0,
                timeOnPause: 0,
                countOfPauses: 0,
                timeOnTask: 0,
            });
        }
    });

    // Возвращаем новый массив
    return mergedStatistics;
}