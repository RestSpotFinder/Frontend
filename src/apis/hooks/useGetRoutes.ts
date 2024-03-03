import { useSuspenseQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface Request {
  start: string
  goal: string
}

interface Response {
  routeId: number | null
  routeOption: string
  createdDate: string
  coordinates: Array<[number, number]>
}

const useGetRoutes = ({ start, goal }: Request) => {
  const getRoutes = async () => {
    const response = await apiClient.get(`/route?start=${start}&goal=${goal}`)

    return response.data
  }

  return useSuspenseQuery<Response, Error>({
    queryKey: ['routes'],
    queryFn: getRoutes,
  })
}

export default useGetRoutes
