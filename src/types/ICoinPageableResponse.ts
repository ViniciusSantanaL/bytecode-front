import { InfoCoins } from '../state/atom'

export interface ICoinPageableResponse {
  content: Array<InfoCoins>
  totalElements: number
  totalPages: number
  size: number
  number: number
  numberOfElements: number
}
