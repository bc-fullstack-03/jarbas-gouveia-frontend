import React, { useState } from 'react';
import { IProfile } from '../../interfaces/IProfile';
import { ProfileContext, ProviderContextType } from './profile.context';


interface ProfileProviderProps {
  children: React.ReactNode;
}

const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const [profile, setProfile] = useState<IProfile>({} as IProfile);

  const setContextProfile = (newProfile: IProfile) => {
    setProfile(newProfile);
  };

  const providerValue: ProviderContextType = {
    profile,
    setContextProfile: setContextProfile,
  };


  return (
    <ProfileContext.Provider value={providerValue}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
