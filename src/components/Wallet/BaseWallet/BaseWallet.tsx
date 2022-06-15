import React, { useEffect, useState } from 'react'
import { IAvailableCoin } from '../../../types/IAvailableCoins'
import Button from '../../Button'
import { http } from '../../../service/api'
import { TokenDTO } from '../../../service/Auth/TokenDTO'
import { IWallet } from '../../../types/IWallet'
import { set } from 'react-hook-form'

interface Props {
  baseSymbolBalance: string
  walletBalance: number
  setWallet: React.Dispatch<React.SetStateAction<IWallet | undefined>>
}

export default function BaseWallet({ baseSymbolBalance, walletBalance, setWallet }: Props) {
  const [actualAvailableCoin, setActualAvailableCoin] = useState<IAvailableCoin | null>(null)
  const [availableCoins, setAvailableCoins] = useState<IAvailableCoin[]>([])

  async function availableCoinsApi() {
    const promise = await http.get<IAvailableCoin[]>('/coin/available')
    return promise.data
  }

  async function changeBaseSymbolWalletApi(symbol: string) {
    const token = localStorage.getItem('@ByteCode:Token') as string
    const appToken = JSON.parse(token) as TokenDTO
    const promise = await http.put<IWallet>(
      `/wallet`,
      {},
      {
        headers: {
          Authorization: `Bearer ${appToken.token}`
        },
        params: {
          symbol: symbol
        }
      }
    )
    return promise.data
  }

  useEffect(() => {
    const responseAvailableCoins = availableCoinsApi()
    responseAvailableCoins.then((data) => setAvailableCoins(data))
  }, [baseSymbolBalance])

  function filtrate() {
    setAvailableCoins((oldArray) => oldArray.filter((sym) => sym.symbol !== baseSymbolBalance))
  }

  function changeBaseSymbolWallet() {
    if (actualAvailableCoin) {
      const response = changeBaseSymbolWalletApi(actualAvailableCoin.symbol)
      response.then((data) => {
        setWallet(data)
        setActualAvailableCoin(null)
      })
    }
  }
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
              <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle pr-3" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={filtrate}>
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

              {actualAvailableCoin && (
                <Button className={'btn btn-success btn-icon-split'} typeButton={'button'} secondClassName={'fas fa-check'} onClick={() => changeBaseSymbolWallet()}>
                  Save
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
