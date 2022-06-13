import { IWalletFragment } from './IWalletFragment'

export interface IWallet {
  baseSymbolBalance: string
  walletBalance: number
  walletFragments: Array<IWalletFragment>
}
