import loading_icon from '@/assets/loading.gif'

interface LoadingProps {
  className?: string
}

const Loading = ({ className }: LoadingProps) => {
  return (
    <div className={`flex w-full items-center justify-center ${className}`}>
      <img src={loading_icon} className="h-12 w-12" />
    </div>
  )
}

export default Loading
