import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/moments.png";
import profileLogo from "../../assets/profile-thumb.png";
import { ProfileContext } from "../../context/profile/profile.context";
import { getProfileByUserId } from "../../services/profile.service";
import "./style.css";

function Header() {
  const token = JSON.parse(localStorage.getItem("token") || "");
  const navigate = useNavigate();
  const { profile, setContextProfile} = useContext(ProfileContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, status } = await getProfileByUserId(token.token, token.userId);
        if (status === 200) {
          setContextProfile(data);
        }

        if(status === 500){
          navigate("/login");
        }
      } catch (error) {
        console.log("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

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
              <Link to="/profile">
                <div className="header-button-wrapper">
                  <i className="fa-solid fa-user"></i>
                  <span>Perfil</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/users">
                <div className="header-button-wrapper">
                  <i className="fa-solid fa-user-group"></i>
                  <span>Usuários</span>
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
