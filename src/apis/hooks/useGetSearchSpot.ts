import { useSuspenseQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { SearchPlaceDataType } from '@/types'
interface Request {
  searchTerm: string | undefined
}

const useGetSearchSpot = ({ searchTerm }: Request) => {
  const getSearch = async () => {
    if (!searchTerm) return null
    const response = await apiClient.get(
      `/place/naver?searchTerm=${searchTerm}`,
    )

    return response.data.data
  }

  return useSuspenseQuery<SearchPlaceDataType[], Error>({
    queryKey: ['search'],
    queryFn: getSearch,
  })
}

export default useGetSearchSpot
