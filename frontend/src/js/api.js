// API calls for authentication
export async function adminLogin(data) {
    const response = await fetch('/admin/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        throw new Error('Login failed');
    }
    
    return await response.json();
}

export async function userSignup(data) {
    const response = await fetch('/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        throw new Error('Registration failed');
    }
    
    return await response.json();
}