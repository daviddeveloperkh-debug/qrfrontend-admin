import { toast } from 'react-toastify'

export const showErrors = (data) => {
  toast.error(data?.error?.message || data?.message)
}

export const error403Text = 'У вас нет доступа к этому действию.'
