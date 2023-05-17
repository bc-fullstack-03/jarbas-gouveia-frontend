import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfile } from "../../services/profile.service";
import "./style.css";

export default function MomentCard({
  id,
  title,
  description,
  user,
  date,
  imageUrl,
  likes,
  comments,
}: {
  id: string;
  title: string;
  description: string;
  user: string;
  date: string;
  imageUrl: string;
  likes: any;
  comments: any;
}) {
  interface ProfileInfo {
    likes: any;
    id: number;
    username: string;
    profilePicture: string;
  }

  const [profileInfo, setProfileInfo] = useState([] as unknown as ProfileInfo);

  const data = new Date(date);

  const dia = data.getDate().toString().padStart(2, "0");
  const mes = (data.getMonth() + 1).toString().padStart(2, "0");
  const ano = data.getFullYear().toString().substr(-2);

  const dataFormatada = `${dia}/${mes}/${ano}`;

  const token = JSON.parse(localStorage.getItem("token") || "");

  useEffect(() => {
    const getInfo = async () => getProfile(token.token, user);
    getInfo().then((res) => {
      setProfileInfo(res);
    });
  }, [token.token, user]);

  let likeNumber = likes.length || 0;

  const like = () => {
    likeNumber++;
    console.log(likeNumber);
  }




  return (
    <div className="moment">
      <div className="card-moment-header-container">
        <div className="card-moment-header-wrapper">
          <img src={profileInfo.profilePicture} alt={profileInfo.username} />
          <p>{user}</p>
        </div>
        <div className="card-moment-header-wrapper-text">
          <p className="date">Em: {dataFormatada}</p>
        </div>
      </div>
      <h2>{title}</h2>
      <img src={imageUrl} alt={title} className="moment-card-image" />
      <p>{description}</p>
      <div className="interact-container">
        <div>
          <button onClick={like}>
            <i className="fa-solid fa-heart"></i> : {likeNumber}
          </button>
        </div>
        <div>
          <button>
            <i className="fa-solid fa-comment"></i>: {comments.length}
          </button>
        </div>
        <div>
          <i className="fa-solid fa-share"></i>
        </div>
      </div>

      <p>
        <Link to={`moment/${id}`}>Detalhes</Link>
      </p>
    </div>
  );
}
