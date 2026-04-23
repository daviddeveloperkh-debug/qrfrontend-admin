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
  statics: [],
  staticsLoading: false,
}

const welderCertificatesStore = create((set) => ({
  ...initialState,
  getList: async (params) => {
    set({ listLoading: true })
    try {
      const { data } = await requests.fetchWelderCertificates(params)
      set({ list: data })
      return data
    } catch (err) {
      throw err
    } finally {
      set({ listLoading: false })
    }
  },
  getDetail: async (id) => {
    set({ detailLoading: true })
    try {
      const { data } = await requests.fetchWelderCertificatesDetail(id)
      set({ detail: data?.data })
      return data
    } catch (err) {
      throw err
    } finally {
      set({ detailLoading: false })
    }
  },
  create: async (params) => {
    set({ createLoading: true })
    try {
      const { data } = await requests.createWelderCertificates(params)
      return data
    } catch (err) {
      showErrors(err?.response?.data)
      throw err
    } finally {
      set({ createLoading: false })
    }
  },
  edit: async (id, params) => {
    set({ editLoading: true })
    try {
      const { data } = await requests.editWelderCertificates(id, params)
      return data
    } catch (err) {
      showErrors(err?.response?.data)
      throw err
    } finally {
      set({ editLoading: false })
    }
  },
  remove: async (id) => {
    set({ deleteLoading: true })
    try {
      const { data } = await requests.deleteWelderCertificates(id)
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
      const { data } = await requests.fetchWelderCertificatesStatic()
      set({ statics: data?.data })
      return data
    } catch (err) {
      throw err
    } finally {
      set({ staticsLoading: false })
    }
  },
}))

export default welderCertificatesStore
