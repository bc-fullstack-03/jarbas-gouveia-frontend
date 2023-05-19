import React, { useContext } from "react";
import { ProfileContext } from "../../context/profile/profile.context";
import "./styles.css";

const Profile: React.FC = () => {
  const { profile } = useContext(ProfileContext);

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <div className="profile-header">
          <img
            src={profile?.profilePicture}
            alt={`Foto de perfil de ${profile?.name}`}
          />
          <div className="profile-header-stats">
            <div className="profile-identity">
              <h1>{profile?.user?.username}</h1>
              <h3>{profile?.name}</h3>
            </div>
            <div className="profile-header-data-stats">
              <div className="profile-header-stats-item">
                <h3>Momentos</h3>
                <p>{profile?.user?.moments.length}</p>
              </div>
              <div className="profile-header-stats-item">
                <h3>Seguidores</h3>
                <p>{profile?.user?.followers.length}</p>
              </div>
              <div className="profile-header-stats-item">
                <h3>Seguindo</h3>
                <p>{profile?.user?.following.length}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-info-container">
          <div className="profile-bio">
            <h2>Biografia</h2>
            <p>{profile?.bio}</p>
          </div>
          <div className="profile-stats">
            <div className="profile-stats-item">
              <h3>Localização</h3>
              <p>{profile?.location}</p>
            </div>
            <div className="profile-stats-item">
              <h3>Website</h3>
              <p>{profile?.website}</p>
            </div>
            <div className="profile-stats-item">
              <h3>Aniversário</h3>
              <p>{profile?.birthday}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
