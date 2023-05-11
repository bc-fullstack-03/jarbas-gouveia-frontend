import logo from "../../assets/moments.png";
import "./style.css";

function Header() {
  return (
    <>
      <aside>
        <header>
          <a className="brand">
            <img src={logo} alt="Moments" />
            <h2>Moments</h2>
          </a>
        </header>
        <nav>
          <ul className="links">
            <li>
              <a href="#">
                <i className="fa-solid fa-house" />
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-solid fa-champagne-glasses" />
                <span>Postar</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-solid fa-user"></i>
                <span>Perfil</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-solid fa-user-group"></i>
                <span>Seguidores</span>
              </a>
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
              <i className="fa-solid fa-house" />
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-solid fa-champagne-glasses" />
              <span>Postar</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-solid fa-user"></i>
              <span>Perfil</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-solid fa-user-group"></i>
              <span>Seguidores</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
