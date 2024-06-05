import './index.css'

interface RecentSearchProps {
  routeHistory: string[]
  placeHistory: string[]
  clearHistory: (type: string) => void
}

const RecentSearch = ({
  clearHistory,
  routeHistory,
  placeHistory,
}: RecentSearchProps) => {
  return (
    <div className="recentSearch">
      <div className="title">
        <p>최근 검색한 장소</p>
        <span onClick={() => clearHistory('place')}>검색 기록 삭제</span>
      </div>
      <div className="list place">
        {placeHistory.length > 0 ? (
          placeHistory.map(search => <p>{search}</p>)
        ) : (
          <span>검색 기록이 없습니다.</span>
        )}
      </div>

      <div className="title">
        <p>최근 검색한 경로</p>
        <span onClick={() => clearHistory('route')}>검색 기록 삭제</span>
      </div>
      <div className="list route">
        {routeHistory.length > 0 ? (
          routeHistory.map(search => <p>{search}</p>)
        ) : (
          <span>검색 기록이 없습니다.</span>
        )}
      </div>
    </div>
  )
}
export default RecentSearch
