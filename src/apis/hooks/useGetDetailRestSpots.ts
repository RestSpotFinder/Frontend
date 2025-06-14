import { useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { DetailRestSpot, RestAreaDetailInfoList } from '@/types'

interface Request {
  restAreaId: number
}

const useGetDetailRestSpots = ({ restAreaId }: Request) => {
  const getDetailRestSpots = async () => {
    const response = await apiClient.get(
      `/restarea/detail?restareaId=${restAreaId}`,
    )
    return response.data.data
  }

  return useQuery<DetailRestSpot, Error>({
    queryKey: ['detailRestSpots'],
    queryFn: getDetailRestSpots,
    enabled: !!restAreaId,
  })
}

export default useGetDetailRestSpots
