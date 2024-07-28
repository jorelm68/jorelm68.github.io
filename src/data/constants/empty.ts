import { Blank, Post, Res } from "./types";

export const EMPTY_RES: Res = {
    status: 0,
    success: false,
    data: undefined,
    errorMessage: 'This is the initial response message',
}

export const EMPTY_BLANK: Blank = {
    _id: '',
    name: '',
    photo: '',
    description: '',
    
    createdAt: new Date(),
}

export const EMPTY_POST: Post = {
    _id: '',
    title: '',
    body: '',
    photo: '',
    maxWidth: '',
    maxHeight: '',
    minWidth: '',
    minHeight: '',
    photoWidth: '',
    photoHeight: '',
    color: '',
    backgroundColor: '',
    link: '',
    flexDirection: '',
    
    createdAt: new Date(),
}