import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Moment } from "../../interfaces/IMoment";
import { IProfile } from "../../interfaces/IProfile";
import { getMomentById } from "../../services/moment.service";
import { getProfileByUserId } from "../../services/profile.service";
import "./style.css";



export default function MomentDetailsView() {
  const [moment, setMoment] = useState({} as Moment);
  const [profileInfo, setProfileInfo] = useState({} as IProfile);

  const { id } = useParams();
  const { token, userId } = JSON.parse(localStorage.getItem("token") || "");

  useEffect(() => {
    const t = async () => getMomentById(token, id!);
    t().then((res) => {
      setMoment(res);
    });
  }, [id, token]);

  useEffect(() => {
    try {
      const t = async () => getProfileByUserId(token, userId!);
      t().then((res) => {
        setProfileInfo(res);
      });
    } catch (error) {
      console.log(error);
    }


  }, [token, userId]);

  return (
    <div className="moment-details-container">
      <h2>{moment.title}</h2>
      <img src={moment.imageUrl} alt="" />
      <div className="about-moment">
        <div className="moment-details-user-info-container">
          <div className="moment-details-user-info-wrapper">
          <img src={profileInfo.profilePicture} alt="" className=""/>
            <p>{moment.username}</p>
          </div>
          <div className="moment-details-post-actions">
          <div>
          <i className="fa-solid fa-heart"></i> : {moment.likes?.length}
        </div>
        <div>
          <i className="fa-solid fa-comment"></i>: {moment.comments?.length}
        </div>
        <div>
          <i className="fa-solid fa-share"></i>
        </div>
          </div>
        </div>
        <h4>{moment.description}</h4>
      </div>
    </div>
  );
}
