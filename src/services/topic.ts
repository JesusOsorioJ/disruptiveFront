const API_URL = import.meta.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";

export async function getAllTopic() {
    try {
        const response = await fetch(`${API_URL}/userPrisma/filterbymaker?`)
        const data = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
}


export async function createOneTopic(body: {}) {
    const payload = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
    };
    try {
        const response = await fetch(`${API_URL}/userPrisma`, payload);
        const data = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
}
export async function updateOneTopic(body: {}) {
    const payload = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
    };
    try {
        const response = await fetch(`${API_URL}/userPrisma`, payload);
        const data = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
}


export async function deleteOneTopic(id: number) {
    const payload = {
        method: 'DELETE',
    };
    try {
        const response = await fetch(`${API_URL}/userPrisma/${id}`, payload);
        const data = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
}