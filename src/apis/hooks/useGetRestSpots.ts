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

  const queryKey = ['restSpots', routeId]
  return useQuery<RestSpot[], Error>({
    queryKey,
    queryFn: getRestSpots,
    enabled: !!routeId,
  })
}

export default useGetRestSpots
