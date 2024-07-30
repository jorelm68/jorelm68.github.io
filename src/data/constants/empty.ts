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

    name: '',
    description: '',
    selectors: '',
    media: [],
    captions: [],
    essay: '',
    link: '',
    color: '',
    backgroundColor: '',
    start: '',
    end: '',
    location: '',

    createdAt: new Date(),
}