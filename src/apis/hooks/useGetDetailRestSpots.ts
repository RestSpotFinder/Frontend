import { useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { DetailRestSpot } from '@/types'

interface Request {
  restareaId: string | undefined
}

const useGetDetailRestSpots = ({ restareaId }: Request) => {
  const getDetailRestSpots = async () => {
    const response = await apiClient.get(
      `/restarea/detail?restareaId=${restareaId}`,
    )
    return response.data
  }

  return useQuery<DetailRestSpot, Error>({
    queryKey: ['detailRestSpots'],
    queryFn: getDetailRestSpots,
    enabled: !!restareaId,
  })
}

export default useGetDetailRestSpots
