import { useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { Place } from '@/types'

interface Request {
  addressSearchTerm: string | undefined
}

const useGetSearchSportsByAdress = ({ addressSearchTerm }: Request) => {
  const getSearch = async () => {
    const response = await apiClient.get(
      `/place/naver/address?address=${addressSearchTerm}`,
    )

    return response.data
  }

  return useQuery<Place[], Error>({
    queryKey: ['searchAddress'],
    queryFn: getSearch,
    enabled: !!addressSearchTerm,
  })
}

export default useGetSearchSportsByAdress
