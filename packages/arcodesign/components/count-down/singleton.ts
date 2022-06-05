import { raf, cancelRaf } from './util';

export interface TaskQueueItem {
    id: number;
    callback: () => boolean; // 返回true表示要继续计时，否则停止计时
}
export type TaskQueueType = 'micro' | 'macro';

let timeoutId: number | null = null;
let rafId: number | null = null;

export const taskCount = {
    micro: 0,
    macro: 0,
};
export const taskQueue: Record<TaskQueueType, TaskQueueItem[]> = {
    micro: [],
    macro: [],
};

export function startTask(type: TaskQueueType, callback: TaskQueueItem['callback']) {
    taskCount[type] += 1;
    taskQueue[type].push({
        id: taskCount[type],
        callback,
    });
    // 超过1个任务说明定时任务已建，执行时取最新queue即可
    if (taskQueue[type].length <= 1) {
        type === 'micro' ? execMicroTask() : execMacroTask();
    }
    return taskCount[type];
}

export function execMicroTask() {
    rafId && cancelRaf(rafId);
    rafId = raf(() => {
        execTask('micro');
        taskQueue.micro.length && execMicroTask();
    });
}
export function execMacroTask() {
    timeoutId && clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
        execTask('macro');
        taskQueue.macro.length && execMacroTask();
    }, 1000);
}

export function execTask(type: TaskQueueType) {
    taskQueue[type].forEach(item => {
        const needContinue = item.callback();
        if (!needContinue) {
            stopTask(type, item.id);
        }
    });
}

export function stopTask(type: TaskQueueType, id: number) {
    const queue = taskQueue[type];
    const index = queue.findIndex(val => val.id === id);
    if (index >= 0) {
        taskQueue[type].splice(index, 1);
    }
}
