import React, { useContext } from 'react';
import { ProfileContext } from '../../context/profile/profile.context';

const Profile: React.FC = () => {
    const { profile } = useContext(ProfileContext);
    console.log(profile);

    return (
        <div className='profile-container'>
        <h1>Profile</h1>
        </div>
    )
}

export default Profile;