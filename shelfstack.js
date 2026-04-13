"use strict";
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["Pending"] = 0] = "Pending";
    TaskStatus[TaskStatus["InProgress"] = 1] = "InProgress";
    TaskStatus[TaskStatus["Completed"] = 2] = "Completed";
})(TaskStatus || (TaskStatus = {}));
function AddTask(task, newTask) {
    return [...task, newTask];
}
function updateTaskStatus(task, id, newStatus) {
    return task.map(t => t.id === id ? { ...t, stats: newStatus } : t);
}
function getOverdueTasks(task) {
    const now = new Date();
    return task.filter(t => t.dueDate < now && t.stats !== TaskStatus.Completed);
}
let myTasks = [];
myTasks = AddTask(myTasks, { id: 2, title: "إنشاء مشروع", stats: TaskStatus.Pending, dueDate: new Date("2024-02-01") });
myTasks = updateTaskStatus(myTasks, 1, TaskStatus.Completed);
const overdueTasks = getOverdueTasks(myTasks);
console.log(overdueTasks);
