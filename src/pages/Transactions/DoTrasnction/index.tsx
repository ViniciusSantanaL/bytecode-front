import React, { useState } from 'react'
import BaseSymbolBalance from '../../../components/BaseSymbolBalance'
import Input from '../../../components/Input/Input'
import { AiOutlineArrowRight } from 'react-icons/ai'
import ExchangeCoins from '../../../components/ExchangeCoins'
import { TokenDTO } from '../../../service/Auth/TokenDTO'
import { http } from '../../../service/api'
import { ITransaction } from '../../../types/ITransaction'
import { useForm } from 'react-hook-form'
import { ICurrentRate } from '../../../types/ICurrentRate'
import { IUserTransactions } from '../../../types/IUserTransactions'

interface TransactionForm {
  amount: number
}

interface Props {
  baseSymbol: string | undefined
  isTransaction: boolean
  setUserTransaction: React.Dispatch<React.SetStateAction<ITransaction[]>>
}

export default function DoTransaction({ baseSymbol, isTransaction, setUserTransaction }: Props) {
  const { register, handleSubmit } = useForm<TransactionForm>()
  const [actualToCoin, setActualToCoin] = useState<ICurrentRate | null>(null)
  const [resultTrade, setResultTrade] = useState<number>()

  async function doTransaction(baseSymbolBalance: string | undefined, actualToCoin: string, amount: number) {
    const token = localStorage.getItem('@ByteCode:Token') as string
    const appToken = JSON.parse(token) as TokenDTO
    const promise = await http.post<ITransaction>(
      '/transaction',
      {
        amount: amount,
        baseSymbol: baseSymbolBalance,
        fromSymbol: actualToCoin
      },
      {
        headers: {
          Authorization: `Bearer ${appToken.token}`
        }
      }
    )
    return promise.data
  }
  async function getAllTransactionByUser() {
    const token = localStorage.getItem('@ByteCode:Token') as string
    const appToken = JSON.parse(token) as TokenDTO
    const promise = await http.get<IUserTransactions>('/transaction', {
      headers: {
        Authorization: `Bearer ${appToken.token}`
      }
    })
    return promise.data
  }

  function onSubmit({ amount }: TransactionForm) {
    if (actualToCoin && amount) {
      const response = doTransaction(baseSymbol, actualToCoin.symbol, amount)
      response
        .then((data) => {
          const responseTransaction = getAllTransactionByUser()
          responseTransaction.then((data) => setUserTransaction(data.transactions))
        })
        .catch((err) => console.log(err))
    }
  }
  return (
    <>
      <div className="d-flex justify-content-center">
        <h1 className="title">Do Transaction</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex justify-content-center">
          <div id="fromCoin" className="d-flex justify-content-start">
            <BaseSymbolBalance baseSymbol={baseSymbol} />
            <div className="input-group">
              <Input register={register} name="amount" type="number" step=".01" id="typeNumber" placeholder="Amount" className="form-control" required />
              <div className="input-group-append">
                <span className="input-group-text">$</span>
              </div>
            </div>
          </div>
          <AiOutlineArrowRight size={40} />
          <div id="fromCoin" className="d-flex justify-content-start">
            <ExchangeCoins actualFromCoin={baseSymbol} actualToCoin={actualToCoin?.symbol} setActualToCoin={setActualToCoin} setResultTrade={setResultTrade} isTransaction={isTransaction} />
            <div className="input-group">
              <Input register={register} name="amountFromCoin" type="number" id="typeNumber" placeholder={`${resultTrade ? resultTrade : 'Result'}`} className="form-control" disabled />
              <div className="input-group-append">
                <span className="input-group-text">$</span>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center button-padding">
          <button type="submit" className="btn btn-success button">
            Save
          </button>
        </div>
      </form>
    </>
  )
}
