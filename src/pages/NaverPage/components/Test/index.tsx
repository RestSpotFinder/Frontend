import { useEffect, useState } from 'react'
import { List } from '..'
import useDebounce from '@/hooks/useDebounce'
import { useGetSearch } from '@/apis/hooks'
const Test = () => {
  const [search, setSearch] = useState('')
  const [result, setResult] = useState(null)

  const searchTerm = useDebounce(search)

  useEffect(() => {
    const getResult = async () => {
      return await fetch(
        `http://3.37.19.140:8080/api/place/naver?searchTerm=${searchTerm}`,
      )
        .then(res => {
          return res.json()
        })
        .then(list => {
          setResult(list)
        })
    }
    if (searchTerm) {
      console.log('searchTerm 변경 감지')
      getResult()
    }
  }, [searchTerm])
  return (
    <div>
      <input
        type="text"
        placeholder="입력하세요"
        onChange={e => setSearch(e.target.value)}
      />
      <hr />
      {search ? <List result={result} /> : ''}
    </div>
  )
}

export default Test
