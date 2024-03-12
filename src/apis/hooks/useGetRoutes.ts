import { useSuspenseQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { Route } from '@/types'

interface Request {
  start: string
  goal: string
  waypoints?: string[]
  page?: string
}

const useGetRoutes = ({ start, goal, waypoints, page = '1' }: Request) => {
  const getRoutes = async () => {
    const response = await apiClient.get(
      `/route?start=${start}&goal=${goal}&waypoints=${waypoints?.join('%7c')}&page=${page}`,
    )

    return response.data.data
  }

  return useSuspenseQuery<Route[], Error>({
    queryKey: ['routes'],
    queryFn: getRoutes,
  })
}

export default useGetRoutes
