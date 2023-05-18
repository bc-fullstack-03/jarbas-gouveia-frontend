import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import MomentCard from '../../components/momentCard/MomentCard';
import { Moment } from '../../interfaces/IMoment';
import { ResponseFormat } from '../../interfaces/ResponseFormat';
import { getFeed } from '../../services/feed.service';
import './style.css';


export default function FeedView() {
  const [feed, setFeed] = useState([] as Moment[]);

  const { token } = JSON.parse(localStorage.getItem('token') || '');


  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await getFeed(token, 1, 4);
        const responseFormat = response as AxiosResponse<ResponseFormat<Moment[]>>;
        setFeed(responseFormat.data as unknown as Moment[]);
      }
      catch (err) {
        console.log(err);
      }
    };
    fetchFeed();
  }, [token]);

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