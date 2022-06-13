import AvailableCoins from '../../components/AvailableCoins'
import Input from '../../components/Input/Input'
import { AiOutlineArrowRight } from 'react-icons/ai'
import ExchangeCoins from '../../components/ExchangeCoins'
import TableTrades from '../../components/TrableTrades/TableTrades'
import React, { useEffect, useState } from 'react'
import './Transactions.scss'
import TableTransactions from '../../components/TrableTransactions/TableTransactions'
import { TokenDTO } from '../../service/Auth/TokenDTO'
import { http } from '../../service/api'
import { IWallet } from '../../types/IWallet'
import { useForm } from 'react-hook-form'
import { ICurrentRate } from '../../types/ICurrentRate'
import { IAvailableCoin } from '../../types/IAvailableCoins'
import { RecoilRoot } from 'recoil'

interface TransactionForm {
  amount: number
}

export default function Transactions() {
  const [actualToCoin, setActualToCoin] = useState<ICurrentRate | null>(null)
  const [actualFromCoin, setActualFromCoin] = useState<IAvailableCoin | null>(null)
  const [resultTrade, setResultTrade] = useState<number>()
  const [doReload, setDoReload] = useState<boolean>(false)
  const { register, handleSubmit } = useForm<TransactionForm>()

  async function getWallet() {
    const token = localStorage.getItem('@ByteCode:Token') as string
    const appToken = JSON.parse(token) as TokenDTO
    const promise = await http.get<IWallet>('/wallet', {
      headers: {
        Authorization: `Bearer ${appToken.token}`
      }
    })
    return promise.data
  }

  useEffect(() => {
    const response = getWallet()
    response.then((data) => setActualFromCoin({ symbol: data.baseSymbolBalance }))
    setDoReload(true)
  }, [])

  async function doTransaction(baseSymbolBalance: string, actualToCoin: string, amount: number) {
    const token = localStorage.getItem('@ByteCode:Token') as string
    const appToken = JSON.parse(token) as TokenDTO
    const promise = await http.post<IWallet>(
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

  function onSubmit({ amount }: TransactionForm) {
    if (actualFromCoin && actualToCoin && amount) {
      const response = doTransaction(actualFromCoin.symbol, actualToCoin.symbol, amount)
      response.then((data) => setDoReload(true)).catch((err) => setDoReload(false))
    }
  }

  return (
    <RecoilRoot>
      <div className="container-home">
        <div className="d-flex justify-content-center">
          <h1 className="title">Do Transaction</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex justify-content-center">
            <div id="fromCoin" className="d-flex justify-content-start">
              {actualFromCoin && <h3>{actualFromCoin.symbol}</h3>}
              <div className="input-group">
                <Input register={register} name="amount" type="number" id="typeNumber" placeholder="Amount" className="form-control" />
                <div className="input-group-append">
                  <span className="input-group-text">$</span>
                </div>
              </div>
            </div>
            <AiOutlineArrowRight size={40} />
            <div id="fromCoin" className="d-flex justify-content-start">
              <ExchangeCoins actualFromCoin={actualFromCoin} actualToCoin={actualToCoin} setActualToCoin={setActualToCoin} setResultTrade={setResultTrade} />
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

          <div className="table-transaction">
            <div className="d-flex justify-content-center">
              <h1 className="title-sub ">Transactions</h1>
            </div>
            <TableTransactions doReload={doReload} />
          </div>
        </form>
      </div>
    </RecoilRoot>
  )
}
