import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MomentCard from '../../components/momentCard/MomentCard';
import { getFeed } from '../../services/feed.service';
import './style.css';


export default function FeedView() {
  const [feed, setFeed] = useState([]);
  const navigate = useNavigate();


  const token = JSON.parse(localStorage.getItem('token') || '');


  useEffect(() => {
    const t = async () => getFeed(token.token, 1, 4);
    t().then((res) => {
      if (res.status === 200) {
        setFeed(res.data);
      } else {
        navigate('/login');
      }

    });
  }, [navigate, token.token]);

  return (
      <div className="home-container">
        <h1>Veja o que estão compartilhando 💛</h1>
        <div className="search-container">
          <form>
            <input type="text" name="" id="" placeholder="Ou busque por um momento" />
          </form>
          <div className="feed-container">
            <div className="moments-container">
              {feed.length ? (feed.map(({ id, title, description, username, date, imageUrl, likes, comments }) => (
                <MomentCard
                  key={id}
                  id={id}
                  title={title}
                  description={description}
                  user={username} date={date}
                  imageUrl={imageUrl}
                  likes={likes}
                  comments={comments} />
              ))) : (<p>Carregando...</p>)}
            </div>
          </div>
        </div>
      </div>
  )
}