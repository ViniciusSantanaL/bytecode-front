import React, { useEffect, useState } from 'react'
import { IWallet } from '../../types/IWallet'
import Input from '../Input/Input'
import { useForm } from 'react-hook-form'
import { IAvailableCoin } from '../../types/IAvailableCoins'
import { http } from '../../service/api'
import { TokenDTO } from '../../service/Auth/TokenDTO'

interface Props {
  setWallet: React.Dispatch<React.SetStateAction<IWallet | undefined>>
}

interface BaseWalletForm {
  balance: number
}

export default function CreateBaseWallet({ setWallet }: Props) {
  const { register, handleSubmit } = useForm<BaseWalletForm>()

  const [availableCoins, setAvailableCoins] = useState<IAvailableCoin[]>([])
  const [actualFromCoin, setActualFromCoin] = useState<IAvailableCoin>()

  async function createWallet(symbol: string, balance: number) {
    const token = localStorage.getItem('@ByteCode:Token') as string
    const appToken = JSON.parse(token) as TokenDTO
    const promise = await http.post<IWallet>(
      '/wallet',
      {
        symbolBalance: symbol,
        initialBalance: balance
      },
      {
        headers: {
          Authorization: `Bearer ${appToken.token}`
        }
      }
    )
    return promise.data
  }
  async function availableCoinsApi() {
    const promise = await http.get<IAvailableCoin[]>('/coin/available')
    return promise.data
  }
  useEffect(() => {
    const response = availableCoinsApi()
    response.then((data) => setAvailableCoins(data.filter((sym) => sym.symbol !== 'test')))
  }, [])

  function onSubmit({ balance }: BaseWalletForm) {
    if (balance && actualFromCoin) {
      console.log(actualFromCoin)
      console.log(balance)
      const response = createWallet(actualFromCoin.symbol, balance)
      response.then((data) => setWallet(data))
    }
  }
  return (
    <>
      <div className="text-center">
        <h1 className="h1 text-gray-900 mb-4">Create Wallet!</h1>
      </div>
      <form className="user" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {actualFromCoin ? actualFromCoin.symbol : 'Select Coin From'}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" onClick={() => setActualFromCoin(undefined)}>
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
        <div className="form-group">
          <Input register={register} type="number" name="balance" className="form-control form-control-user" placeholder="Balance" />
        </div>

        <button type="submit" className="btn btn-primary btn-user btn-block">
          Submit
        </button>
        <hr />
      </form>
    </>
  )
}
