import { ITransaction } from '../../types/ITransaction'

interface Props {
  userTransaction: ITransaction[]
}
export default function TableTransactions({ userTransaction }: Props) {
  return (
    <div className="table-transaction">
      <div className="d-flex justify-content-center">
        <h1 className="title-sub ">Transactions</h1>
      </div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Amount</th>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Rate</th>
            <th scope="col">Result</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {userTransaction.map((trade, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{trade.amount}</td>
              <td>{trade.fromSymbol}</td>
              <td>{trade.toSymbol}</td>
              <td>{trade.rate} $</td>
              <td>{trade.result.toString()} $</td>
              <td>{trade.register.toString().substring(0, 19).replace('T', ' | ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
