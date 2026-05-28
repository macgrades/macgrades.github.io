import "./Card.css";
const Card = ({ id, children }) => {
  return (
    <div className="card" id={id}>
      {children}
    </div>
  );
};

export default Card;
