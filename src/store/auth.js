import { create } from 'zustand'
import { requests } from '../helpers/requests'
import { removeToken } from '../helpers/api'

const initialState = {
  loginLoading: false,
  me: {},
  meLoading: false,
}

const authStore = create((set) => ({
  ...initialState,
  postLogin: async (params) => {
    set({ loginLoading: true })
    try {
      const { data } = await requests.login(params)
      set({ me: data?.user })
      return data
    } catch (err) {
      throw err
    } finally {
      set({ loginLoading: false })
    }
  },
  getMe: async (params) => {
    set({ meLoading: true })
    try {
      const data = await requests.fetchMe(params)
      set({ me: data?.data?.data })
      return data?.data?.data
    } catch (err) {
      throw err
    } finally {
      set({ meLoading: false })
    }
  },
}))

export default authStore
