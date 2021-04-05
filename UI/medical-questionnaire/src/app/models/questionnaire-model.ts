export interface IQuestion {
    _id?: string;
    content?: string;
    type: string;
}

export interface ILayout {
    _id?: string;
    name: string;
    questions: IQuestion[];
}

export interface IUserFlags {
    isValidUser: boolean;
    isAdmin: boolean;
}