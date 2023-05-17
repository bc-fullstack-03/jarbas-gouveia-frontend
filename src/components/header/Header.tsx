import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/moments.png";
import profileLogo from "../../assets/profile-thumb.png";
import { getProfileByUserId } from "../../services/profile.service";
import "./style.css";

function Header() {


  const [profile, setProfile] = useState({} as any);
  const token = JSON.parse(localStorage.getItem("token") || "");


  useEffect(() => {
    const t = async () => getProfileByUserId(token.token, token.userId);
    t().then((res) => {
      setProfile(res);
    });
  }, [token.token, token.userId])



  return (
    <>
      <aside>
        <header>
          <a className="brand">
            <img src={logo} alt="Moments" />
            <h2>Moments</h2>
          </a>
        </header>
        <div className="header-profile-pic-container">
          <img src={profile.profilePicture || profileLogo} alt="" className="header-profile-pic"/>
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
        <a className="brand-mobile" href="#">
          <img src={logo} alt="Moments" />
          <h2>Moments</h2>
        </a>
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
