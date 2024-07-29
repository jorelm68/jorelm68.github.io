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
    photo: 'https://via.placeholder.com/200',

    link: '/',
    maxWidth: '0px',
    maxHeight: '0px',
    minWidth: '0px',
    minHeight: '0px',
    photoWidth: '0px',
    photoHeight: '0px',
    color: 'black',
    backgroundColor: "white",
    flexDirection: 'row',  // Explicit type assertion
    createdAt: new Date(),
}