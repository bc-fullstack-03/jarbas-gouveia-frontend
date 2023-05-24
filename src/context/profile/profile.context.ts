import React from "react";
import { IProfile } from "../../interfaces/IProfile";

export interface ProviderContextType {
    profile: IProfile;
    setContextProfile: (newProfile: IProfile) => void;
}

export const ProfileContext = React.createContext<ProviderContextType>({} as ProviderContextType);