import Cookies from 'js-cookie';

const BASEAPI = 'http://localhost:5000';

const apiFetchPost = async (endpoint, body) => {

    const res = await fetch(BASEAPI + endpoint, {
        method: 'POST',
        headers: {
            'Acecept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const json = await res.json();
    if (json.notallowed) {
        window.location.href = '/signin';
        return;
    }
    return json;
}

const apiFetchGet = async (endpoint, token) => {

    const res = await fetch(BASEAPI + endpoint, {
        method: "GET",
        headers: { 'authoriztion-token': token }
    });
    const json = await res.json();
    
     return json.error ? false : true ;
}


const Api = {
    login: async (email, password) => {
        const json = await apiFetchPost(
            '/user/login',
            { email, password }
        )
        return json;
    },

    register: async (name, email, password) => {
        const json = await apiFetchPost(
            '/user/register',
            { name, email, password }
        )
        return json;
    },
    verifyToken: async () => {
        let token = Cookies.get('token');
        if(!token){
            return;
        }
        const res = await apiFetchGet(
            '/user/free',
            token
        )
        if(!res) {
            Cookies.remove('token');
            window.location.href = '/signin';
        }
    },
    verifyAdmin: async () => {
        let token = Cookies.get('token');
        if(!token){
            return;
        }
        const res = await apiFetchGet(
            '/admin',
            token
        )
        if(!res) {
            Cookies.remove('admin');
        }else{
            Cookies.set('admin', true);
        }
    }
    
}

export default () => Api;