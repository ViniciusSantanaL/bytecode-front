import { useRecoilValue } from 'recoil'
import { listCoins } from '../../../state/atom'

export default function CoinsTable() {
  const coinsListPageable = useRecoilValue(listCoins)
  return (
    <table className="table">
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Symbol</th>
          <th scope="col">Name</th>
        </tr>
      </thead>
      <tbody>
        {coinsListPageable.map((coin) => (
          <tr key={coin.id}>
            <td>{coin.id}</td>
            <td>{coin.symbol}</td>
            <td>{coin.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
