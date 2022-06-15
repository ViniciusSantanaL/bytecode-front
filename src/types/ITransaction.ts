export interface ITransaction {
  id: number
  amount: number
  fromSymbol: string
  toSymbol: string
  rate: string
  result: string
  register: Date
}
