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
    
    name: string,
    description: string,
    selectors: string,
    urls: string[],
    captions: string[],
    essay: string,
    link: string,
    color: string,
    backgroundColor: string,
    start: string,
    end: string,
    location: string,

    createdAt: Date,
}