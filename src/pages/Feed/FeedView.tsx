/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from "react";
import { InfiniteScroll } from "../../components/infiniteScroll";
import MomentCard from "../../components/momentCard/MomentCard";
import { Moment } from "../../interfaces/IMoment";
import { getMomentsFeed } from "../../services/feed.service";
import "./style.css";

export default function FeedView() {
  const [feed, setFeed] = useState([] as Moment[]);
  const [currentPage, setCurrentPage] = useState(0);

  const { token } = JSON.parse(localStorage.getItem("token") || "");

  useEffect(() => {
    try {
      getMomentsFeed(token, currentPage, 4).then(({ data }) => {
        setFeed([...feed, ...data]);
      });
    } catch (error) {
      console.log(error);
    }
  }, [currentPage]);

  return (
    <div className="home-container">
      <h1>Veja o que estão compartilhando 💛</h1>
      <div className="search-container">
        <form>
          <input
            type="text"
            name=""
            id=""
            placeholder="Ou busque por um momento"
          />
        </form>
        <div className="feed-container">
          <div className="moments-container">
            <ul>
              {feed?.length ? (
                feed.map(
                  ({
                    id,
                    title,
                    description,
                    username,
                    date,
                    imageUrl,
                    likes,
                    comments,
                  }) => (
                    <MomentCard
                      key={id}
                      id={id}
                      title={title}
                      description={description}
                      user={username}
                      date={date}
                      imageUrl={imageUrl}
                      likes={likes}
                      comments={comments}
                    />
                  )
                )
              ) : (
                <p>Carregando...</p>
              )}
              <InfiniteScroll callback={()=> setCurrentPage((prevPage) => prevPage + 1)} />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
