import { useSuspenseQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface Request {
  searchTerm: string | undefined
}

type DataT = {
  name: string
  lat: string
  lng: string
  category: string
  address: string
}
interface Response {
  data: DataT[]
}

const useGetSearch = ({ searchTerm }: Request) => {
  const getSearch = async () => {
    if (!searchTerm) return null
    const response = await apiClient.get(
      `/place/naver?searchTerm=${searchTerm}`,
    )
    console.log('확인', response.data)
    return response.data.data
  }

  return useSuspenseQuery<Response, Error>({
    queryKey: ['search'],
    queryFn: getSearch,
  })
}

export default useGetSearch
