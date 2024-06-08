import axios, { AxiosResponse } from 'axios';
import { IUser } from '../interfaces/IUser'
import { IBetResult } from '../interfaces/IBetResult'

const apiClient = axios.create({
  baseURL: 'http://localhost:5120/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  getUserBalance(name: string): Promise<AxiosResponse<IUser>> {
    return apiClient.get(`/user/${name}`);
  },
  updateUserBalance(name: string, amount: number): Promise<AxiosResponse<IUser>> {
    return apiClient.post(`/user/${name}/update-balance`, { amount });
  },
  placeBet(betRequest: BetRequest): Promise<AxiosResponse<IBetResult>> {
    let endpoint = '/roulette/bet';

    if (betRequest.type === 'color') {
      endpoint = '/roulette/bet';
    } else if (betRequest.type === 'even' || betRequest.type === 'odd') {
      endpoint = '/roulette/bet';
    } else if (betRequest.type === 'number') {
      endpoint = '/roulette/bet';
    }

    return apiClient.post(endpoint, {
      type: betRequest.type,
      value: betRequest.value,
      amount: betRequest.amount
    });
  }

};

export interface BetRequest {
  amount: number;
  type: string;
  value: string;
}
