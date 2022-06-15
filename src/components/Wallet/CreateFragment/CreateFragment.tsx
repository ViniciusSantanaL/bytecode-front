import Input from '../../Input/Input'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ICurrentRate } from '../../../types/ICurrentRate'
import { http } from '../../../service/api'
import { IExchangeRates } from '../../../types/IExchangeRates'
import { TokenDTO } from '../../../service/Auth/TokenDTO'
import { IWallet } from '../../../types/IWallet'

interface Props {
  baseWalletSymbol: string
  setWallet: React.Dispatch<React.SetStateAction<IWallet | undefined>>
}
interface FragmentWalletForm {
  balance: number
}
export default function CreateFragment({ baseWalletSymbol, setWallet }: Props) {
  const { register, handleSubmit } = useForm<FragmentWalletForm>()
  const [actualToCoin, setActualToCoin] = useState<ICurrentRate | null>()
  const [exchangeCoin, setExchangeCoin] = useState<IExchangeRates>()

  async function availableCoinsApi() {
    const promise = await http.get<IExchangeRates>('/rate/all', {
      params: {
        base: baseWalletSymbol
      }
    })
    return promise.data
  }
  useEffect(() => {
    setActualToCoin(null)
    const response = availableCoinsApi()

    response.then((data) => {
      setExchangeCoin(data)
    })
  }, [baseWalletSymbol])

  async function createFragment(symbol: string, balance: number) {
    const token = localStorage.getItem('@ByteCode:Token') as string
    const appToken = JSON.parse(token) as TokenDTO
    const promise = await http.post<IWallet>(
      '/wallet/add-fragment',
      {
        symbol: symbol,
        balance: balance
      },
      {
        headers: {
          Authorization: `Bearer ${appToken.token}`
        }
      }
    )
    return promise.data
  }

  function onSubmit({ balance }: FragmentWalletForm) {
    if (balance && actualToCoin) {
      const response = createFragment(actualToCoin.symbol, balance)
      response.then((data) => {
        setWallet(data)
      })
    }
  }
  return (
    <>
      <div className="text-center">
        <h1 className="h1 text-gray-900 mb-4">Create Fragment !</h1>
      </div>
      <form className="user" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
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
                  }}
                >
                  {exchangeRate.symbol}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="form-group">
          <Input register={register} type="number" step="0.1" name="balance" className="form-control form-control-user" placeholder="Balance" required />
        </div>

        <button type="submit" className="btn btn-primary btn-user btn-block">
          Submit
        </button>
        <hr />
      </form>
    </>
  )
}
