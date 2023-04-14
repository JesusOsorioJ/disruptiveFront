const API_URL = import.meta.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";

export async function filterByAllUser(body: {}) {
    try {
        const response = await fetch(`${API_URL}/user/filterbyuser?` +
            new URLSearchParams(body).toString())
        const data = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function authenticateUser(body: {}) {
    const payload = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
    };
    try {
        const response = await fetch(`${API_URL}/user/authenticate`, payload);
        const data = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function createOneUser(body: {}) {
    const payload = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
    };
    try {
        const response = await fetch(`${API_URL}/user`, payload);
        const data = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function updateOneUser(body: {}) {
    const payload = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
    };
    try {
        const response = await fetch(`${API_URL}/user`, payload);
        const data = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
}


export async function deleteOneUser(id: number) {
    const payload = {
        method: 'DELETE',
    };
    try {
        const response = await fetch(`${API_URL}/user/${id}`, payload);
        const data = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
}