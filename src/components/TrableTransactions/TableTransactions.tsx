import { IUserTrade } from '../../types/IUserTrade'
import { useRecoilValue } from 'recoil'
import { IExchangeRates } from '../../types/IExchangeRates'
import { exchangeRateFromBaseCoin } from '../../state/atom'
import React, { useEffect, useState } from 'react'
import { IAvailableCoin } from '../../types/IAvailableCoins'
import { TradeForm } from '../../types/form/TradeForm'
import { http } from '../../service/api'
import { IUserTransactions } from '../../types/IUserTransactions'
import { ITransaction } from '../../types/ITransaction'
import { TokenDTO } from '../../service/Auth/TokenDTO'

interface Props {
  doReload: boolean
}
export default function TableTransactions({ doReload }: Props) {
  const [userTransaction, setUserTransaction] = useState<ITransaction[]>([])

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
  useEffect(() => {
    const response = getAllTransactionByUser()
    response.then((data) => setUserTransaction(data.transactions))
  }, [])
  return (
    <table className="table">
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Amount</th>
          <th scope="col">From</th>
          <th scope="col">To</th>
          <th scope="col">Rate</th>
          <th scope="col">Result</th>
        </tr>
      </thead>
      <tbody>
        {userTransaction.map((trade, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{trade.amount}</td>
            <td>{trade.fromSymbol}</td>
            <td>{trade.toSymbol}</td>
            <td>{trade.rate.toString()} $</td>
            <td>{trade.result.toString()} $</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
