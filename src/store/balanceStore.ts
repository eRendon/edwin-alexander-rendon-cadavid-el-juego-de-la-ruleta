import { defineStore } from 'pinia'
import { IUser } from '../interfaces/IUser'

export const useBalanceStore = defineStore('balance', {
  state: () => ({
    balance: 500
  } as IUser),
  actions: {
    setBalance(balance: number): void {
      this.balance = balance
    },
    setUser(user: IUser): void {
      const { balance, id, name } = user
      this.name = name
      this.balance = balance
      this.id = id
    }
  }
})
