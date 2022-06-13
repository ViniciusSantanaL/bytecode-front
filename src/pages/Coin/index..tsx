import Pagination from '../../components/Pagination'
import { RecoilRoot } from 'recoil'
import './Coin.scss'

import CoinsTable from './Table'

export default function Coin() {
  return (
    <RecoilRoot>
      <div className="container">
        <CoinsTable />
        <div className="d-flex justify-content-center">
          <Pagination />
        </div>
      </div>
    </RecoilRoot>
  )
}
