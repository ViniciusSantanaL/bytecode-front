import React, { useEffect, useState } from 'react'
import { http } from '../../service/api'
import { IAvailableCoin } from 'types/IAvailableCoins'
import './AvaibleCoins.scss'

interface Props {
  actualFromCoin: IAvailableCoin | null
  setActualFromCoin: React.Dispatch<React.SetStateAction<IAvailableCoin | null>>
  setResultTrade: React.Dispatch<React.SetStateAction<number | undefined>>
}

export default function AvailableCoins({ actualFromCoin, setActualFromCoin, setResultTrade }: Props) {
  const [availableCoins, setAvailableCoins] = useState<IAvailableCoin[]>([])

  async function availableCoinsApi() {
    const promise = await http.get<IAvailableCoin[]>('/coin/available')
    return promise.data
  }
  useEffect(() => {
    const response = availableCoinsApi()
    response.then((data) => setAvailableCoins(data))
  }, [])
  return (
    <div className="dropdown-size">
      <div className="dropdown">
        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {actualFromCoin ? actualFromCoin.symbol : 'Select Coin From'}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" onClick={() => setActualFromCoin(null)}>
            -
          </a>
          {availableCoins.map((availableCoin, index) => (
            <a className="dropdown-item" key={index} onClick={() => setActualFromCoin(availableCoin)}>
              {availableCoin.symbol}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
