import { useSuspenseQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { Place } from '@/types'

interface Request {
  start: string
  goal: string
  waypoints?: string
  page?: string
}

interface Response {
  routeId: number | null
  routeOption: string
  createdDate: string
  coordinates: Array<Place>
}

const useGetRoutes = ({ start, goal, waypoints, page = '1' }: Request) => {
  const getRoutes = async () => {
    const response = await apiClient.get(
      `/route?start=${start}&goal=${goal}&waypoints=${waypoints}&page=${page}`,
    )

    return response.data.data
  }

  return useSuspenseQuery<Response[], Error>({
    queryKey: ['routes'],
    queryFn: getRoutes,
  })
}

export default useGetRoutes
