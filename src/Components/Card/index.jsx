/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { FaStar, FaRegStar, FaRegComment } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.css';
import image from '../../assets/user.png'; // Importe sua imagem aqui
import api from '../../services/api';

function Card({ trabalho, numStars, totalStars,id }) {
  const navigate = useNavigate();
  const [numComments, setNumComments] = useState(0);

  useEffect(() => {
    const fetchNumComments = async () => {
      try {
        const response = await api.get(`/comentarios/trabalho/${id}/count`);
        setNumComments(response.data.count);
      } catch (error) {
        console.error('Erro ao buscar o número de comentários:', error);
      }
    };

    fetchNumComments();
  }, [trabalho.id]);

  const navigateTo = (path) => {
    navigate(path);
  };

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

  function handleClick() {
    navigateTo(`/job/${trabalho.id}`);
  }

  return (
    <div className={styles.card}>
      {trabalho.usuario.photoUrl ? (
        <img src={trabalho.usuario.photoUrl} alt="Foto" />
      ) : (
        <img src={image} alt="Foto" />
      )}
      <div className={styles.info}>
        <h5>{trabalho.titulo}</h5>
        <p>{trabalho.servico.NomeServico}</p>
        <div>{trabalho.usuario.nome}</div>
        <div>
          {renderStars()} ({totalStars})
        </div>
        <div>
          <FaRegComment /> {numComments}
        </div>
        <div>{trabalho.localizacao}</div>
        <div>R$ {trabalho.valorHora}/h</div>
      </div>
      <button onClick={handleClick}>Saiba Mais</button>
    </div>
  );
}

export default Card;
