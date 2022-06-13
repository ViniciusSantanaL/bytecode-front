import { useSetRecoilState } from 'recoil'
import { InfoCoins, listCoins } from '../../state/atom'
import { useEffect, useState } from 'react'
import { http } from '../../service/api'
import { TokenDTO } from '../../service/Auth/TokenDTO'
import { ICoinSearch } from 'types/ICoinSearch'
import { ICoinPageableResponse } from '../../types/ICoinPageableResponse'

export default function Pagination() {
  const setListCoins = useSetRecoilState<InfoCoins[]>(listCoins)

  const [totalPages, setTotalPages] = useState<number>(0)
  const [coinSearch, setCoinSearch] = useState<ICoinSearch>({ size: 10, page: 0 })
  const [currentPage, setCurrentPage] = useState<number>(1)

  let response: Promise<ICoinPageableResponse>

  async function getAllCoinsWithPageable({ symbols, page, size }: ICoinSearch): Promise<ICoinPageableResponse> {
    const token = localStorage.getItem('@ByteCode:Token') as string
    const appToken = JSON.parse(token) as TokenDTO

    const promise = await http.get<ICoinPageableResponse>('coin', {
      headers: {
        Authorization: `Bearer ${appToken.token}`
      },
      params: {
        symbols: symbols,
        page: page,
        size: size
      }
    })
    return promise.data
  }

  useEffect(() => {
    response = getAllCoinsWithPageable(coinSearch)
    if (!totalPages) {
      response.then((data) => {
        setTotalPages(data.totalPages)
      })
    }
    response.then((data) => {
      response.then((data) => {
        setListCoins(data.content)
      })
    })
  }, [coinSearch])
  const numberPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1)

  function currentPageClick(currentPag: number) {
    if (currentPag != currentPage) {
      setCoinSearch({ page: currentPag - 1, size: 10 })
      setCurrentPage(currentPag)
    }
  }
  return (
    <nav aria-label="Table">
      <ul className="pagination">
        {numberPagesArray.map((number) => (
          <li className={`page-item ${number === currentPage ? 'active' : ''}`} key={number}>
            <button className={`page-link`} onClick={() => currentPageClick(number)} disabled={currentPage === number}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
