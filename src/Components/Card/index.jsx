import React from 'react';
import image from '../../assets/user.png';

function Card() {
  return (
    <div className="card mb-3" style={{ width: '100%', border: 'none' }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={image} className="img-fluid rounded-start w-25" alt="imagem" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <a href="#" className="btn btn-primary">Detalhes</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card;
