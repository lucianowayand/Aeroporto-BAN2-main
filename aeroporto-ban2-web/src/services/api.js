import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:5000/'
  });

  export async function GetAll(url){
    return api.get(`/${url}`)
}

export async function Create(url, params){
    return api.post(`/${url}`, params).catch((reason) => reason.response)
}

export async function Update(url, id, params){
    return api.put(`/${url}/${id}`, params).catch((reason) => reason.response)
}

export async function Delete(url, id){
    return api.delete(`/${url}/${id}`).catch((reason) => reason.response)
}