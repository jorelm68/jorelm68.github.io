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

    name: "Default Title",
    description: "Default description. Click here to go to the home page. This is a default post. You can pass a post object to this component to override this default post. The post object should have the following properties: title, body, photo, maxWidth, maxHeight, minWidth, minHeight, photoWidth, photoHeight, color, backgroundColor, link, flexDirection.",
    photo: "https://via.placeholder.com/200",

    link: '/',
    maxWidth: '100%',
    maxHeight: '100%',
    minWidth: '200px',
    minHeight: '200px',
    photoWidth: '200px',
    photoHeight: '200px',
    color: 'black',
    backgroundColor: "white",
    flexDirection: 'row' as 'row' | 'column',  // Explicit type assertion
    createdAt: new Date(),
}