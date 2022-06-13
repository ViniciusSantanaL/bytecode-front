import { ITransaction } from './ITransaction'

export interface IUserTransactions {
  type: number
  transactions: Array<ITransaction>
}
