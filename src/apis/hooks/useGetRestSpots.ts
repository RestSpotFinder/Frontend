import { useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { RestSpot } from '@/types'

interface Request {
  routeId: number | undefined
}

const useGetRestSpots = ({ routeId }: Request) => {
  const getRestSpots = async () => {
    const response = await apiClient.get(`/restarea/route?routeId=${routeId}`)

    return response.data.data
  }

  return useQuery<RestSpot[], Error>({
    queryKey: ['restSpots'],
    queryFn: getRestSpots,
    enabled: !!routeId,
  })
}

export default useGetRestSpots
