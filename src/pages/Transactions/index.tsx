import React, { useEffect, useState } from 'react'
import './Transactions.scss'
import TableTransactions from '../../components/TrableTransactions/TableTransactions'
import { RecoilRoot } from 'recoil'
import { ITransaction } from '../../types/ITransaction'
import DoTransaction from './DoTrasnction'
import { http } from '../../service/api'
import { TokenDTO } from '../../service/Auth/TokenDTO'
import ButtonNavigate from '../../components/ButtonNavigate'
import { IUserTransactions } from '../../types/IUserTransactions'

export default function Transactions() {
  const [baseSymbol, setBaseSymbol] = useState<string | undefined>()
  const [isTransaction, setIsTransaction] = useState(false)
  const [userTransaction, setUserTransaction] = useState<ITransaction[]>([])

  async function getBaseSymbolWallet() {
    const token = localStorage.getItem('@ByteCode:Token') as string
    const appToken = JSON.parse(token) as TokenDTO
    const response = await http.get<string>('/wallet/base', {
      headers: {
        Authorization: `Bearer ${appToken.token}`
      }
    })
    return response.data
  }
  async function getAllTransactionByUser() {
    const token = localStorage.getItem('@ByteCode:Token') as string
    const appToken = JSON.parse(token) as TokenDTO
    const promise = await http.get<IUserTransactions>('/transaction', {
      headers: {
        Authorization: `Bearer ${appToken.token}`
      }
    })
    return promise.data
  }
  useEffect(() => {
    const response = getBaseSymbolWallet()
    response
      .then((data) => {
        setBaseSymbol(data)
        setIsTransaction(true)
        const responseTransaction = getAllTransactionByUser()
        responseTransaction.then((data) => setUserTransaction(data.transactions))
      })
      .catch((err) => setBaseSymbol(undefined))
  }, [])
  return (
    <RecoilRoot>
      <div className="container-home">
        {!baseSymbol && <h1 className="title">Please Do Wallet !</h1>}
        {!baseSymbol && (
          <ButtonNavigate className={'btn btn-info btn-icon-split'} path={'/wallet'}>
            Register The Wallet
          </ButtonNavigate>
        )}
        {baseSymbol && <DoTransaction baseSymbol={baseSymbol} isTransaction={isTransaction} setUserTransaction={setUserTransaction} />}
        <div className="table-transaction">{baseSymbol && <TableTransactions userTransaction={userTransaction} />}</div>
      </div>
    </RecoilRoot>
  )
}
