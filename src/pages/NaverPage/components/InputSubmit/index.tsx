import { useState, ChangeEvent, useEffect } from 'react'
import { RestartIcon, PlusIcon, RightIcon } from '@/assets/Icons'
import { StartSearchList, EndSearchList } from '..'
import useDebounce from '@/hooks/useDebounce'
import RecentSearch from '../RecentSearch'
import { useDispatch, useSelector } from 'react-redux'
import {
  startCheckedFalse,
  startClickedTrue,
  startClickedFalse,
  startReset,
} from '@/store/start'
import {
  endCheckedFalse,
  endClickedFalse,
  endClickedTrue,
  endReset,
} from '@/store/end'
import { StartState, EndState, SearchPlaceDataType } from '@/types'
import { useGetSearchSpot } from '@/apis/hooks'
import {
  clickFindPathActivate,
  clickFindPathUnactivate,
  clickMorePathDataUnactivate,
  clickRestAreaListUnactivate,
} from '@/store/click'

const InputSubmit = () => {
  const [startPointPlaceholder, setStartPointPlaceholder] =
    useState('출발지 입력')
  const [endPointPlaceholder, setEndPointPlaceholder] =
    useState<string>('도착지 입력')
  const [wayPointPlaceholder, setWayPointPlaceholder] =
    useState<string>('경유지 입력')

  const [isError, setIsError] = useState<boolean>(false)
  const [wayPoints, setWayPoints] = useState<string[]>([])
  const [search, setSearch] = useState({
    startSearchTerm: '',
    endSearchTerm: '',
    waySearchTerm: '',
  })
  const [result, setResult] = useState<SearchPlaceDataType[] | null>(null)

  const searchTerm = useDebounce(
    search.startSearchTerm || search.endSearchTerm || wayPoints.join(''),
  )

  const dispatch = useDispatch()
  const startName = useSelector((state: StartState) => state.start.name)
  const endName = useSelector((state: EndState) => state.end.name)
  const isStartChecked = useSelector(
    (state: StartState) => state.start.isChecked,
  )
  const isEndChecked = useSelector((state: EndState) => state.end.isChecked)

  const { data: searchPlace, refetch } = useGetSearchSpot({ searchTerm })

  useEffect(() => {
    if (searchPlace && searchTerm) {
      setResult(searchPlace)
      refetch()
    }
  }, [searchPlace, setResult, refetch, searchTerm])

  const [isMax, setIsMax] = useState(false)
  const [inputHeight, setInputHeight] = useState(32)

  const handleStartPlaceholderClick = () => {
    setStartPointPlaceholder('출발지를 입력하세요')
    setWayPoints([])
    dispatch(startClickedTrue())
    dispatch(endClickedFalse())
    dispatch(startCheckedFalse())
    dispatch(startReset())
    search.endSearchTerm = ''
    dispatch(clickFindPathUnactivate())
    dispatch(clickMorePathDataUnactivate())
    dispatch(clickRestAreaListUnactivate())
    setIsError(false)
  }

  const handleEndPlaceholderClick = () => {
    setEndPointPlaceholder('도착지를 입력하세요')
    setWayPoints([])
    dispatch(endClickedTrue())
    dispatch(startClickedFalse())
    dispatch(endCheckedFalse())
    dispatch(endReset())
    search.startSearchTerm = ''
    dispatch(clickFindPathUnactivate())
    dispatch(clickMorePathDataUnactivate())
    dispatch(clickRestAreaListUnactivate())
    setIsError(false)
  }

  const handleStartPlaceholderBlur = () => {
    setStartPointPlaceholder('출발지 입력')
  }

  const handleEndPlaceholderBlur = () => {
    setEndPointPlaceholder('도착지 입력')
  }

  const handleResetClick = () => {
    dispatch(startCheckedFalse())
    dispatch(endCheckedFalse())
    setWayPoints([])
    dispatch(clickFindPathUnactivate())
    dispatch(clickMorePathDataUnactivate())
    dispatch(startReset())
    dispatch(endReset())
    setSearch({ endSearchTerm: '', startSearchTerm: '', waySearchTerm: '' })
    setIsMax(false)
    dispatch(clickRestAreaListUnactivate())
    setIsError(false)
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
    if (wayPoints.length === 4) setIsMax(true)
    setInputHeight(inputHeight + 50)
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    })
  }

  const findPathButton = () => {
    dispatch(clickFindPathActivate())
    if (!startName || !endName) {
      setIsError(true)
      dispatch(clickFindPathUnactivate())
    }
  }

  return (
    <div className={`relative h-${inputHeight} w-96 bg-white p-8 `}>
      <input
        type="text"
        name="startSearchTerm"
        value={isStartChecked ? startName : search.startSearchTerm}
        onChange={handleSearchChange}
        className="h-10 w-80 rounded-t border border-l border-r border-t border-black border-b-zinc-100 p-4 placeholder-gray-400 placeholder-opacity-50"
        placeholder={startPointPlaceholder}
        onClick={handleStartPlaceholderClick}
        onBlur={handleStartPlaceholderBlur}
      />
      {search.startSearchTerm && (
        <StartSearchList result={result} setSearch={setSearch} />
      )}
      {wayPoints.map((waypoint, index) => (
        <div key={index} className="relative">
          <input
            type="text"
            name="waySearchTerm"
            className="h-10 w-80 border border-l border-r border-black border-b-zinc-100 border-t-zinc-50 p-4 placeholder-gray-400 placeholder-opacity-50"
            placeholder={wayPointPlaceholder}
            onFocus={() => setWayPointPlaceholder('경유지를 입력하세요')}
            value={waypoint}
            onChange={e => handleWaypointChange(index, e.target.value)}
          />
          {waypoint && (
            <StartSearchList result={result} setSearch={setSearch} />
          )}
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
        value={isEndChecked ? endName : search.endSearchTerm}
        onChange={handleSearchChange}
        className="h-10 w-80 rounded-b border border-b border-l border-r border-black border-t-zinc-100 p-4 placeholder-gray-400 placeholder-opacity-50"
        placeholder={endPointPlaceholder}
        onClick={handleEndPlaceholderClick}
        onBlur={handleEndPlaceholderBlur}
      />
      {search.endSearchTerm && (
        <EndSearchList result={result} setSearch={setSearch} />
      )}
      <div className="mt-3 flex h-10 w-80 justify-between bg-white">
        <button
          className="flex items-center rounded border border-gray-400 p-2"
          onClick={handleResetClick}
        >
          <RestartIcon className="mr-1" />
          <span className="mr-2">다시 입력</span>
        </button>
        <button
          className={`ml-2 flex items-center rounded border border-gray-400 p-2 ${isMax && 'hidden'}`}
          onClick={handleWaypointClick}
        >
          <PlusIcon className="mr-1" />
          <span className="mr-2">경유지</span>
        </button>
        <button
          className="ml-auto flex items-center rounded border border-gray-400 bg-green-600 p-2 text-white"
          onClick={findPathButton}
        >
          <span className="ml-1">길찾기</span>
          <RightIcon />
        </button>
      </div>
      {isError && (
        <div className=" flex justify-center  ">
          <h1 className="mt-3 font-bold text-red-600">
            출발지와 도착지를 모두 입력하세요!
          </h1>
        </div>
      )}
      <RecentSearch />
    </div>
  )
}

export default InputSubmit
