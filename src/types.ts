export interface makerType {
    id: number;
    email: string;
    name: string;
    typeUser: string;
    password: string;
    status: string;
    topCohort: string;
    createdAt: string; 
    updatedAt: string;
    applications: applicationType[]
}
export interface applicationType {
    id: number;
    company: string;
    role: string;
    description: string
    url: string
    status: string;
    createdAt: string;
    updatedAt: string
    applicationLogs: applicationLogType[]
}

export interface applicationLogType {
    id: number,
    type:string,
    fromStatus: string;
    toStatus: string;
    message: string;
    createdAt: string;
}

export const InitialapplicationLog = {
    id: 0,
    type:"",
    fromStatus: "",
    toStatus: "",
    message: "",
    createdAt: "",
}
export const Initialapplication = {
    id: 0,
    company: "",
    role: "",
    description: "",
    url: "",
    status: "",
    createdAt: "",
    updatedAt: "",
    applicationLogs:[InitialapplicationLog]
}
export const Initialmaker = {
    id: 0,
    email: "",
    name: "",
    typeUser: "",
    password: "",
    status: "GRACE_PERIOD",
    topCohort: "",
    createdAt: "",
    updatedAt: "",
    applications: [Initialapplication]
}


