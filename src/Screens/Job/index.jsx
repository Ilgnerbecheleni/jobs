/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useParams, Link } from 'react-router-dom';
import { FaStar, FaRegStar, FaRegComment } from 'react-icons/fa';
import styles from './style.module.css';
import image from '../../assets/user.png'
import ListComentarios from '../../Components/ListComentarios';
function Job({  nome, categoria, numStars, numComments, location }) {
  const { id } = useParams(); // Aqui estamos usando o hook useParams para pegar os parâmetros da URL

  // Função para renderizar as estrelas com base no número recebido via props
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < 3) {
        stars.push(<FaStar key={i} />);
      } else {
        stars.push(<FaRegStar key={i} />);
      }
    }
    return stars;
  };

  return (
    <div className={styles.jobDetails}>
        <div className={styles.backButton}>
      <Link to="/jobs">Voltar</Link>
      </div>
      <div className={styles.card}>
        
        <img src={image} alt="Foto" />
        <div className={styles.info}>
          <h3>Trabalhador</h3>
          <p>Pintor</p>
          <div>{renderStars()}</div> {/* Renderizando as estrelas */}
          <div>Telefone : 00 - 00000 - 0000</div>
          <div><FaRegComment />  {numComments ? numComments : 0}</div>
          <div>{location}</div>
        </div>
      </div>
      <section className={styles.listcomentarios}>
      <ListComentarios comentarios={[{user:"silva" , comentario:"otimo profissional"},{user:"juca" , comentario:"acabamento show!"}]}/>
      </section>
    
    </div>
  );
}

export default Job;
