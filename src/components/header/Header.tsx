import './style.css';

function Header() {
  return (
    <aside>
          <header>
              <a className="brand">
                  <img src="" alt="Moments" />
                  <h2>Moments</h2>
              </a>
          </header>
          <nav>
              <ul className="links">
                  <li><a href="#"><span>Home</span></a></li>
                  <li id="add"><a href="#">Novo</a></li>
                  <li><a href="#">Sobre</a></li>
              </ul>
          </nav>
      </aside>
  )
}

export default Header