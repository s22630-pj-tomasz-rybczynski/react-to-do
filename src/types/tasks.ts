export interface ITask {
    id: string,
    text: string,
    priority: Priority,
    done: boolean,
    deadline: Date,
    user_id: string
}

export enum Priority {
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3
}
