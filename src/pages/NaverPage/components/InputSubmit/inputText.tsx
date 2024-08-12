import {
  useState,
  ChangeEvent,
  useEffect,
  SetStateAction,
  Dispatch,
  MouseEvent,
} from 'react'
import { useDebounce } from '@/hooks'
import { Place } from '@/types'
import { useGetSearchSpot } from '@/apis/hooks'
import './inputText.css'

interface InputProps {
  place: Place | null
  setPlace: Dispatch<SetStateAction<Place | null>>
  type: 'start' | 'goal'
  isReset: boolean
  setShowRouteList: Dispatch<SetStateAction<boolean>>
  setRestSpotModalOpen: Dispatch<SetStateAction<boolean>>
  addPlaceHistory: (place: Place) => void
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
  setShowRouteList,
  setRestSpotModalOpen,
  addPlaceHistory,
}: InputProps) => {
  const [placeholder, setPlaceholder] = useState<string>(InputType.PLACEHOLDER[type])
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [placeList, setPlaceList] = useState<Place[] | undefined>([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const debouncedPlace = useDebounce(searchKeyword || '')
  const { refetch } = useGetSearchSpot({ searchTerm: debouncedPlace })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    inputValue === '' ? setPlaceList([]) : setModalIsOpen(true)
    setSearchKeyword(inputValue)

    // inputText 변경 시 화면 초기화
    if (inputValue !== searchKeyword) {
      setShowRouteList(false)
      setRestSpotModalOpen(false)
      setPlace(null)
    }
  }

  const handleClickPlace = ({
    e,
    place,
  }: {
    e: MouseEvent<HTMLDivElement>
    place: Place
  }) => {
    e.stopPropagation()
    setPlace(place)
    setPlaceList([])
    setModalIsOpen(false)
    addPlaceHistory(place)
  }

  // 초성일 때는 refetch 호출 X ex) 'ㄷ', 'ㅁ'
  const isSingleConsonant = (char: string) => {
    const koreanConsonantRange = /[\u3131-\u3163]/

    return koreanConsonantRange.test(char)
  }

  useEffect(() => {
    !isSingleConsonant(debouncedPlace) && debouncedPlace
      ? refetch().then(res => setPlaceList(res.data))
      : setPlaceList([])
  }, [debouncedPlace, refetch])

  useEffect(() => {
    if (isReset) {
      setSearchKeyword('')
      setPlaceList([])
      setModalIsOpen(false)
    }
  }, [isReset])

  return (
    <div
      className={`inputText ${type === 'start' ? 'start' : 'goal'} ${place ? 'selected' : ''}`}
    >
      <input
        type="text"
        value={place?.name || searchKeyword || ''}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={() => {
          setPlaceholder(InputType.ON_FOCUS[type])
          setModalIsOpen(true)
        }}
        onBlur={() => {
          setPlaceholder(InputType.PLACEHOLDER[type])
          setModalIsOpen(false)
        }}
      />
      {placeList && placeList.length > 0 && searchKeyword && modalIsOpen && (
        <div className="resultBox">
          {placeList?.map((place, index) => (
            <div key={index} onMouseDown={e => handleClickPlace({ e, place })}>
              <p>{place.name}</p>
              <p>{place.category}</p>
              <p>{place.address}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default InputText
