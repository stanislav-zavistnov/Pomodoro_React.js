import { ActionCreator, AnyAction, Reducer } from "redux";
import { generateRandomStatistics } from "./utilits/generateRandomStatistics";

export type RootState = {
    pomodorLength: number;
    shortBreakTime: number,
    longBreakTime: number,
    countShortBreak: number,
    currentBreakTime: number,
    tasks: Array<ITask>,
    arraySetIntervalsIds: Array<NodeJS.Timer>,
    isTimerRun: boolean,
    isBreakTime: boolean,
    statistics: Array<IDayStat>,
    isEnglishChosen: boolean,
}

export interface ITask {
    id: string,
    name: string,
    countPomodor: number,
    successedPomodor: number,
    currentTime: number,
    is_Done: boolean,
    setIntervalId: Array<number>,
}

export interface IDayStat {
    date: string,
    pomodorFinished: number,
    timeOnPause: number,
    countOfPauses: number,
    timeOnTask: number,
}

const initialState: RootState = {
    pomodorLength: 1500000,
    shortBreakTime: 300000,
    longBreakTime: 900000,
    countShortBreak: 0,
    currentBreakTime: 0,
    tasks: [],
    arraySetIntervalsIds: [],
    isTimerRun: false,
    isBreakTime: false,
    statistics: [],
    isEnglishChosen: true,
}

initialState.statistics = generateRandomStatistics();
initialState.currentBreakTime = initialState.shortBreakTime;

const CREATE_TASK = 'CREATE_TASK';
const CREATE_DAY_STAT = 'CREATE_DAY_STAT';
const REMOVE_TASK = 'REMOVE_TASK';
const INCREMENT_POMODOR_COUNT = 'INCREMENT_POMODOR_COUNT';
const DECREMENT_POMODOR_COUNT = 'DECREMENT_POMODOR_COUNT';
const UPDATE_TASK_NAME = 'UPDATE_TASK_NAME';
const UPDATE_CURRENT_TIME = 'UPDATE_CURRENT_TIME';
const ADD_SETINTERVAL_ID = 'ADD_SETINTERVAL_ID';
const UPDATE_COUNT_SHORT_BREAK = 'UPDATE_COUNT_SHORT_BREAK';
const UPDATE_ARRAY_SETINTERVAL_IDS = 'UPDATE_ARRAY_SETINTERVAL_IDS';
const SET_TIMER_RUN = 'SET_TIMER_RUN';
const SET_BREAK_TIME = 'SET_BREAK_TIME';
const UPDATE_CURRENT_BREAK_TIME = 'UPDATE_CURRENT_BREAK_TIME';
const UPDATE_STATISTIC_TASKS_TIME = 'UPDATE_STATISTIC_TASKS_TIME';
const UPDATE_STATISTIC_PAUSE_TIME = 'UPDATE_STATISTIC_PAUSE_TIME';
const UPDATE_STATISTIC_PAUSE_COUNT = 'UPDATE_STATISTIC_PAUSE_COUNT';
const UPDATE_STATISTIC_POMODOR_COUNT = 'UPDATE_STATISTIC_POMODOR_COUNT';
const MOVE_TASK_UP = 'MOVE_TASK_UP';
const MOVE_TASK_DOWN = 'MOVE_TASK_DONW';
const SET_POMODOR_LENGTH = 'SET_POMODOR_LENGTH';
const SET_SHORT_BREAKTIME_LENGTH = 'SET_SHORT_BREAKTIME_LENGTH';
const SET_LONG_BREAKTIME_LENGTH = 'SET_LONG_BREAKTIME_LENGTH';
const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

export const createNewTask: ActionCreator<AnyAction> = (task: ITask) => ({
    type: CREATE_TASK,
    task,
});

export const createNewStatisticDay: ActionCreator<AnyAction> = (statDay: IDayStat) => ({
    type: CREATE_DAY_STAT,
    statDay,
});

export const removeTask = (taskId: string) => ({
    type: REMOVE_TASK,
    payload: taskId,
});

export const increasePomodorCount = (taskId: string) => ({
    type: INCREMENT_POMODOR_COUNT,
    payload: taskId,
});

