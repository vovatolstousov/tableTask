import axios from 'axios'
import urlencodeForm from "../services/urlencodeForm";

export const API_URL = 'http://localhost:8080'


export async function get(url) {
    const response = await axios.get(API_URL + url)
    return response.data
}

export async function post(url, data) {
    const response = await axios.post(API_URL + url, data)
    return response.data
}
