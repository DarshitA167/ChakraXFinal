import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/api'  // or your backend IP

export const registerUser = async (data) => {
  return axios.post(`${BASE_URL}/register/`, data)
}

export const loginUser = async (data) => {
  return axios.post(`${BASE_URL}/login/`, data)
}

export const getCurrentUser = async (token) => {
  return axios.get(`${BASE_URL}/user/`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
