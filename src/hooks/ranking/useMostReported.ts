import { api } from '@/api/client'
import { useQuery } from '@tanstack/react-query'

interface MostReported {
  contractorName: string
  reportCount: number
}

export const useMostReported = () =>
  useQuery({
    queryKey: ['getMostRated'],
    queryFn: async () => {
      const response = await api.get<MostReported[]>(
        '/api/ranking/mostReported'
      )

      return response.data
    },
  })
