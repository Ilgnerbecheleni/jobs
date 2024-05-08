/* eslint-disable react/prop-types */
import image from '../../assets/user.png'; // Importe sua imagem aqui
import styles from './style.module.css'; // Importando os estilos do módulo CSS
import { FaStar, FaRegStar, FaRegComment } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


function Card({ id ,numStars , categoria , nome,numComments }) {
  // Função para renderizar as estrelas com base no número recebido via props
  const navigate = useNavigate();

  const navigateTo = (path, navigate) => {
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
    navigateTo(`/job/${id}`, navigate);
  }

  return (
    <div className={styles.card}>
      <img src={image} alt="Foto" />
      <div className={styles.info}>
        <h3>{nome}</h3>
        <p>{categoria}</p>
        <div>{renderStars()}</div> {/* Renderizando as estrelas */}
        <div><FaRegComment />  {numComments? numComments: 0}</div>
        <div>Pirapora - MG</div>
      </div>
      <button onClick={handleClick}>Saiba Mais</button>
    </div>
  );
}

export default Card;
