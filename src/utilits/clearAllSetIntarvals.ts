export function ClearAllSetIntervals(arrayId: Array<number | undefined | NodeJS.Timer>) {
    const arraySetIntervalsId = arrayId;
    if (arraySetIntervalsId.length !== 0) {
        for (const iterator of arraySetIntervalsId) {
            clearInterval(iterator);
        }
    }
}