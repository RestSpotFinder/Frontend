import { PathInfoType } from '@/types'
import { useState } from 'react'

const PathInfo = (props: PathInfoType) => {
  const { ranking, time, distance, tollFee, fuelCost, optionText } = props
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)

  const tollInfo = tollFee === 0 ? '통행료 무료' : `통행료 ${tollFee}원`

  const handleClick = (idx: number) => {
    if (selectedIdx === idx) {
      setSelectedIdx(null) // 클릭된 인덱스가 현재 인덱스와 동일하면 선택 해제
    } else {
      setSelectedIdx(idx) // 클릭된 인덱스를 선택
    }
  }

  return (
    <div
      className={`relative h-36 w-96 border-b border-gray-300  p-8 ${
        selectedIdx !== null ? 'bg-green-100' : ''
      }`}
    >
      <div className="relative flex flex-row">
        <span className="absolute inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-600">
          <p className="text-white">{ranking + 1}</p>
        </span>
        <h1 className="mb-1 ml-7 font-bold text-green-600">{optionText}</h1>
      </div>
      <div className="flex flex-row">
        <p className="mb-2  text-3xl font-bold">{time}</p>
        <p className="mr-4 mt-2 text-lg">분</p>
        <div className="mr-2 mt-4 h-3 border-l border-gray-300"></div>
        <p className="mt-3 text-base font-bold">{distance}km</p>
      </div>
      <div className="flex flex-row">
        <p className="mr-2">{tollInfo}</p>
        <div className="mr-2 mt-1 border-l border-gray-300"></div>
        <p>연료비 {fuelCost}원</p>
      </div>
    </div>
  )
}

export default PathInfo