export const decreasePomodorCount = (taskId: string) => ({
    type: DECREMENT_POMODOR_COUNT,
    payload: taskId,
});

export const updateTaskName = (taskId: string, newName: string) => ({
    type: UPDATE_TASK_NAME,
    payload: { taskId, newName },
});

export const updateTaskCurrentTime = (taskId: string, newTime: number) => ({
    type: UPDATE_CURRENT_TIME,
    payload: { taskId, newTime },
});

export const updateStatisticTasksTime = (currentDay: string) => ({
    type: UPDATE_STATISTIC_TASKS_TIME,
    payload: currentDay,
});

export const updateStatisticPauseTime = (currentDay: string) => ({
    type: UPDATE_STATISTIC_PAUSE_TIME,
    payload: currentDay,
});

export const updateStatisticPauseCount = (currentDay: string) => ({
    type: UPDATE_STATISTIC_PAUSE_COUNT,
    payload: currentDay,
});

export const updateStatisticPomodorCount = (currentDay: string) => ({
    type: UPDATE_STATISTIC_POMODOR_COUNT,
    payload: currentDay,
});

export const updateBreakCurrentTime = (newTime: number) => ({
    type: UPDATE_CURRENT_BREAK_TIME,
    payload: newTime,
});

export const addSetIntervalId: ActionCreator<AnyAction> = (taskId: string, id: number) => ({
    type: ADD_SETINTERVAL_ID,
    payload: { taskId, id },
});

export const updateCountShortBreak = (newCount: number) => ({
    type: UPDATE_COUNT_SHORT_BREAK,
    payload: newCount,
});

export const updateArraySetIntervalIds = (newId: NodeJS.Timer) => ({
    type: UPDATE_ARRAY_SETINTERVAL_IDS,
    payload: newId,
});

export const setTimerRun = (status: boolean) => ({
    type: SET_TIMER_RUN,
    payload: status,
});

export const setBreakTime = (status: boolean) => ({
    type: SET_BREAK_TIME,
    payload: status,
});

export const moveTaskUp = (taskIdUp: string) => ({
    type: MOVE_TASK_UP,
    payload: taskIdUp,
});

export const moveTaskDown = (taskIdDown: string) => ({
    type: MOVE_TASK_DOWN,
    payload: taskIdDown,
});

export const setPomodorLength = (pomodorLength: number) => ({
    type: SET_POMODOR_LENGTH,
    payload: pomodorLength,
});

export const setShortBreakTimeLength = (shortBreakTimeLength: number) => ({
    type: SET_SHORT_BREAKTIME_LENGTH,
    payload: shortBreakTimeLength,
});

export const setLongBreakTimeLength = (longBreakTimeLength: number) => ({
    type: SET_LONG_BREAKTIME_LENGTH,
    payload: longBreakTimeLength,
});

export const changeLanguage = (status: boolean) => ({
    type: CHANGE_LANGUAGE,
    payload: status,
});

