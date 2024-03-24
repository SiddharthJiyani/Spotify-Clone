import { backendURL } from "./config";


export  const makeUnauthenticatedPOSTRequest = async (route,body) => {
    // route : /sign , /login ..etc
    const response = await fetch( backendURL + route , {
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
    });

    const data = await response.json();
    return data;
}

export const makeAuthenticatedPOSTRequest = async ( route , body) => {
    const accessToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    const token = accessToken;
    // console.log(token);
    const response = await fetch( backendURL + route , {
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`,
        },
        body:JSON.stringify(body)
    });
    const data = await response.json();
    // console.log("data: ",data);
    return data;
}
export const makeAuthenticatedGETRequest = async ( route ) => {
    const accessToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    const token = accessToken;
    // console.log(token);
    const response = await fetch( backendURL + route , {
        method:"GET",
        headers:{
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`,                   
        },
    });

    const data = await response.json();
    return data;
}

const getToken = () => {
    const accessToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return accessToken;
};
