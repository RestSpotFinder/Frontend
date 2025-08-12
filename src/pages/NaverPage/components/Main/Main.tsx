import { NaverMap } from '@/components'
import {
  InputSubmit,
  Title,
  PathInfo,
  RecentSearch,
  RestAreaInfo,
  Loading,
  RestAreaDetail,
} from '../'
import { useState, useEffect, useMemo } from 'react'
import { Place, Route, RouteHistory } from '@/types'
import { useGetRoutes, useGetRestSpots } from '@/apis/hooks'
import useGetRoutesBySearchId from '@/apis/hooks/useGetRoutesBySearchId.ts'
import Notice from '../Notice/Notice'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

const Main = () => {
  const [startPlace, setStartPlace] = useState<Place | null>(null)
  const [goalPlace, setGoalPlace] = useState<Place | null>(null)
  const [routeList, setRouteList] = useState<Route[]>()
  const [selectedRoute, setSelectedRoute] = useState<Route>()
  const [selectedRouteHistory, setSelectedRouteHistory] = useState<
    RouteHistory | undefined
  >()
  const [clickedRouteIndex, setClickedRouteIndex] = useState<number>(0)
  const [clickedMorePath, setClickedMorePath] = useState<boolean>(false)
  const [hasStartAndGoal, setHasStartAndGoal] = useState<boolean>(true)
  const [restSpotModalOpen, setRestSpotModalOpen] = useState<boolean>(false)
  const [showRouteList, setShowRouteList] = useState<boolean>(false)
  const [hoveredRestSpot, setHoveredRestSpot] = useState<string>('')
  const [clickedRestSpot, setClickedRestSpot] = useState<string>('')
  const [routeHistory, setRouteHistory] = useState<RouteHistory[]>([])
  const [placeHistory, setPlaceHistory] = useState<Place[]>([])
  const [clickedPlaceHistory, setClickedPlaceHistory] = useState<boolean>(false)
  const [selectedRestArea, setSelectedRestArea] = useState<any | null>(null)
  const [mapRef, setMapRef] = useState<React.RefObject<naver.maps.Map> | null>(
    null,
  )
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isNavOpen, setIsNavOpen] = useState<boolean>(true)

  // navWidthPx 계산 (px 단위)
  const navWidthPx = useMemo(() => {
    if (typeof window === 'undefined') return 0
    const fontSize =
      parseFloat(getComputedStyle(document.documentElement).fontSize) || 16

    return 25.5 * fontSize
  }, [])

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md 브레이크포인트
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // 모바일에서 네비게이션 토글
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen)
  }

  // 지도 이동 함수
  const moveToLocation = (lat: number, lng: number, zoom: number = 16) => {
    if (mapRef?.current) {
      mapRef.current.setCenter(new naver.maps.LatLng(lat, lng))
      mapRef.current.setZoom(zoom)
    }
  }

  // 지도 준비 완료 시 mapRef 저장
  const handleMapReady = (mapRef: React.RefObject<naver.maps.Map>) => {
    setMapRef(mapRef)
  }

  const {
    data: restSpotList,
    isLoading: restSpotsLoading,
    isFetching: restSpotsFetching,
  } = useGetRestSpots({
    routeId: selectedRoute?.routeId,
  })

  const { refetch: routesRefetch, isLoading: isGetRoutesLoading } =
    useGetRoutes({
      start: [startPlace?.lng, startPlace?.lat].join(','),
      goal: [goalPlace?.lng, goalPlace?.lat].join(','),
      startName: startPlace?.name,
      goalName: goalPlace?.name,
      page: '1',
    })
  const { refetch: routesBySearchIdRefetch } = useGetRoutesBySearchId({
    searchId: selectedRouteHistory?.searchId,
  })

  const handleClickSearchRoutes = async () => {
    if (startPlace && goalPlace) {
      const routes = await routesRefetch()

      setShowRouteList(true)
      setClickedMorePath(false)
      setRouteList(routes.data)
      routes.data && setSelectedRoute(routes.data[0])

      const name = startPlace?.name + ' -> ' + goalPlace?.name
      const searchId = routes.data ? routes.data[0].searchId : 0
      addRouteHistory({ name, searchId, startPlace, goalPlace })
      setHasStartAndGoal(true)
      setClickedPlaceHistory(false)
      setClickedRestSpot('')
    } else {
      setHasStartAndGoal(false)
    }
  }

  const handleClickRecentSearch = async () => {
    if (selectedRouteHistory != null && selectedRouteHistory.searchId > 0) {
      const routes = await routesBySearchIdRefetch()

      setShowRouteList(true)
      setClickedMorePath(false)
      setRouteList(routes.data)
      routes.data && setSelectedRoute(routes.data[0])
      setStartPlace(selectedRouteHistory.startPlace)
      setGoalPlace(selectedRouteHistory.goalPlace)
    }
  }

  const addRouteHistory = (routeHistoryItem: RouteHistory) => {
    const history: RouteHistory[] = JSON.parse(
      localStorage.getItem('route') || '[]',
    )
    if (history.length >= 5) history.shift()

    history.push(routeHistoryItem)
    localStorage.setItem('route', JSON.stringify(history))
    setRouteHistory(history)
  }

  const addPlaceHistory = (place: Place) => {
    const history: Place[] = JSON.parse(localStorage.getItem('place') || '[]')
    if (history.length >= 5) history.shift()

    history.push(place)
    localStorage.setItem('place', JSON.stringify(history))
    setPlaceHistory(history)
  }

  const clearHistory = (type: string) => {
    if (type) {
      localStorage.removeItem(type)
      if (type === 'route') setRouteHistory([])
      if (type === 'place') setPlaceHistory([])
    }
  }

  useEffect(() => {
    setPlaceHistory(JSON.parse(localStorage.getItem('place') || '[]'))
    setRouteHistory(JSON.parse(localStorage.getItem('route') || '[]'))
  }, [])

  // 최근 검색한 경로 클릭 이벤트 처리
  useEffect(() => {
    handleClickRecentSearch()
  }, [selectedRouteHistory])

  // 최근 검색한 장소 클릭 이벤트 처리
  useEffect(() => {
    if (startPlace && goalPlace && clickedPlaceHistory) {
      handleClickSearchRoutes()
    }
  }, [startPlace, goalPlace, clickedPlaceHistory])

  // PathInfo가 보일 때 항상 첫 번째 경로가 클릭되게
  useEffect(() => {
    if (routeList && showRouteList && routeList.length > 0) {
      setClickedRouteIndex(1)
      setSelectedRoute(routeList[0])
      setRestSpotModalOpen(true)
    }
  }, [routeList, showRouteList])

  // selectedRoute가 바뀌면 상세패널 닫기
  useEffect(() => {
    setSelectedRestArea(null)
  }, [selectedRoute])

  // 모바일에서 경로 검색 시 네비게이션 닫기
  useEffect(() => {
    if (isMobile && showRouteList) {
      setIsNavOpen(false)
    }
  }, [isMobile, showRouteList])

  return (
    <div className="box-border flex h-screen overflow-x-hidden">
      {/* 모바일 햄버거 메뉴 버튼 */}
      {isMobile && (
        <button
          onClick={toggleNav}
          className="animate-shadow-pulse fixed left-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-110 hover:animate-none"
          style={{
            boxShadow:
              '0 4px 20px rgba(0,0,0,0.3), 0 0 20px rgba(59,130,246,0.5), 0 0 40px rgba(59,130,246,0.3)',
          }}
        >
          {isNavOpen ? (
            <HiChevronLeft className="text-2xl font-bold text-blue-600" />
          ) : (
            <HiChevronRight className="text-2xl font-bold text-blue-600" />
          )}
        </button>
      )}

      {/* 네비게이션 패널 */}
      <div
        className={`z-40 flex flex-col transition-all duration-300 ${
          isMobile
            ? `fixed left-0 top-0 h-full w-full bg-white ${
                isNavOpen ? 'translate-x-0' : '-translate-x-full'
              }`
            : 'w-[25.5em] min-w-[25.5em]'
        }`}
      >
        {/* 모바일에서 외부 클릭 시 닫기 오버레이 */}
        {isMobile && isNavOpen && (
          <div
            className="absolute inset-0 z-[-1] bg-black bg-opacity-50"
            onClick={() => setIsNavOpen(false)}
          />
        )}

        <div className="box-border flex h-screen w-full flex-col overflow-hidden bg-white shadow-[2px_0_15px_rgba(0,0,0,0.2)]">
          <Title />
          <InputSubmit
            startPlace={startPlace}
            setStartPlace={setStartPlace}
            goalPlace={goalPlace}
            setGoalPlace={setGoalPlace}
            setRouteList={setRouteList}
            handleClickSearchRoutes={handleClickSearchRoutes}
            setRestSpotModalOpen={setRestSpotModalOpen}
            hasStartAndGoal={hasStartAndGoal}
            setShowRouteList={setShowRouteList}
            showRouteList={showRouteList}
            addPlaceHistory={addPlaceHistory}
            moveToLocation={moveToLocation}
            routeList={routeList}
          />
          {/* 공지사항은 PathInfo가 아닐 때만 노출 */}
          {!(routeList && showRouteList) && <Notice />}
          {isGetRoutesLoading ? (
            <Loading />
          ) : (
            <>
              {routeList && showRouteList ? (
                // 모바일에서는 RestAreaInfo가 열려있으면 PathInfo 대신 RestAreaInfo 표시
                isMobile && restSpotModalOpen ? (
                  <>
                    {selectedRestArea ? (
                      <div className="fixed inset-0 z-50 bg-white">
                        <RestAreaDetail
                          restAreaId={selectedRestArea}
                          onClose={() => setSelectedRestArea(null)}
                        />
                      </div>
                    ) : (
                      <div className="fixed inset-0 z-50 bg-white">
                        <RestAreaInfo
                          isActive={true}
                          route={selectedRoute}
                          restSpotModalOpen={restSpotModalOpen}
                          setRestSpotModalOpen={setRestSpotModalOpen}
                          hoveredRestSpot={hoveredRestSpot}
                          setHoveredRestSpot={setHoveredRestSpot}
                          clickedRestSpot={clickedRestSpot}
                          setClickedRestSpot={setClickedRestSpot}
                          clickedRouteIndex={clickedRouteIndex}
                          restSpotList={restSpotList}
                          isLoading={restSpotsLoading}
                          isFetching={restSpotsFetching}
                          setSelectedRestArea={setSelectedRestArea}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <PathInfo
                    routeList={routeList}
                    setRouteList={setRouteList}
                    selectedRoute={selectedRoute}
                    setSelectedRoute={setSelectedRoute}
                    clickedRouteIndex={clickedRouteIndex}
                    setClickedRouteIndex={setClickedRouteIndex}
                    startPlace={startPlace}
                    goalPlace={goalPlace}
                    clickedMorePath={clickedMorePath}
                    setClickedMorePath={setClickedMorePath}
                    setRestSpotModalOpen={setRestSpotModalOpen}
                    setClickedRestSpot={setClickedRestSpot}
                  />
                )
              ) : (
                <RecentSearch
                  startPlace={startPlace}
                  goalPlace={goalPlace}
                  setStartPlace={setStartPlace}
                  setGoalPlace={setGoalPlace}
                  routeHistory={routeHistory}
                  placeHistory={placeHistory}
                  clearHistory={clearHistory}
                  setSelectedRouteHistory={setSelectedRouteHistory}
                  handleClickRecentSearch={handleClickRecentSearch}
                  setClickedPlaceHistory={setClickedPlaceHistory}
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* 지도 영역 */}
      <div
        className={`box-border h-screen overflow-x-hidden ${
          isMobile ? 'w-full' : 'flex-grow'
        }`}
      >
        <NaverMap
          start={startPlace}
          goal={goalPlace}
          routeList={routeList}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
          restSpotList={routeList && showRouteList ? restSpotList : undefined}
          restSpotModalOpen={restSpotModalOpen}
          setHoveredRestSpot={setHoveredRestSpot}
          setClickedRestSpot={setClickedRestSpot}
          clickedRestSpot={clickedRestSpot}
          onMapReady={handleMapReady}
        />
      </div>
      {/* RestAreaInfo와 RestAreaDetail (웹에서만 별도 패널로 표시) */}
      {selectedRoute && restSpotModalOpen && !isMobile && (
        <>
          {selectedRestArea ? (
            // 상세 정보가 선택된 경우
            <div
              className="fixed z-40 flex h-[100%] w-[28em] scale-90 flex-col backdrop-blur transition-all duration-300"
              style={{ left: navWidthPx, top: 0 }}
            >
              <RestAreaDetail
                restAreaId={selectedRestArea}
                onClose={() => setSelectedRestArea(null)}
              />
            </div>
          ) : (
            // 휴게소 목록이 표시되는 경우
            <div
              className="fixed z-30 flex h-[100%] w-[28em] scale-90 flex-col backdrop-blur transition-all duration-300"
              style={{ left: navWidthPx, top: 0 }}
            >
              <RestAreaInfo
                isActive={true}
                route={selectedRoute}
                restSpotModalOpen={restSpotModalOpen}
                setRestSpotModalOpen={setRestSpotModalOpen}
                hoveredRestSpot={hoveredRestSpot}
                setHoveredRestSpot={setHoveredRestSpot}
                clickedRestSpot={clickedRestSpot}
                setClickedRestSpot={setClickedRestSpot}
                clickedRouteIndex={clickedRouteIndex}
                restSpotList={restSpotList}
                isLoading={restSpotsLoading}
                isFetching={restSpotsFetching}
                setSelectedRestArea={setSelectedRestArea}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Main
