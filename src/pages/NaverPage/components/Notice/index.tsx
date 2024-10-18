import useGetAnnounces from '@/apis/hooks/useGetAnnounces'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { RocketIcon } from '@radix-ui/react-icons'

const Notice = () => {
  const { data: announceList } = useGetAnnounces()

  const recentAnnounce = announceList && announceList[0]
  if (!announceList) return <div></div>

  return (
    <div className="px-[2rem]">
      <Alert className="border-none bg-[#E5F1FE]">
        <RocketIcon color="#0475F5" className="h-4 w-4" />
        <AlertTitle className="font-bold text-[#0475F5]">
          {recentAnnounce?.title}
        </AlertTitle>
        <AlertDescription className="text-[#2b85ec]">
          {recentAnnounce?.content}
        </AlertDescription>
      </Alert>
    </div>
  )
}

export default Notice
