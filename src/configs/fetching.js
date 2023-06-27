import axios from "axios"
import { BASE_URL } from "./constant"

export const getData = async (paramURL, ) => {
    try {
        const response = await axios.get(BASE_URL+paramURL)
        return response
    } catch(e) {
        console.log(e)
        return e
    }
}

export const postData = async (paramURL, body) => {
    try {
        const response = await axios.post(BASE_URL+paramURL, body, {headers: { 'Content-Type' : 'application/x-www-form-urlencoded' }})
        return response
    } catch(e) {
        console.log(e)
        return e
    }
}