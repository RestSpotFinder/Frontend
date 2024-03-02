import { useState } from "react"

const InputSubmit = () => {
  const [startPointPlaceholder, setStartPointPlaceholder] =
    useState("출발지 입력")
  const [endPointPlaceholder, setEndPointPlaceholder] = useState("도착지 입력")

  const [wayPoints, setWayPoints] = useState<string[]>([])
  const [search, setSearch] = useState({
    startSearchTerm: "",
    endSearchTerm: "",
  })
  const [isMax, setIsMax] = useState(false)

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
    setSearch({ endSearchTerm: "", startSearchTerm: "" })
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
    setWayPoints([...wayPoints, ""])
    console.log(wayPoints.length)
    if (wayPoints.length === 4) setIsMax(true)
  }
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <div className="w-96 h-96 relative bg-white p-12">
      <input
        type="text"
        name="startSearchTerm"
        value={search.startSearchTerm}
        onChange={handleSearchChange}
        className="w-80 h-10 border rounded-t border-black border-t border-l border-r border-b-zinc-100 p-4 placeholder-gray-400 placeholder-opacity-50"
        placeholder={startPointPlaceholder}
        onClick={handleStartPlaceholderClick}
        onBlur={handleStartPlaceholderBlur}
      />
      {wayPoints.map((waypoint, index) => (
        <div key={index} className="relative">
          <input
            type="text"
            className="w-80 h-10 border border-black border-t-zinc-50 border-l border-r border-b-zinc-100 p-4 placeholder-gray-400 placeholder-opacity-50"
            placeholder="경유지 입력"
            value={waypoint}
            onChange={e => handleWaypointChange(index, e.target.value)}
          />
          <button
            className="absolute right-2 top-2 flex items-center justify-center border border-gray-300 rounded-full w-6 h-6 text-gray-300 bg-transparent"
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
        className="w-80 h-10 border rounded-b border-black border-b border-l border-r border-t-zinc-100 p-4 placeholder-gray-400 placeholder-opacity-50"
        placeholder={endPointPlaceholder}
        onClick={handleEndPlaceholderClick}
        onBlur={handleEndPlaceholderBlur}
      />
      <div className="w-80 h-10 bg-white flex justify-between mt-3">
        <button
          className="border rounded border-gray-400 p-2"
          onClick={handleResetClick}
        >
          다시 입력
        </button>
        <button
          className={
            isMax
              ? `border hidden rounded border-gray-400 ml-2 p-2`
              : `border rounded border-gray-400 ml-2 p-2`
          }
          onClick={handleWaypointClick}
        >
          경유지
        </button>
        <button className="border rounded border-gray-400 p-2 ml-auto text-blue-600">
          길찾기
        </button>
      </div>
    </div>
  )
}

export default InputSubmit
