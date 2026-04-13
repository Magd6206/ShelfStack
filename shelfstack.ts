type TaskId = number; 
enum TaskStatus {
    Pending,
    InProgress,
    Completed
}

interface Task  {
    readonly id: TaskId;
    title  : string , 
    stats : TaskStatus , 
    dueDate : Date
}

function AddTask(task : Task[] , newTask : Task) : Task[] {
    return [...task, newTask];

}
function updateTaskStatus(task : Task[] , id : TaskId , newStatus : TaskStatus) : Task[] {
    return task.map(t => t.id === id ? {...t , stats : newStatus} : t);
}

function getOverdueTasks(task : Task[]) : Task[] {
    const now = new Date();
    return task.filter(t => t.dueDate < now && t.stats !== TaskStatus.Completed);
}

function getallTaskStats(tasks : Task[]) : {} {
  const CompleteTaskStats = tasks.filter(e => e.stats === TaskStatus.Completed).length
  const pendingTaskStats = tasks.filter(e => e.stats === TaskStatus.Pending).length
  const inProgressTaskStats = tasks.filter(e => e.stats === TaskStatus.InProgress).length
  return { pendeing : pendingTaskStats  , inPrograss :inProgressTaskStats , complete : CompleteTaskStats }

}

let myTasks: Task[] = [];

myTasks = AddTask(myTasks, { id: 2, title: "إنشاء مشروع", stats: TaskStatus.Pending, dueDate: new Date("2024-02-01") });
myTasks = updateTaskStatus(myTasks, 1, TaskStatus.Completed);
const overdueTasks = getOverdueTasks(myTasks);
console.log(overdueTasks);
