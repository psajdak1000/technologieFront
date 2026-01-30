// src/components/Card.jsx
import './Card.css';

// children to specjalny prop - to co włożymy "do środka" komponentu 
function Card({ children, title }) {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}



export default Card;