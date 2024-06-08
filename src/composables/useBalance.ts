import api from '../services/api'
import { useBalanceStore } from '../store/balanceStore'
import { useAlertStore } from '../store/alertStore'

export function useBalance () {
  const balanceStore = useBalanceStore()
  const alertStore = useAlertStore()
  const loadBalance = async (username: string): Promise<void> => {
    console.log(username)
    if (!username) {
      alertStore.showAlert({
        show: true,
        type: 'error',
        message: 'Por favor, ingrese su nombre'
      })
      return
    }
    try {
      const { data } = await api.getUserBalance(username)

      balanceStore.setUser(data)
      alertStore.showAlert({
        type: 'success',
        message: 'Hemos cargado su balance correctamente.',
        show: true
      })
    } catch (error) {
      alertStore.showAlert({
        type: 'error',
        message: 'Hubo un error al intentar cargar su balance, por favor, intente luego.',
        show: true
      })
      console.error(error)
    }
  }

  const updateBalance = async (username: string, balance: number) => {
  try {
      const { data } = await api.updateUserBalance(username, balance)
    console.log(data)
    balanceStore.setUser(data)
    alertStore.showAlert({
      show: true,
      type: 'success',
      message: 'Hemos actualizado correctamente su balance'
    })
  } catch (error) {
    console.error(error)
    alertStore.showAlert({
      show: true,
      type: 'error',
      message: 'Hubo un error al intentar actualizar su balance, por favor, intente luego.'
    })
  }
}

  return {
    loadBalance,
    updateBalance
  }
}
