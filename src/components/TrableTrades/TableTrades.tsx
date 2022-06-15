import { IUserTrade } from '../../types/IUserTrade'
import { useRecoilValue } from 'recoil'
import { IExchangeRates } from '../../types/IExchangeRates'
import { exchangeRateFromBaseCoin } from '../../state/atom'
import React, { useEffect } from 'react'
import { IAvailableCoin } from '../../types/IAvailableCoins'
import { TradeForm } from '../../types/form/TradeForm'

interface Props {
  userTrades: IUserTrade[]
  setUserTrades: React.Dispatch<React.SetStateAction<IUserTrade[]>>
  setResultTrade: React.Dispatch<React.SetStateAction<number | undefined>>
  tradeForm: TradeForm | undefined
}
export default function TableTrades({ userTrades, setUserTrades, tradeForm, setResultTrade }: Props) {
  const exchangeRates = useRecoilValue<IExchangeRates>(exchangeRateFromBaseCoin)

  useEffect(() => {
    if (tradeForm) {
      const coin = exchangeRates.coinsBase.find((coin) => coin.symbol == tradeForm.symbolTo)

      let result = 0
      let rateCoin = 0
      if (coin) {
        rateCoin = parseFloat(coin?.rate)
        result = tradeForm.amount * rateCoin
        setResultTrade(result)
      }
      const trade: IUserTrade = {
        symbolFrom: tradeForm.symbolFrom,
        symbolTo: tradeForm.symbolTo,
        amount: tradeForm.amount,
        rate: rateCoin.toString(),
        result: result
      }
      setUserTrades((oldTrades) => [...oldTrades, trade])
    }
  }, [tradeForm])
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
        {userTrades.map((trade, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{trade.amount}</td>
            <td>{trade.symbolFrom}</td>
            <td>{trade.symbolTo}</td>
            <td>{trade.rate.toString()} $</td>
            <td>{trade.result.toFixed(2)} $</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
