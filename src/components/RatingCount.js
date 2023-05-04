import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AllOrder() {
  axios.defaults.withCredentials = true;

  const [Rating, setRating] = useState([]);
  const [User, setUser] = useState([]);
  useEffect(() => {
    try {
      async function getRating() {
        let res = await axios.get(
          'http://localhost:3001/api/seller/rating/count'
        );
        setRating(res.data.rating);
        setUser(res.data.user);
      }
      getRating();
    } catch (e) {
      console.error(e);
    }
  }, []);

  async function Count() {
    const userId = User.map((v) => v.user_id);
    const stars = User.map(
      (v) =>
        Math.round(
          (Rating.filter((i) => i.seller_id === v.user_id).reduce(
            (acc, pilot) => acc + pilot.stars,
            0
          ) /
            Rating.filter((i) => i.seller_id === v.user_id).length) *
            10
        ) / 10
    );
    await axios.put('http://localhost:3001/api/seller/rating/stars', {
      stars,
      userId,
    });
  }

  return (
    <>
      <div className="text-center p-5 bg-orange">
        <button className="btn btn-primary-300" onClick={Count}>
          reset
        </button>
      </div>
    </>
  );
}

export default AllOrder;
