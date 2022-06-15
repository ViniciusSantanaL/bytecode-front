import React, { useEffect, useState } from 'react'
import { http } from '../../service/api'
import './ExchangeCoins.scss'
import { IExchangeRates } from '../../types/IExchangeRates'
import { ICurrentRate } from '../../types/ICurrentRate'
import { useSetRecoilState } from 'recoil'
import { exchangeRateFromBaseCoin } from '../../state/atom'

interface Props {
  actualFromCoin: string | undefined
  actualToCoin: string | undefined
  isTransaction?: boolean
  setActualToCoin: React.Dispatch<React.SetStateAction<ICurrentRate | null>>
  setResultTrade?: React.Dispatch<React.SetStateAction<number | undefined>>
}

export default function ExchangeCoins({ actualFromCoin, actualToCoin, isTransaction, setActualToCoin, setResultTrade }: Props) {
  const [exchangeCoin, setExchangeCoin] = useState<IExchangeRates>()
  const setExchangeRate = useSetRecoilState<IExchangeRates>(exchangeRateFromBaseCoin)

  async function availableCoinsApi() {
    const promise = await http.get<IExchangeRates>('/rate/all', {
      params: {
        base: actualFromCoin
      }
    })
    return promise.data
  }
  useEffect(() => {
    if (actualFromCoin) {
      const response = availableCoinsApi()

      response.then((data) => {
        if (isTransaction) {
          data.coinsBase.unshift({ symbol: actualFromCoin, rate: '1' })

          setExchangeCoin(data)
          setExchangeRate(data)
        } else {
          setExchangeCoin(data)
          setExchangeRate(data)
        }
        if (setResultTrade) {
          setResultTrade(undefined)
        }
      })
    } else {
      setActualToCoin(null)
      if (setResultTrade) {
        setResultTrade(undefined)
      }
      setExchangeCoin({ baseSymbol: '', coinsBase: [] })
    }
  }, [actualFromCoin])
  return (
    <div className="dropdown-size">
      <div className="dropdown">
        <button className="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {actualToCoin ? actualToCoin : 'Select Coin To'}
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
                if (setResultTrade) {
                  setResultTrade(undefined)
                }
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
