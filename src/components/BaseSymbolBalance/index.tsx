import './BaseSymbolBalance.scss'

export default function BaseSymbolBalance(props: { baseSymbol: string | undefined }) {
  return (
    <div className="symbol">
      <button className="btn btn-primary btn-icon-split">
        <span className="icon text-white-50">
          <i className="fas fa-flag"></i>
        </span>
        <span className="text">{props.baseSymbol}</span>
      </button>
    </div>
  )
}
