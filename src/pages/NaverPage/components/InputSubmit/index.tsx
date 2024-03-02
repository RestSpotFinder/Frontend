import { useState } from "react"

const InputSubmit = () => {
  const [startPointPlaceholder, setStartPointPlaceholder] =
    useState("출발지 입력")
  const [endPointPlaceholder, setEndPointPlaceholder] = useState("도착지 입력")
  const [wayPoints, setWayPoints] = useState<string[]>([])

  const handleStartPlaceholderClick = () => {
    setStartPointPlaceholder("출발지를 입력하세요")
  }
  const handleEndPlaceholderClick = () => {
    setEndPointPlaceholder("도착지를 입력하세요")
  }
  const handleStartPlaceholderBlur = () => {
    setStartPointPlaceholder("출발지 입력")
  }
  const handleEndPlaceholderBlur = () => {
    setEndPointPlaceholder("도착지 입력")
  }
  const handleResetClick = () => {
    setWayPoints([])
  }
  const handleDeleteWaypoint = (index: number) => {
    const updatedWaypoints = wayPoints.filter((_, i) => i !== index)
    setWayPoints(updatedWaypoints)
  }
  const handleWaypointChange = (index: number, value: string) => {
    const updatedWaypoints: string[] = [...wayPoints]
    updatedWaypoints[index] = value
    setWayPoints(updatedWaypoints)
  }
  const handleWaypointClick = () => {
    setWayPoints([...wayPoints, ""])
  }

  return (
    <div className="w-96 h-96 relative left-16 bg-white p-12">
      <input
        type="text"
        className="w-80 h-10 border border-black border-t border-l border-r border-b-gray-300"
        placeholder={startPointPlaceholder}
        onClick={handleStartPlaceholderClick}
        onBlur={handleStartPlaceholderBlur}
      />
      {wayPoints.map((waypoint, index) => (
        <div key={index} className="relative">
          <input
            type="text"
            className="w-80 h-10 border border-black border-b border-l border-r border-t-gray-300"
            placeholder="경유지 입력"
            value={waypoint}
            onChange={e => handleWaypointChange(index, e.target.value)}
          />
          <button
            className="absolute right-2 top-2 text-red-600"
            onClick={() => handleDeleteWaypoint(index)}
          >
            -
          </button>
        </div>
      ))}
      <input
        type="text"
        className="w-80 h-10 border border-black border-b border-l border-r border-t-gray-300"
        placeholder={endPointPlaceholder}
        onClick={handleEndPlaceholderClick}
        onBlur={handleEndPlaceholderBlur}
      />
      <div className="w-80 h-10 bg-white flex justify-between mt-3">
        <button
          className="border border-gray-400 p-2"
          onClick={handleResetClick}
        >
          다시 입력
        </button>
        <button
          className="border border-gray-400 ml-2 p-2"
          onClick={handleWaypointClick}
        >
          경유지
        </button>
        <button className="border border-gray-400 p-2 ml-auto text-blue-600">
          길찾기
        </button>
      </div>
    </div>
  )
}

export default InputSubmit
