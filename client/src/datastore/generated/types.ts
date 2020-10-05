export interface Task {
    _id: string;
    title: string;
    description: string;
    status?: any;
    type?: string;
    priority?: number;
    public?: boolean;
    startDate?: any;
    payload?: any;
    _version: number;
    _deleted: boolean;
}

export type TaskCreate = Omit<Task, "_id">;
export type TaskChange =  Pick<Task, "_id"> & Partial<TaskCreate>;

export interface Comment {
    _id: string;
    message: string;
    author: string
    _version: number;
    _deleted: boolean;
    noteId: string;
}

export type CommentCreate = Omit<Comment, "_id">;
export type CommentChange =  Pick<Comment, "_id"> & Partial<CommentCreate>;
