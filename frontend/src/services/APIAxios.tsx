import { APIDomain } from '@/config/const';
import axios from 'axios'; 
import { camelizeKeys } from 'humps';
// import { toast } from "react-toastify";

const APIAxios = axios.create({
  baseURL: APIDomain.PRODUCTION_API, 
  transformResponse: [(data) => {
    try {
      // using camelizeKeys to convert the returned JSON into a proper JS object
      return camelizeKeys(JSON.parse(data))
    } catch (e) {
      // toast.error('Error in JSON.parse(data)');
      return {};
    }
  }]
})

export default APIAxios; 
