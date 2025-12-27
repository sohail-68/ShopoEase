import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Profile = () => {
    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState(null)

    const fetchProfile = async () => {
        try {
            setLoading(true)
            
            const token = localStorage.getItem('token')
            const response = await axios.get('https://angular-server-mxyp.onrender.com/api/auth/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            
            setProfile(response.data)
            
        } catch (error) {
            console.error('Error fetching profile:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    console.log(profile);
    
    return (
        <div>
            <h2>Profile</h2>
            {profile ? (
                <div>
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    {/* Add other profile fields here */}
                </div>
            ) : (
                <div>No profile data available</div>
            )}
        </div>
    )
}

export default Profile