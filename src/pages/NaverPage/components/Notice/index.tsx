import useGetAnnounces from '@/apis/hooks/useGetAnnounces'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { GrAnnounce } from 'react-icons/gr'
import { RocketIcon } from '@radix-ui/react-icons'

const Notice = () => {
  const { data: announceList } = useGetAnnounces()
  
  const recentAnnounce = announceList && announceList[0]
  if(!announceList) return <div></div>
  return (
    <div className="px-[2rem]">
      <Alert className='bg-[#E5F1FE] border-none'>
        <RocketIcon color='#0475F5' className="h-4 w-4" />
        <AlertTitle className='text-[#0475F5] font-bold'>{recentAnnounce?.title}</AlertTitle>
        <AlertDescription className='text-[#2b85ec]'>{recentAnnounce?.content}</AlertDescription>
      </Alert>
    </div>
  )
}

export default Notice
