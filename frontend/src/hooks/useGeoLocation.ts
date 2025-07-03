import { useState, useEffect } from "react";
import useMapStore from "../stores/mapStore";
import { useMap } from "./useMap";

export const useGeoLocation = (options = {}) => {
  const { setPosition } = useMapStore();
  const { fetchRestaurants } = useMap();

  const [error, setError] = useState("");

  const handleSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;

    setPosition({
      lat: latitude,
      lng: longitude,
    });

    fetchRestaurants({ lat: latitude, lng: longitude, radius: 5 });
  };

  const handleError = (err: GeolocationPositionError) => {
    setError(err.message);
  };

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError("위치 기능을 지원하지 않습니다");
      return;
    }

    geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, []);

  return { location, error };
};
