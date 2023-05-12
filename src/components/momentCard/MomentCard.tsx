import "./style.css";

export default function MomentCard({
  title,
  description,
  user,
  date,
  imageUrl,
  likes,
  comments,
}: {
  title: string;
  description: string;
  user: string;
  date: string;
  imageUrl: string;
  likes: any;
  comments: any;
}) {
  return (
    <div className="moment">
      <h2>{title}</h2>
      <img src={imageUrl} alt={title} />
      <p>{description}</p>
      <p>{user}</p>
      <p className="date">Em: {date}</p>
      <div className="interact-container">
        <div>❤️: {likes.length}</div>
        <div>🗣️: {comments.length}</div>
      </div>

      <p>
        <a href="#linkdomoment">Detalhes</a>
      </p>
    </div>
  );
}
