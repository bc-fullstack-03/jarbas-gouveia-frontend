import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addLike, hasLiked, removeLike } from "../../services/like.service";
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
  likes: Array<string>;
  comments: [];
}) {
  interface ProfileInfo {
    likes: [];
    id: number;
    username: string;
    profilePicture: string;
  }

  const [profileInfo, setProfileInfo] = useState([] as unknown as ProfileInfo);
  const [likeNumber, setLikeNumber] = useState(likes.length);

  console.log(likes);


  const data = new Date(date);

  const dia = data.getDate().toString().padStart(2, "0");
  const mes = (data.getMonth() + 1).toString().padStart(2, "0");
  const ano = data.getFullYear().toString().substr(-2);

  const dataFormatada = `${dia}/${mes}/${ano}`;

  const { token } = JSON.parse(localStorage.getItem("token") || "");

  useEffect(() => {
    const getInfo = async () => getProfile(token, user);
    getInfo().then((res) => {
      setProfileInfo(res);
    });
  }, [token, user]);

  const like = async (): Promise<void> => {
    const { data, status } = await hasLiked(id);

    if (status === 200 && data === false) {
      await addLike(id);
      setLikeNumber(likeNumber + 1);
    }

    if (status === 200 && data === true) {
      await removeLike(id);
      setLikeNumber(likeNumber - 1);
    }

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
