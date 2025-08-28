import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.1.74:4000";

export async function login(isLogin: boolean, name: string, email: string, password: string ) {
    
    const body = isLogin ? {email, password} : {name, email, password};

    const res = await fetch(isLogin ? `${API_URL}/auth/login` : `${API_URL}/auth/register`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Login failed");
    }

    return res.json();
}





async function authFetch(url: string, options: any = {}) {
    const token = await AsyncStorage.getItem("token");
    return fetch(`${API_URL}${url}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...options.headers,
        },
    });
}

//* Get routines fetch
export async function getRoutines() {
    const res = await authFetch("/routines");

    if (!res.ok) throw new Error("Failed to fetch routines");
    return res.json();
}

//* Create routine fetch
export async function createRoutine(routine: any) {
    const res = await authFetch(`/routines`, {
        method: "POST",
        body: JSON.stringify(routine),
    });
    
    if(!res.ok) throw new Error("Error creating routine");
    return res.json();
}

//* Update routine fetch
export async function updateRoutine(id: number, routine: any) {
    const res = await authFetch(`/routines/${id}`, {
        method: "PUT",
        body: JSON.stringify(routine),
    });

    if (!res.ok) throw new Error("Error updating routine");
    return res.json();
}

//* Delete routine fetch
export async function deleteRoutine(id: number) {
    const res = await authFetch(`/routines/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Error deleting routine");
    return res.json();
}