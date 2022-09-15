export const TaskStatus: {[key:string]: boolean} = {
    "PENDING": true,
    "DONE": true
}

export interface Task {
    _id: string,
    task: string,
    status?: string,
}

export interface NewTask {
  
    task: String,
    
}