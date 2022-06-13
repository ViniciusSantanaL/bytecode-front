import React, { useEffect, useState } from 'react'
import { TokenDTO } from '../../service/Auth/TokenDTO'
import { http } from '../../service/api'
import { IAvailableCoin } from 'types/IAvailableCoins'
import './ExchangeCoins.scss'
import { IExchangeRates } from '../../types/IExchangeRates'
import { ICurrentRate } from '../../types/ICurrentRate'
import { useSetRecoilState } from 'recoil'
import { exchangeRateFromBaseCoin } from '../../state/atom'

interface Props {
  actualFromCoin: IAvailableCoin | null
  actualToCoin: ICurrentRate | null
  setActualToCoin: React.Dispatch<React.SetStateAction<ICurrentRate | null>>
  setResultTrade: React.Dispatch<React.SetStateAction<number | undefined>>
}

export default function ExchangeCoins({ actualFromCoin, actualToCoin, setActualToCoin, setResultTrade }: Props) {
  const [exchangeCoin, setExchangeCoin] = useState<IExchangeRates>()
  const setExchangeRate = useSetRecoilState<IExchangeRates>(exchangeRateFromBaseCoin)

  async function availableCoinsApi() {
    const promise = await http.get<IExchangeRates>('/rate/all', {
      params: {
        base: actualFromCoin?.symbol
      }
    })
    return promise.data
  }
  useEffect(() => {
    if (actualFromCoin) {
      setActualToCoin(null)
      const response = availableCoinsApi()

      response.then((data) => {
        setExchangeCoin(data)
        setExchangeRate(data)
        setResultTrade(undefined)
      })
    } else {
      setResultTrade(undefined)
      setExchangeCoin({ baseSymbol: '', coinsBase: [] })
    }
  }, [actualFromCoin])
  return (
    <div className="dropdown-size">
      <div className="dropdown">
        <button className="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {actualToCoin ? actualToCoin.symbol : 'Select Coin To'}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" onClick={() => setActualToCoin(null)}>
            -
          </a>
          {exchangeCoin?.coinsBase.map((exchangeRate, index) => (
            <a
              className="dropdown-item"
              key={index}
              onClick={() => {
                setActualToCoin(exchangeRate)
                setResultTrade(undefined)
              }}
            >
              {exchangeRate.symbol}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
