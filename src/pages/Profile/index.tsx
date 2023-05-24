import React, { useContext, useEffect, useState } from "react";
import CustomModal from "../../components/modal";
import MomentCard from "../../components/momentCard/MomentCard";
import { ProfileContext } from "../../context/profile/profile.context";
import { Moment } from "../../interfaces/IMoment";
import { IUpdateProfile } from "../../interfaces/IUpdateProfile";
import "./styles.css";

const Profile: React.FC = () => {
  const { profile } = useContext(ProfileContext);

  const [moments, setMoments] = useState([] as unknown as Moment[]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { token } = JSON.parse(localStorage.getItem("token") || "null");

  const logout = () => {
    const check = confirm("Deseja realmente sair?");
    if (check) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {

        const getMomentsForProfile = async () => {
          const data = await fetch(`http://localhost:8080/api/v1/moments/all/user/${profile.username}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }}).then(res => res.json());
          setMoments(data);
        };
        getMomentsForProfile();


  }, [profile.username]);



  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <div className="profile-options-container">
          <button type="button" onClick={handleOpenModal}>
            <div>
              <i className="fa-solid fa-right-from-bracket"></i>
              <span>Editar</span>
            </div>
          </button>
          <button type="button" onClick={logout}>
            <div>
              <i className="fa-solid fa-right-from-bracket"></i>
              <span>Deslogar</span>
            </div>
          </button>
        </div>
        <CustomModal isOpen={modalIsOpen} onClose={handleCloseModal} initialData={profile as unknown as IUpdateProfile} />

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
        <div className="timeline-posts-container">
          <h2 className="timeline-posts-title">Momentos</h2>
          <div>
            {moments?.map((moment) => (
              <MomentCard
                key={moment.id}
                title={moment.title}
                id={moment.id}
                description={moment.description}
                user={moment.username}
                date={moment.date}
                imageUrl={moment.imageUrl}
                likes={moment.likes}
                comments={moment.comments}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
