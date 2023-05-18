import React from "react";
import { Profile } from "../../interfaces/IProfile";

export interface ProviderContextType {
    profile: Profile;
    setContextProfile: (newProfile: Profile) => void;
}

export const ProfileContext = React.createContext<ProviderContextType>({} as ProviderContextType);