import { useState } from 'react'
import restart_icon from '../../../../assets/restart.svg'
import plus_icon from '../../../../assets/plus.svg'
import right_icon from '../../../../assets/right.svg'
import { useGetSearch } from '@/apis/hooks'

const InputSubmit = () => {
  const [startPointPlaceholder, setStartPointPlaceholder] =
    useState('출발지 입력')
  const [endPointPlaceholder, setEndPointPlaceholder] = useState('도착지 입력')

  const [wayPoints, setWayPoints] = useState<string[]>([])
  const [search, setSearch] = useState({
    startSearchTerm: '',
    endSearchTerm: '',
  })
  const searchTerm = '주역'
  const { data } = useGetSearch({ searchTerm })
  console.log('데이터', data)

  const [isMax, setIsMax] = useState(false)

  const handleStartPlaceholderClick = () => {
    setStartPointPlaceholder('출발지를 입력하세요')
  }
  const handleEndPlaceholderClick = () => {
    setEndPointPlaceholder('도착지를 입력하세요')
  }

  const handleStartPlaceholderBlur = () => {
    setStartPointPlaceholder('출발지 입력')
  }
  const handleEndPlaceholderBlur = () => {
    setEndPointPlaceholder('도착지 입력')
  }
  const handleResetClick = () => {
    setWayPoints([])
    setSearch({ endSearchTerm: '', startSearchTerm: '' })
    setIsMax(false)
  }
  const handleDeleteWaypoint = (index: number) => {
    const updatedWaypoints = wayPoints.filter((_, i) => i !== index)
    setWayPoints(updatedWaypoints)
    setIsMax(false)
  }
  const handleWaypointChange = (index: number, value: string) => {
    const updatedWaypoints: string[] = [...wayPoints]
    updatedWaypoints[index] = value
    setWayPoints(updatedWaypoints)
  }
  const handleWaypointClick = () => {
    setWayPoints([...wayPoints, ''])
    console.log(wayPoints.length)
    if (wayPoints.length === 4) setIsMax(true)
  }
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    })

    console.log('데이터 확인', data)
  }
  return (
    <div className="relative h-96 w-96 bg-white p-12">
      <input
        type="text"
        name="startSearchTerm"
        value={search.startSearchTerm}
        onChange={handleSearchChange}
        className="h-10 w-80 rounded-t border border-l border-r border-t border-black border-b-zinc-100 p-4 placeholder-gray-400 placeholder-opacity-50"
        placeholder={startPointPlaceholder}
        onClick={handleStartPlaceholderClick}
        onBlur={handleStartPlaceholderBlur}
      />
      {wayPoints.map((waypoint, index) => (
        <div key={index} className="relative">
          <input
            type="text"
            className="h-10 w-80 border border-l border-r border-black border-b-zinc-100 border-t-zinc-50 p-4 placeholder-gray-400 placeholder-opacity-50"
            placeholder="경유지 입력"
            value={waypoint}
            onChange={e => handleWaypointChange(index, e.target.value)}
          />
          <button
            className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-transparent text-gray-300"
            onClick={() => handleDeleteWaypoint(index)}
          >
            -
          </button>
        </div>
      ))}
      <input
        type="text"
        name="endSearchTerm"
        value={search.endSearchTerm}
        onChange={handleSearchChange}
        className="h-10 w-80 rounded-b border border-b border-l border-r border-black border-t-zinc-100 p-4 placeholder-gray-400 placeholder-opacity-50"
        placeholder={endPointPlaceholder}
        onClick={handleEndPlaceholderClick}
        onBlur={handleEndPlaceholderBlur}
      />
      <div className="mt-3 flex h-10 w-80 justify-between bg-white">
        <button
          className="flex items-center rounded border border-gray-400 p-2"
          onClick={handleResetClick}
        >
          <img src={restart_icon} alt="restart_icon" />
          <span className="mr-2">다시 입력</span>
        </button>
        <button
          className={
            isMax
              ? `ml-2 flex hidden items-center rounded border border-gray-400 p-2`
              : `ml-2 flex items-center rounded border border-gray-400 p-2`
          }
          onClick={handleWaypointClick}
        >
          <img src={plus_icon} alt="plus_icon" className="mr-1" />
          <span className="mr-2">경유지</span>
        </button>
        <button className="ml-auto flex items-center rounded border border-gray-400 bg-green-600 p-2 text-white">
          <span className="ml-1">길찾기</span>
          <img src={right_icon} alt="right_icon" />
        </button>
      </div>
    </div>
  )
}

export default InputSubmit
