const API_URL = import.meta.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";

export async function filterByAllContent(body: {}) {
    
    try {
        const response = await fetch(`${API_URL}/content/filterbycontent?` +
            new URLSearchParams(body).toString())
            console.log("body",body);
        const data = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function createOneContent(body: {}) {
    const payload = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
    };
    try {
        const response = await fetch(`${API_URL}/content`, payload);
        const data = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
}
export async function updateOneContent(body: {}) {
    const payload = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
    };
    try {
        const response = await fetch(`${API_URL}/content`, payload);
        const data = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
}


export async function deleteOneContent(id: number) {
    const payload = {
        method: 'DELETE',
    };
    try {
        const response = await fetch(`${API_URL}/content/${id}`, payload);
        const data = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
}