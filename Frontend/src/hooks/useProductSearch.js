import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const useProductSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState("");

  // Keep input synced with URL
  useEffect(() => {
    const query = searchParams.get("search") || "";
    setSearch(query);
  }, [searchParams]);

  const handleSearch = () => {
    const value = search.trim();

    if (!value) {
    navigate("/shop");
    return;
  }
    if (location.pathname !== "/shop") {
      navigate(`/shop?search=${encodeURIComponent(value)}`);
    } else {
      navigate(`/shop?search=${encodeURIComponent(value)}`, {
        replace: true,
      });
    }
  };

  // Search when Enter is pressed
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return {
    search,
    setSearch,
    handleSearch,
    handleKeyDown,
  };
};

export default useProductSearch;