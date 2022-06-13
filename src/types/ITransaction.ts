export interface ITransaction {
  id: number
  amount: number
  fromSymbol: string
  toSymbol: string
  rate: number
  result: number
  register: Date
}
