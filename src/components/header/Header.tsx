import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/moments.png";
import profileLogo from "../../assets/profile-thumb.png";
import { Profile } from "../../interfaces/IProfile";
import { ResponseFormat } from "../../interfaces/ResponseFormat";
import { getProfileByUserId } from "../../services/profile.service";
import "./style.css";





function Header() {
  const [profile, setProfile] = useState<Profile>({} as Profile);
  const token = JSON.parse(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const req = await getProfileByUserId(token.token, token.userId);
        const resData = req as AxiosResponse<ResponseFormat<Profile>>;
        if (resData.status === 200) {
          setProfile(resData.data as unknown as Profile);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [navigate, token.token, token.userId]);

  return (
    <>
      <aside>
        <header>
          <Link to="/" className="brand">
            <img src={logo} alt="Moments" />
            <h2>Moments</h2>
          </Link>
        </header>
        <div className="header-profile-pic-container">
          <img
            src={profile.profilePicture || profileLogo}
            alt=""
            className="header-profile-pic"
          />
          <p>{profile.username}</p>
        </div>
        <nav>
          <ul className="links">
            <li>
              <Link to="/">
                <div className="header-button-wrapper">
                  <i className="fa-solid fa-house" />
                  <span>Home</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/new-moment" id="add">
                <div className="header-button-wrapper">
                  <i className="fa-solid fa-champagne-glasses" />
                  <span>Postar</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/">
                <div className="header-button-wrapper">
                  <i className="fa-solid fa-user"></i>
                  <span>Perfil</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/">
                <div className="header-button-wrapper">
                  <i className="fa-solid fa-user-group"></i>
                  <span>Seguidores</span>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="mobile-header">
        <Link to="/" className="brand-mobile">
          <img src={logo} alt="Moments" />
          <h2>Moments</h2>
        </Link>
      </div>
      <nav className="footer-bar">
        <ul className="foot-links">
          <li>
            <a href="#">
              <i className="fa-solid fa-house"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-solid fa-champagne-glasses"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-solid fa-user"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-solid fa-user-group"></i>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
