import { useSuspenseQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { RestSpot } from '@/types'

interface Request {
  routeId: number
}

const useGetRestSpots = ({ routeId }: Request) => {
  const getRestSpots = async () => {
    const response = await apiClient.get(`/restarea/route?routeId=${routeId}`)

    return response.data.data
  }

  return useSuspenseQuery<RestSpot[], Error>({
    queryKey: ['restSpots'],
    queryFn: getRestSpots,
  })
}

export default useGetRestSpots
