import { create } from 'zustand'
import { requests } from '../helpers/requests'
import { showErrors } from '../helpers/errors'
import { toast } from 'react-toastify'

const initialState = {
  list: [],
  listLoading: false,
  detail: {},
  detailLoading: false,
  createLoading: false,
  editLoading: false,
  deleteLoading: false,
  statics: {},
  staticsLoading: false,
}

const userStore = create((set) => ({
  ...initialState,
  getList: async (params) => {
    set({ listLoading: true })
    try {
      const { data } = await requests.fetchUser(params)
      set({ list: data })
      return data
    } catch (err) {
      if (err?.response?.data?.error?.message) {
        set({ list: { error: err?.response?.data?.error?.message } })
      }
      throw err
    } finally {
      set({ listLoading: false })
    }
  },
  getDetail: async (params) => {
    set({ detailLoading: true })
    try {
      const { data } = await requests.fetchUserDetail(params)
      set({ detail: data?.data?.[0] })
      return data
    } catch (err) {
      if (err?.response?.data?.error?.message) {
        set({ detail: { error: err?.response?.data?.error?.message } })
      }
      throw err
    } finally {
      set({ detailLoading: false })
    }
  },
  create: async (params) => {
    set({ createLoading: true })
    try {
      const { data } = await requests.createUser(params)
      return data
    } catch (err) {
      showErrors(err?.response?.data)
      throw err
    } finally {
      set({ createLoading: false })
    }
  },
  edit: async (id, year, params) => {
    set({ editLoading: true })
    try {
      const { data } = await requests.editUser(id, year, params)
      return data
    } catch (err) {
      showErrors(err?.response?.data)
      throw err
    } finally {
      set({ editLoading: false })
    }
  },
  remove: async (id,params) => {
    set({ deleteLoading: true })
    try {
      const { data } = await requests.deleteUser(id,params)
      toast.success('Успешно удалено')
      return data
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.response?.data?.error?.message)
      throw err
    } finally {
      set({ deleteLoading: false })
    }
  },
  getStatics: async () => {
    set({ staticsLoading: true })
    try {
      const { data } = await requests.fetchUserStatic()
      set({ statics: data?.data })
      return data
    } catch (err) {
      throw err
    } finally {
      set({ staticsLoading: false })
    }
  },
  downloadExcel: async (params) => {
    set({ downloadLoading: true })
    try {
      const data = await requests.downloadUserExcel(params)
      return data
    } catch (err) {
      showErrors(err?.response?.data)
      throw err
    } finally {
      set({ downloadLoading: false })
    }
  },
}))

export default userStore
