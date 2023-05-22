import { useEffect, useState } from "react";
import userProfilePic from "../../assets/profile-thumb.png";
import { Profile } from "../../interfaces/IProfile";
import { IUser } from "../../interfaces/IUser";
import { getProfileByUserId } from "../../services/profile.service";
import { follow } from "../../services/user.service";
import "./style.css";

export default function UserCard(user: IUser) {
  const [profile, setProfile] = useState<Profile>();
  const { token } = JSON.parse(localStorage.getItem("token") || "null");

  useEffect(() => {
    try {
      const getProfile = async () => {
        const { data } = await getProfileByUserId(token, user.id);
        setProfile(data);
      };

      getProfile();
    } catch (error) {
      console.log("Error fetching profile:", error);
    }
  }, []);

  const handleFollow = async () => {
    const { status } = await follow(token, user.username);
    if (status === 202) {
      const btn = document.querySelector(`#follow-btn-${user.username}`);
      btn?.classList.add("following");
      btn?.classList.remove("follow");
      btn?.setAttribute("disabled", "true");
      btn ? (btn.innerHTML = "Seguindo") : "";
    }
  };

  return (
    <li>
      <div className="user-card">
        <div className="user-card-header">
          <div className="user-card-avatar">
            <img
              src={profile?.profilePicture || userProfilePic}
              alt={user.username}
            />
          </div>
          <div className="user-card-header-info">
            <div className="user-card-indentity">
              <h3>{user.username}</h3>
              <p>{profile?.name || "Usuário sem perfil"}</p>
            </div>
          </div>
        </div>
        <div className="user-card-stats">
          <div className="user-card-stat">
            <p>Momentos</p>
            <p>{user?.moments.length}</p>
          </div>
          <div className="user-card-stat">
            <p>Seguidores</p>
            <p>{user.followers.length}</p>
          </div>
          <div className="user-card-stat">
            <p>Seguindo</p>
            <p>{user?.following.length}</p>
          </div>
        </div>
        <div className="user-actions-btn-container">
          <button onClick={handleFollow} id={`follow-btn-${user.username}`}>
            Seguir
          </button>
        </div>
      </div>
    </li>
  );
}
