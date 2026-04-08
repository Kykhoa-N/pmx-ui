export const login = (json) => {
    // console.log(`Logging in user ${json.user.display_name}`);
    localStorage.setItem('user', JSON.stringify(json.user));
    localStorage.setItem('token', JSON.stringify(json.token));
};

export const logout = () => {
    // console.log('Logging out');
    localStorage.clear();
};

export const isLoggedIn = () => {
    return !!localStorage.getItem('user') && !!localStorage.getItem('token');
};

export const getUserJson = () => {
    if (isLoggedIn()) {
        return JSON.parse(localStorage.getItem('user'));
    } else {
        return null;
    }
};

export const getUserName = () => {
    if (isLoggedIn()) {
        return JSON.parse(localStorage.getItem('user'))['display_name'];
    } else {
        return null;
    }
};

export const getUserEmail = () => {
    if (isLoggedIn()) {
        return JSON.parse(localStorage.getItem('user'))['email'];
    } else {
        return null;
    }
};

export const isUserAdmin = () => {
    //TODO: validate securely instead of relying on local storage value...
    if (isLoggedIn()) {
        return JSON.parse(localStorage.getItem('user'))['is_admin'];
    } else {
        return null;
    }
};

const authHeader = () => {
    const token = localStorage.getItem('token');
    return token ? `Bearer ${token.replaceAll('"', '')}` : null;
};

export const apiGet = (url, callback) => {
    fetch(`${process.env.REACT_APP_API_URL}/${url}`, {
        headers: {
            'Authorization': authHeader()
        }
    })
        .then((response) => response.json())
        .then((data) => {
            callback(data);
        })
        .catch((e) => {
            console.log(e.message);
        });
};

export const apiPost = (url, body, callback) => {
    fetch(`${process.env.REACT_APP_API_URL}/${url}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader()
        }
    })
        .then((response) => response.json())
        .then((data) => {
            callback(data);
        })
        .catch((e) => {
            console.log(e.message);
        });
};