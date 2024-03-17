import { useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { SearchPlaceDataType } from '@/types'
interface Request {
  searchTerm: string | undefined
}

const useGetSearchSpot = ({ searchTerm }: Request) => {
  const getSearch = async () => {
    const response = await apiClient.get(
      `/place/naver?searchTerm=${searchTerm}`,
    )

    return response.data.data
  }

  return useQuery<SearchPlaceDataType[], Error>({
    queryKey: ['search'],
    queryFn: getSearch,
    enabled: !!searchTerm,
  })
}

export default useGetSearchSpot
