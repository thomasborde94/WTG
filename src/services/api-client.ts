import axios from "axios";

// Access instance to the api
export default axios.create({
    baseURL: 'https://api.rawg.io/api/',
    params:{
        key: 'f9a9886de13e419589e5d62fa60f7f9a'
    }
})