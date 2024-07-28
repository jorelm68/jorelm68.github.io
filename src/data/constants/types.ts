export type Res = {
    status: number,
    success: boolean,
    data: any,
    errorMessage: string,
}

export type Blank = {
    _id: string,
    name: string,
    photo: string,
    description: string,

    createdAt: Date,
}

export type Post = {
    _id: string,
    title: string,
    body: string,
    photo: string,
    maxWidth: string,
    maxHeight: string,
    minWidth: string,
    minHeight: string,
    photoWidth: string,
    photoHeight: string,
    color: string,
    backgroundColor: string,
    link: string,
    flexDirection: string,
    
    createdAt: Date,
}