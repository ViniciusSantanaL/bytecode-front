import { ICurrentRate } from './ICurrentRate'

export interface IExchangeRates {
  baseSymbol: string
  coinsBase: Array<ICurrentRate>
}