export const rootReducer: Reducer<RootState> = (state: RootState = initialState, action: AnyAction) => {
    switch (action.type) {
        case CREATE_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.task],
            };
        case CREATE_DAY_STAT:
            return {
                ...state,
                statistics: [...state.statistics, action.statDay],
            };
        case REMOVE_TASK:
            const updatedTasks = state.tasks.filter(task => task.id !== action.payload);
            return { ...state, tasks: updatedTasks };
        case INCREMENT_POMODOR_COUNT:
            const updatedTasksByIncreasePomodorCount = state.tasks.map(task =>
                task.id === action.payload ? { ...task, countPomodor: task.countPomodor + 1 } : task
            );
            return { ...state, tasks: updatedTasksByIncreasePomodorCount };
        case DECREMENT_POMODOR_COUNT:
            const updatedTasksByDecreasePomodorCount = state.tasks.map(task =>
                task.id === action.payload ? { ...task, countPomodor: task.countPomodor - 1 } : task
            );
            return { ...state, tasks: updatedTasksByDecreasePomodorCount };
        case UPDATE_TASK_NAME:
            const updatedTasksByName = state.tasks.map(task =>
                task.id === action.payload.taskId ? { ...task, name: action.payload.newName } : task
            );
            return { ...state, tasks: updatedTasksByName };
        case UPDATE_CURRENT_TIME:
            const updatedTasksByTime = state.tasks.map(task =>
                task.id === action.payload.taskId ? { ...task, currentTime: action.payload.newTime } : task
            );
            return { ...state, tasks: updatedTasksByTime };
        case UPDATE_STATISTIC_TASKS_TIME:
            const updatedStatisticByTaskTime = state.statistics.map(statDay =>
                statDay.date === action.payload ? { ...statDay, timeOnTask: statDay.timeOnTask + 1 } : statDay
            );
            return { ...state, statistics: updatedStatisticByTaskTime };
        case UPDATE_STATISTIC_PAUSE_TIME:
            const updatedStatisticByPauseTime = state.statistics.map(statDay =>
                statDay.date === action.payload ? { ...statDay, timeOnPause: statDay.timeOnPause + 1 } : statDay
            );
            return { ...state, statistics: updatedStatisticByPauseTime };
        case UPDATE_STATISTIC_PAUSE_COUNT:
            const updatedStatisticByPauseCount = state.statistics.map(statDay =>
                statDay.date === action.payload ? { ...statDay, countOfPauses: statDay.countOfPauses + 1 } : statDay
            );
            return { ...state, statistics: updatedStatisticByPauseCount };
        case UPDATE_STATISTIC_POMODOR_COUNT:
            const updatedStatisticByPomodorCount = state.statistics.map(statDay =>
                statDay.date === action.payload ? { ...statDay, pomodorFinished: statDay.pomodorFinished + 1 } : statDay
            );
            return { ...state, statistics: updatedStatisticByPomodorCount };
        case ADD_SETINTERVAL_ID:
            const updatedTaskBySetIntervalId = state.tasks.map((task) =>
                task.id === action.payload.taskId ? { ...task, setIntervalId: [...task.setIntervalId, action.payload.id] } : task
            );
            return { ...state, tasks: updatedTaskBySetIntervalId };
        case UPDATE_COUNT_SHORT_BREAK:
            return {
                ...state, countShortBreak: action.payload,
            };
        case UPDATE_ARRAY_SETINTERVAL_IDS:
            return {
                ...state,
                arraySetIntervalsIds: [action.payload],
            };
        case SET_TIMER_RUN:
            return {
                ...state,
                isTimerRun: action.payload,
            };
        case SET_BREAK_TIME:
            return {
                ...state,
                isBreakTime: action.payload,
            };
        case UPDATE_CURRENT_BREAK_TIME:
            return {
                ...state,
                currentBreakTime: action.payload,
            };
        case MOVE_TASK_UP:
            const taskIdUp = action.payload;
            const taskIndexUp = state.tasks.findIndex((task) => task.id === taskIdUp);
            if (taskIndexUp > 0) {
                const updatedTasks = [...state.tasks];
                const movedTask = updatedTasks.splice(taskIndexUp, 1)[0];
                updatedTasks.splice(taskIndexUp - 1, 0, movedTask);
                return {
                    ...state,
                    tasks: updatedTasks,
                };
            }
            return state;
        case MOVE_TASK_DOWN:
            const taskIdDown = action.payload;
            const taskIndexDown = state.tasks.findIndex((task) => task.id === taskIdDown);
            if (taskIndexDown < state.tasks.length - 1 && taskIndexDown !== -1) {
                const updatedTasks = [...state.tasks];
                const movedTask = updatedTasks.splice(taskIndexDown, 1)[0];
                updatedTasks.splice(taskIndexDown + 1, 0, movedTask);

                return {
                    ...state,
                    tasks: updatedTasks,
                };
            }
            return state;
        case SET_POMODOR_LENGTH:
            return {
                ...state,
                pomodorLength: action.payload,
            };
        case SET_SHORT_BREAKTIME_LENGTH:
            return {
                ...state,
                shortBreakTime: action.payload,
            };
        case SET_LONG_BREAKTIME_LENGTH:
            return {
                ...state,
                longBreakTime: action.payload,
            };
        case CHANGE_LANGUAGE:
            return {
                ...state,
                isEnglishChosen: action.payload,
            };
        default:
            return state;
    }
}