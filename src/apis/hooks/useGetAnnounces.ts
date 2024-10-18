import { useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { AxiosResponse } from 'axios';

interface Announce {
  id: number,
  title: string,
  content: string,
  createdAt: string;
}

const useGetAnnounces = () => {
  const getAnnounces = async () => {
    const response = await apiClient.get<AxiosResponse<Announce[]>>(`/notice`)

    return response.data.data
  }

  return useQuery({
    queryKey: ['announces'],
    queryFn: getAnnounces,
  })
}

export default useGetAnnounces
