import { API_URL } from '../config'
import { $api } from './api'
import { formData } from './form'

export const requests = {
  // AUTH
  login: (params) => $api.post(`${API_URL}/auth/login`, params),
  fetchMe: () => $api.get(`${API_URL}/users/me`),
  // STATS
  fetchStats: () => $api.get(`${API_URL}/students/stats/monthly`),
  // USER
  fetchUser: (params) => $api.get(`${API_URL}/students`, { params }),
  fetchUserDetail: (params) => $api.get(`${API_URL}/students`, { params }),
  createUser: (params) => $api.post(`${API_URL}/students/create`, formData(params)),
  editUser: (id, year, params) =>
    $api.post(`${API_URL}/students/update/${id}?year=${year}`, formData(params)),
  deleteUser: (id, params) => $api.delete(`${API_URL}/students/delete/${id}`, { params }),
  fetchUserStatic: () => $api.get(`${API_URL}/static-students`),
  downloadUserExcel: (params) =>
    $api.get(`${API_URL}/export-students-excel`, { params, responseType: 'blob' }),
  // ADMINS
  fetchAdmins: (params) => $api.get(`${API_URL}/users`, { params }),
  fetchAdminsDetail: (id) => $api.get(`${API_URL}/users/${id}`),
  createAdmins: (params) => $api.post(`${API_URL}/users/create`, params),
  editAdmins: (id, params) => $api.put(`${API_URL}/users/update/${id}`, params),
  deleteAdmins: (id) => $api.delete(`${API_URL}/users/delete/${id}`),
  // WELDER CERTIFICATES
  fetchWelderCertificates: (params) => $api.get(`${API_URL}/welder-certificates`, { params }),
  fetchWelderCertificatesDetail: (id) => $api.get(`${API_URL}/welder-certificates/${id}`),
  createWelderCertificates: (params) => $api.post(`${API_URL}/welder-certificates/create`, params),
  editWelderCertificates: (id, params) =>
    $api.put(`${API_URL}/welder-certificates/update/${id}`, params),
  deleteWelderCertificates: (id) => $api.delete(`${API_URL}/welder-certificates/delete/${id}`),
  fetchWelderCertificatesStatic: () => $api.get(`${API_URL}/welder-certificates/static-list`),
}
