import BaseWallet from '../../components/Wallet/BaseWallet/BaseWallet'
import FragmentsWallet from '../../components/Wallet/FragmentsWallet/FragmentsWallet'
import './Wallet.scss'
import React, { useEffect, useState } from 'react'
import { IWallet } from '../../types/IWallet'
import { http } from '../../service/api'
import { TokenDTO } from '../../service/Auth/TokenDTO'
import CreateBaseWallet from '../../components/Wallet/CreateBaseWallet'
import CreateFragment from '../../components/Wallet/CreateFragment/CreateFragment'
import { IAvailableCoin } from '../../types/IAvailableCoins'

export default function Wallet() {
  const [wallet, setWallet] = useState<IWallet>()
  const [availableCoins, setAvailableCoins] = useState<IAvailableCoin[]>([])

  async function getWallet() {
    const token = localStorage.getItem('@ByteCode:Token') as string
    const appToken = JSON.parse(token) as TokenDTO
    const promise = await http.get('/wallet', {
      headers: {
        Authorization: `Bearer ${appToken.token}`
      }
    })
    return promise.data
  }

  async function availableCoinsApi() {
    const promise = await http.get<IAvailableCoin[]>('/coin/available')
    return promise.data
  }

  useEffect(() => {
    const responseWallet = getWallet()
    responseWallet
      .then((data) => setWallet(data))
      .catch((err) => {
        setWallet(undefined)
      })
    const responseAvailableCoin = availableCoinsApi()
    responseAvailableCoin.then((data) => setAvailableCoins(data))
  }, [])

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <h1 className="title">Wallet</h1>
      </div>
      {!wallet && <CreateBaseWallet setWallet={setWallet} />}
      {wallet && <BaseWallet baseSymbolBalance={wallet.baseSymbolBalance} walletBalance={wallet.walletBalance} availableCoins={availableCoins} />}
      <hr />
      {wallet && <CreateFragment setWallet={setWallet} baseWalletSymbol={wallet.baseSymbolBalance} />}
      {wallet && <FragmentsWallet fragments={wallet.walletFragments} />}
    </div>
  )
}
