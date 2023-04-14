export interface userType {
    id: number;
    type: string;
    email: string;
    password: string;
    updatedAt: string;
    contents: contentType[];
}
export interface topicType {
    id: number;
    name: string;
    urlImage: string;
    updatedAt: string;
    categories: string[];
    contents: contentType[];
}
export interface contentType {
    id: number,
    name: string;
    description: string;
    urlImage: string;
    url: string;
    updatedAt: string;
    category: string;
}

export const Initialcontent = {
    id: 0,
    name: "",
    description: "",
    urlImage: "",
    url: "",
    updatedAt: "",
    category: "",
}

export const Initialuser = {
    id: 0,
    type: "READER",
    email: "",
    password: "",
    updatedAt: "",
    contents: [Initialcontent]
}

export const Initialtopic = {
    id: 0,
    name: "",
    urlImage: "",
    updatedAt: "",
    categories: ['VIDEO','IMAGE','TEXT'],
    contents: [Initialcontent]
}





