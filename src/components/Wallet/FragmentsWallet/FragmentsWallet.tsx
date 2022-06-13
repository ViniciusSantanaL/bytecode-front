import { IWalletFragment } from '../../types/IWalletFragment'

interface Props {
  fragments: Array<IWalletFragment>
}

export default function FragmentsWallet({ fragments }: Props) {
  return (
    <>
      {fragments.map((fragment) => (
        <div className="card border-left-warning shadow h-100 py-2" key={fragment.id}>
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">{fragment.symbol}</div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">{fragment.balance}$</div>
              </div>
              <div className="col-auto">
                <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
