export enum Tab {
    TODO = 'To Do',
    DONE = 'Done',
    ALL = 'All',
}

export interface Todo {
    id: string;
    text: string;
    done: boolean;
}
