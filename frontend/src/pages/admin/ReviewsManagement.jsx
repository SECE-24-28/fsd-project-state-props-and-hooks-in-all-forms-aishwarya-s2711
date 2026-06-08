import { useState, useEffect } from 'react';
import api from '../../utils/api';
export default function ReviewsManagement() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    api.get('/admin/reviews').then(res => setReviews(res.data)).catch(console.error);
  }, []);
  return <div><h1 className="text-2xl font-bold mb-4">Reviews</h1><div>{reviews.length} reviews loaded</div></div>;
}
