import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem("token"); // 🔐 Replace with actual auth token (from context/localStorage)
console.log(token);

  // Fetch pending follow requests
  const fetchFollowRequests = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/auth/users/follow-requests', {
        headers: {
          Authorization: `${token}`
        }
      });
      setRequests(res.data.followRequests || []);
    } catch (error) {
      console.error('Error fetching follow requests:', error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Approve or reject request
  const handleRespond = async (requesterId, action) => {
    try {
      const res = await axios.post(
        'http://localhost:5001/api/auth/users/follow-request/respond',
        { requesterId, action },
        {
          headers: {
            Authorization: `${token}`
          }
        }
      );
      alert(res.data.message);
      // Refresh the list
      fetchFollowRequests();
    } catch (error) {
      console.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    fetchFollowRequests();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Follow Requests</h2>
      {loading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? (
        <p>No follow requests</p>
      ) : (
        requests.map((user) => (
          <div key={user._id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
            <p><strong>{user.username}</strong></p>
            <button onClick={() => handleRespond(user._id, 'approve')} style={{ marginRight: '0.5rem' }}>Approve</button>
            <button onClick={() => handleRespond(user._id, 'reject')}>Reject</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Request;
