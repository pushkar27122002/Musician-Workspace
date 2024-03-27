import {BackendUrl} from "./config";

export const makeUnauthenticatedPostRequest = async (Route,body) => {
    const response = await fetch(BackendUrl+Route, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }
    );
    const formattedResponse = await response.json();
    return formattedResponse;
}

export const makeAuthenticatedPostRequest = async (Route,body) => {
    
    const token = getToken();
    console.log(token);
    console.log(body);
    const response = await fetch(BackendUrl+Route, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: body
    }
    );
    const formattedResponse = await response.json();
    return formattedResponse;
}

const getToken = () => {
    const accessToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return accessToken
}

export const makeAuthenticatedGetRequest = async (Route) => {
    
    const token = getToken();
    const response = await fetch(BackendUrl+Route, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
           
        },
    }
    );
    const formattedResponse = await response.json();
    return formattedResponse;
}
// import { BackendUrl } from "./config";

// export const makeUnauthenticatedPostRequest = async (Route, body) => {
//     try {
//         const response = await fetch(BackendUrl + Route, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(body)
//         });

//         if (!response.ok) {
//             // If response status is not in the range 200-299
//             throw new Error(`Request failed with status ${response.status}`);
//         }

//         const formattedResponse = await response.json();
//         return formattedResponse;
//     } catch (error) {
//         // Handle any errors that occur during the request
//         console.error("Error making POST request:", error.message);
//         // You can choose to return a specific error message or re-throw the error
//         throw error;
//     }
// };
