import {
  useState,
  ChangeEvent,
  useEffect,
  SetStateAction,
  Dispatch,
  MouseEvent,
} from 'react'
import { useDebounce } from '@/hooks'
import { SearchPlaceDataType } from '@/types'
import { useGetSearchSpot } from '@/apis/hooks'
import './inputText.css'

interface InputProps {
  place: SearchPlaceDataType | null
  setPlace: Dispatch<SetStateAction<SearchPlaceDataType | null>>
  type: 'start' | 'goal'
  isReset: boolean
  setHasStartAndGoal: Dispatch<SetStateAction<boolean>>
  setShowRouteList: Dispatch<SetStateAction<boolean>>
  setRestSpotModalOpen: Dispatch<SetStateAction<boolean>>
  setStartPlace: Dispatch<SetStateAction<SearchPlaceDataType | null>>
  setGoalPlace: Dispatch<SetStateAction<SearchPlaceDataType | null>>
  addPlaceHistory: (place: string) => void
}

const InputType = {
  PLACEHOLDER: {
    start: '출발지 입력',
    goal: '도착지 입력',
  },
  ON_FOCUS: {
    start: '출발지를 입력하세요.',
    goal: '도착지를 입력하세요.',
  },
}

const InputText = ({
  place,
  setPlace,
  type,
  isReset,
  setHasStartAndGoal,
  setShowRouteList,
  setRestSpotModalOpen,
  setStartPlace,
  setGoalPlace,
  addPlaceHistory,
}: InputProps) => {
  const [placeholder, setPlaceholder] = useState<string>(
    InputType.PLACEHOLDER[type],
  )
  const [searchedPlace, setSearchedPlace] = useState<string>('')
  const [placeList, setPlaceList] = useState<SearchPlaceDataType[] | undefined>(
    [],
  )
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const debouncedPlace = useDebounce(searchedPlace || '')
  const { refetch } = useGetSearchSpot({ searchTerm: debouncedPlace })

  const handleFocus = () => {
    setPlaceholder(InputType.ON_FOCUS[type])
    setModalIsOpen(true)
  }

  const handleBlur = () => {
    setPlaceholder(InputType.PLACEHOLDER[type])
    setModalIsOpen(false)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value === '' ? setPlaceList([]) : setModalIsOpen(true)
    e.target.value !== '' && setHasStartAndGoal(true)
    setSearchedPlace(e.target.value)
    if (e.target.value !== searchedPlace) {
      setShowRouteList(false)
      setRestSpotModalOpen(false)
      if (type === 'start') setStartPlace(null)
      else if (type === 'goal') setGoalPlace(null)
    }
  }

  const handleClickPlace = ({
    e,
    place,
  }: {
    e: MouseEvent<HTMLDivElement>
    place: SearchPlaceDataType
  }) => {
    e.stopPropagation()
    setPlace(place)
    setSearchedPlace(place.name)
    setPlaceList([])
    setModalIsOpen(false)
    addPlaceHistory(place.name)
  }

  useEffect(() => {
    debouncedPlace
      ? refetch().then(res => setPlaceList(res.data))
      : setPlaceList([])
  }, [debouncedPlace, refetch])

  useEffect(() => {
    if (isReset) {
      setSearchedPlace('')
      setPlaceList([])
      setModalIsOpen(false)
    }
  }, [isReset])

  return (
    <div className={`inputText ${type === 'start' ? 'start' : 'goal'} ${place ? 'selected' : ''}`}>
      <input
        type="text"
        value={searchedPlace}
        onChange={handleChange}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {placeList && placeList.length > 0 && searchedPlace && modalIsOpen && (
        <div className="resultBox">
          {placeList?.map((place, index) => (
            <div key={index} onMouseDown={e => handleClickPlace({ e, place })}>
              <p>{place.name}</p>
              <p>{place.category}</p>
              <p className="w-full text-xs text-slate-600">{place.address}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default InputText
