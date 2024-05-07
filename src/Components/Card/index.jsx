import React from 'react';
import image from '../../assets/user.png'; // Importe sua imagem aqui
import styles from './style.module.css'; // Importando os estilos do módulo CSS
import { FaStar, FaRegStar } from 'react-icons/fa';

function Card({ numStars , categoria , nome }) {
  // Função para renderizar as estrelas com base no número recebido via props
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < numStars) {
        stars.push(<FaStar key={i} />);
      } else {
        stars.push(<FaRegStar key={i} />);
      }
    }
    return stars;
  };

  return (
    <div className={styles.card}>
      <img src={image} alt="Foto" />
      <div className={styles.info}>
        <h3>{nome}</h3>
        <p>{categoria}</p>
        <div>{renderStars()}</div> {/* Renderizando as estrelas */}
      </div>
      <button>Saiba Mais</button>
    </div>
  );
}

export default Card;
