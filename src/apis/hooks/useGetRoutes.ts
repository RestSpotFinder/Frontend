import { useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { Route } from '@/types'

interface Request {
  start: string
  goal: string
  waypoints?: string[]
  page?: string
}

const useGetRoutes = ({ start, goal, waypoints, page }: Request) => {
  const getRoutes = async () => {
    const response = await apiClient.get(
      `/route?start=${start}&goal=${goal}&page=${page}${
        waypoints ? `&waypoints=${waypoints.join('%7c')}` : ''
      }`,
    )

    return response.data.data
  }

  const queryKey = ['routes', start, goal, waypoints, page]

  return useQuery<Route[], Error>({
    queryKey,
    queryFn: getRoutes,
    enabled: false,
  })
}

export default useGetRoutes
