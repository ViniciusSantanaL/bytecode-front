import React, { useState } from 'react'
import { IAvailableCoin } from 'types/IAvailableCoins'
import AvailableCoins from '../../components/AvailableCoins'
import './Home.scss'
import Input from '../../components/Input/Input'
import { useForm } from 'react-hook-form'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { ICurrentRate } from '../../types/ICurrentRate'
import ExchangeCoins from '../../components/ExchangeCoins'
import TableTrades from '../../components/TrableTrades/TableTrades'
import { TradeForm } from '../../types/form/TradeForm'
import { IUserTrade } from '../../types/IUserTrade'
import { RecoilRoot } from 'recoil'

export default function Home() {
  const [actualFromCoin, setActualFromCoin] = useState<IAvailableCoin | null>(null)
  const [actualToCoin, setActualToCoin] = useState<ICurrentRate | null>(null)
  const [userTrades, setUserTrades] = useState<IUserTrade[]>([])
  const [tradeForm, setTradeForm] = useState<TradeForm>()
  const { register, handleSubmit } = useForm<TradeForm>()
  const [resultTrade, setResultTrade] = useState<number>()

  function onSubmit({ amount }: TradeForm) {
    if (actualFromCoin && amount && actualToCoin) {
      setTradeForm({ symbolTo: actualToCoin.symbol, amount: amount, symbolFrom: actualFromCoin.symbol })
    }
  }
  return (
    <RecoilRoot>
      <div className="container-home">
        <div className="d-flex justify-content-center">
          <h1 className="title">Bytecode</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex justify-content-center">
            <div id="fromCoin" className="d-flex justify-content-start">
              <AvailableCoins actualFromCoin={actualFromCoin} setActualFromCoin={setActualFromCoin} setResultTrade={setResultTrade} />
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
              Trade
            </button>
          </div>

          <div className="table-transaction">
            <div className="d-flex justify-content-center">
              <h1 className="title-sub ">Trades</h1>
            </div>
            <TableTrades userTrades={userTrades} setUserTrades={setUserTrades} tradeForm={tradeForm} setResultTrade={setResultTrade} />
          </div>
        </form>
      </div>
    </RecoilRoot>
  )
}
