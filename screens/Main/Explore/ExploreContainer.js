import React, { useEffect, useState } from 'react';
import ExplorePresenter from "./ExplorePresenter";

export default ({ getRooms, morePage, rooms, page }) => {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getRooms(1)
  }, []);

  useEffect(() => {
    setLoading(true);
    getRooms(page);
    setLoading(false);
  }, [page]);

  return (
    <ExplorePresenter rooms={rooms} morePage={morePage} loading={loading}/>
  )
}