import { useEffect, useState } from 'react';
import MomentCard from '../../components/momentCard/MomentCard';
import { getFeed } from '../../services/feed.service';
import './style.css';


export default function FeedView() {
  const [feed, setFeed] = useState([]);

  const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlN2NlYjdmZS04YmUyLTQwMzYtOTZkZC0yN2UxODJjNGJhNTkiLCJpYXQiOjE2ODM5MTgzNjIsImV4cCI6MTY4MzkyNTU2Mn0.Jw-jGfuAfpFk6-9E4KyG9sL7Wj138m0GX_J7_luvAk4";
  const t = async () => getFeed(token, 1, 4);

  useEffect(() => {
    t().then((res) => {
      setFeed(res);
    });
  }, []);

  return (
    <div className="home-container">
        <h1>Veja o que estão compartilhando 💛</h1>
        <div className="search-container">
        <form>
            <input type="text" name="" id="" placeholder="Ou busque por um momento" />
        </form>
        <div className="feed-container">
        <div className="moments-container">
            {
              feed.length ? (feed.map(({id, title, description, username ,date, imageUrl, likes, comments}) => (
                <MomentCard
                key={id}
                title={title}
                description={description}
                user={username} date={date}
                imageUrl={imageUrl}
                likes={likes}
                comments={comments} />
              ))) : (<p>Carregando...</p>)
            }
        </div>
        </div>
    </div>
    </div>
  )
}