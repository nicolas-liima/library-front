import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:15001",
    timeout: 20000
}) 