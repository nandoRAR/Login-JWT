import Cookies from 'js-cookie';

export const isLogged = () => {
    let token = Cookies.get('token');
    return token ? true : false;
}

export const isAdmin = () => {
    let token = Cookies.get('admin');
    return token ? true : false;
}

export const doLogin = (token, rememberPassword = false) => {
    if (rememberPassword) {
        Cookies.set('token', token, { expires: 999 });
    } else {
        Cookies.set('token', token);
    }

}

export const doLogout = () => {
    Cookies.remove('token');
    Cookies.remove('admin');
}