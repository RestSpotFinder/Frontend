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
    if (!(start && goal)) return
    const response = await apiClient.get(
      `/route?start=${start}&goal=${goal}&waypoints=${waypoints?.join('%7c')}&page=${page}`,
    )

    return response.data.data
  }

  const enabled = !!(start.length > 5 && goal.length > 5)
  const queryKey = ['routes', start, goal, waypoints, page]

  return useQuery<Route[], Error>({
    queryKey,
    queryFn: getRoutes,
    enabled,
  })
}

export default useGetRoutes
