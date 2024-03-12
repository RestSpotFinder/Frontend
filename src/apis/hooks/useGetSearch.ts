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
  code: number
  message: string
  data: DataT[]
}

const useGetSearch = ({ searchTerm }: Request) => {
  const getSearch = async () => {
    if (!searchTerm) return null
    const response = await apiClient.get(
      `/place/naver?searchTerm=${searchTerm}`,
    )
    return response.data.data
  }

  return useSuspenseQuery<Response[], Error>({
    queryKey: ['search'],
    queryFn: getSearch,
  })
}

export default useGetSearch
