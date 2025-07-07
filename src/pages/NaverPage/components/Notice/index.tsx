import useGetAnnounces from '@/apis/hooks/useGetAnnounces'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { RocketIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

const Notice = () => {
  const { data: announceList } = useGetAnnounces()
  const [open, setOpen] = useState(true)

  // @ts-ignore
  const recentAnnounce = announceList && announceList[0]
  if (!announceList) return <div></div>

  return (
    <div className="px-[2rem]">
      <div
        className="mb-2 flex cursor-pointer select-none items-center gap-1"
        onClick={() => setOpen(o => !o)}
      >
        <span
          className="mr-1 text-2xl font-bold leading-none text-[#0475F5]"
          style={{
            userSelect: 'none',
            width: '20px',
            display: 'inline-block',
            textAlign: 'center',
          }}
        >
          {open ? '−' : '+'}
        </span>
        <span className="align-middle text-base font-bold text-[#0475F5]">
          공지사항
        </span>
      </div>
      {open && (
        <Alert className="border-none bg-[#E5F1FE]">
          <RocketIcon color="#0475F5" className="h-4 w-4" />
          <AlertTitle className="font-bold text-[#0475F5]">
            {recentAnnounce?.title}
          </AlertTitle>
          <AlertDescription className="whitespace-pre-line text-[#2b85ec]">
            {recentAnnounce?.content.replace(/\. /g, '.\n')}
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

export default Notice
