import { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import MomentCard from '../../components/momentCard/MomentCard';
import { getFeed } from '../../services/feed.service';
import './style.css';


export default function FeedView() {
  const [feed, setFeed] = useState([]);

  const token = JSON.parse(localStorage.getItem('token') || '');

  const t = async () => getFeed(token.token, 1, 4);

  useEffect(() => {
    t().then((res) => {
      setFeed(res);
    });
  }, [t, token.token]);

  return (
    <><Header /><main className='container'>
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
    </main></>
  )
}