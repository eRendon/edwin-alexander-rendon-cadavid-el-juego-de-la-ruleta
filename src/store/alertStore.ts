import { defineStore } from 'pinia'
import { IAlert } from '../interfaces/IAlert'

export const useAlertStore = defineStore('alert', {
  state: () => ({
    message: '',
    show: false,
    type: 'error'
  } as IAlert),
  actions: {
    showAlert(alert: IAlert): void {
      this.$state =  alert

      setTimeout(() => {
        this.dismissAlert()
      }, 2000)
    },
    dismissAlert(): void {
      this.show = false
      this.message = ''
    }
  }
})
