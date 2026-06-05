import { createContext, useContext, useState } from "react";

const FilterContext = createContext(null);

export const FilterProvider = ({ children }) => {
  const [area, setArea]         = useState("");
  const [date, setDate]         = useState(null);
  const [spotType, setSpotType] = useState(""); // "" | "POPUP" | "EXHIBIT"
  const [free, setFree]         = useState(null); // null | true | false
  const [ongoing, setOngoing]   = useState(null);
  const [keyword, setKeyword]   = useState("");
  const [sort, setSort]         = useState("createdAt,DESC");

  const resetFilters = () => {
    setArea(""); setDate(null); setSpotType("");
    setFree(null); setOngoing(null); setKeyword(""); setSort("createdAt,DESC");
  };

  // 백엔드 GET /spots 쿼리 파라미터로 변환
  const toQueryParams = () => {
    const params = {};
    if (area)             params.area     = area;
    if (date)             params.date     = date.toISOString().split("T")[0];
    if (spotType)         params.spotType = spotType;
    if (free !== null)    params.free     = free;
    if (ongoing !== null) params.ongoing  = ongoing;
    if (keyword)          params.keyword  = keyword;
    if (sort)             params.sort     = sort;
    return params;
  };

  return (
    <FilterContext.Provider
      value={{
        area, setArea,
        date, setDate,
        spotType, setSpotType,
        free, setFree,
        ongoing, setOngoing,
        keyword, setKeyword,
        sort, setSort,
        resetFilters,
        toQueryParams,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
export default FilterContext;
