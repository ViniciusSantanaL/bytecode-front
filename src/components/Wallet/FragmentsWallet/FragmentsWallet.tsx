import { IWalletFragment } from '../../../types/IWalletFragment'
import './FragmentWallet.scss'
import React from 'react'
import { IWallet } from '../../../types/IWallet'
import { TokenDTO } from '../../../service/Auth/TokenDTO'
import { http } from '../../../service/api'
interface Props {
  fragments: Array<IWalletFragment>
  setWallet: React.Dispatch<React.SetStateAction<IWallet | undefined>>
}

export default function FragmentsWallet({ fragments, setWallet }: Props) {
  async function deleteFragmentApi(symbol: string) {
    const token = localStorage.getItem('@ByteCode:Token') as string
    const appToken = JSON.parse(token) as TokenDTO
    const promise = await http.delete<IWallet>('/wallet/del-fragment', {
      headers: {
        Authorization: `Bearer ${appToken.token}`
      },
      params: {
        symbolFragment: symbol
      }
    })
    return promise.data
  }

  function deleteFragment(symbol: string) {
    const response = deleteFragmentApi(symbol)
    response.then((data) => setWallet(data))
  }
  return (
    <>
      <div className="fragment">
        {fragments.map((fragment) => (
          <div className="card border-left-warning shadow h-100 py-2 mb-2" key={fragment.id}>
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">{fragment.symbol}</div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{fragment.balance}$</div>
                </div>
                <div className="col-auto">
                  <button className="btn btn-danger btn-circle" onClick={() => deleteFragment(fragment.symbol)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
