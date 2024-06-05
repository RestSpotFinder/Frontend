import './index.css'

interface LoadingProps {
  className?: string
}

const Loading = ({ className }: LoadingProps) => {
  return (
    <div className={`loading ${className}`}>
      <span></span>
      <span></span>
    </div>
  )
}

export default Loading
