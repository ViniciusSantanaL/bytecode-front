import React, { useState } from 'react'
import { IAvailableCoin } from '../../../types/IAvailableCoins'

interface Props {
  baseSymbolBalance: string
  walletBalance: number
  availableCoins: IAvailableCoin[]
}

export default function BaseWallet({ baseSymbolBalance, walletBalance, availableCoins }: Props) {
  const [actualAvailableCoin, setActualAvailableCoin] = useState<IAvailableCoin | null>(null)
  return (
    <div className="card border-left-success shadow h-100 py-2 mb-3">
      <div className="card-body">
        <div className="row no-gutters align-items-center">
          <div className="col mr-2">
            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">{baseSymbolBalance}</div>
            <div className="h5 mb-0 font-weight-bold text-gray-800">{walletBalance}$</div>
          </div>
          <div className="col-auto">
            <div className="d-flex justify-content-around">
              <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>

              <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {actualAvailableCoin ? actualAvailableCoin.symbol : 'Change'}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" onClick={() => setActualAvailableCoin(null)}>
                    -
                  </a>
                  {availableCoins.map((availableCoin, index) => (
                    <a className="dropdown-item" key={index} onClick={() => setActualAvailableCoin(availableCoin)}>
                      {availableCoin.symbol}
                    </a>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn btn-success">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
