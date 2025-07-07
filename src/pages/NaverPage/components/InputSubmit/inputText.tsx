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
import { useGetSearchSpot, useGetSearchSportsByAddress } from '@/apis/hooks'
import './inputText.css'

interface InputProps {
  place: Place | null
  setPlace: Dispatch<SetStateAction<Place | null>>
  type: 'start' | 'goal'
  isReset: boolean
  setShowRouteList: Dispatch<SetStateAction<boolean>>
  setRestSpotModalOpen: Dispatch<SetStateAction<boolean>>
  addPlaceHistory: (place: Place) => void
  inputRef?: React.RefObject<HTMLInputElement>
}

const isAddress = (input: string): boolean => {
  const roadAddressPattern = /[가-힣]{2,}(로|길|읍|면|동|리|가|구|시)/

  return roadAddressPattern.test(input)
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
  inputRef,
}: InputProps) => {
  const [placeholder, setPlaceholder] = useState<string>(
    InputType.PLACEHOLDER[type],
  )
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [placeList, setPlaceList] = useState<Place[] | undefined>([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const debouncedPlace = useDebounce(searchKeyword || '')

  // 초성일 때는 refetch 호출 X ex) 'ㄷ', 'ㅁ'
  const isSingleConsonant = (char: string) => {
    const koreanConsonantRange = /[\u3131-\u3163]/

    return koreanConsonantRange.test(char)
  }

  // 검색 조건 판별 함수
  const getSearchTerm = () => {
    if (!debouncedPlace || isSingleConsonant(debouncedPlace)) {
      return undefined
    }

    return isAddress(debouncedPlace) ? undefined : debouncedPlace
  }

  const getAddressSearchTerm = () => {
    if (!debouncedPlace || isSingleConsonant(debouncedPlace)) {
      return undefined
    }

    return isAddress(debouncedPlace) ? debouncedPlace : undefined
  }

  const { data: keywordResults } = useGetSearchSpot({
    searchTerm: getSearchTerm(),
  })
  const { data: addressResults } = useGetSearchSportsByAddress({
    addressSearchTerm: getAddressSearchTerm(),
  })

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

  useEffect(() => {
    if (keywordResults) {
      setPlaceList(keywordResults)
    } else if (addressResults) {
      setPlaceList(addressResults)
    } else if (debouncedPlace === '' || isSingleConsonant(debouncedPlace)) {
      setPlaceList([])
    }
  }, [keywordResults, addressResults, debouncedPlace])

  useEffect(() => {
    if (isReset) {
      setSearchKeyword('')
      setPlaceList([])
      setModalIsOpen(false)
    }
  }, [isReset])

  // place가 null이 될 때 searchKeyword도 초기화
  useEffect(() => {
    if (place === null) {
      setSearchKeyword('')
    }
  }, [place])

  return (
    <div
      className={`inputText ${type === 'start' ? 'start' : 'goal'} ${place ? 'selected' : ''}`}
    >
      <input
        ref={inputRef}
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
