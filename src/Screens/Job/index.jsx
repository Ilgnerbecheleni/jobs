/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaStar, FaRegStar, FaRegComment, FaUserEdit, FaWhatsapp } from 'react-icons/fa';
import styles from './style.module.css';
import image from '../../assets/user.png';
import ListComentarios from '../../Components/ListComentarios';
import CommentForm from '../../Components/commentForm';
import api from '../../services/api';

import { AiFillDelete } from 'react-icons/ai';

function Job() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [trabalho, setTrabalho] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stars, setStars] = useState(0);
  const [totalStars, setTotalStars] = useState(0);
  const [numComments, setNumComments] = useState(0);
  const [comentarios, setComentarios] = useState([]);
  const [uid, setUid] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trabalhoResponse = await api.get(`/trabalhos/${id}`);
        const trabalhoData = trabalhoResponse.data;
        // console.log(trabalhoData)
        setTrabalho(trabalhoData);

        const avaliacoesResponse = await api.get(`/avaliacao/${trabalhoData.usuario.id}`);
        setStars(avaliacoesResponse.data.mediaAvaliacoes);
        setTotalStars(avaliacoesResponse.data.totalAvaliacoes);

        const comentariosResponse = await api.get(`/comentarios/trabalho/${id}`);
        setComentarios(comentariosResponse.data);
        setNumComments(comentariosResponse.data.length);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const getUidFromSessionStorage = () => {
      return new Promise((resolve, reject) => {
        try {
          const uid = sessionStorage.getItem('@Authfirebase:uid');
          resolve(uid ? uid.replace(/^"|"$/g, '') : '');
        } catch (error) {
          reject(error);
        }
      });
    };

    async function fetchUidAndSetState() {
      try {
        const uid = await getUidFromSessionStorage();
        setUid(uid);
      } catch (error) {
        console.error('Ocorreu um erro ao obter o UID:', error);
      }
    }

    fetchUidAndSetState();
    fetchData();
  }, [id]);

  const renderStars = (numStars) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < numStars ? <FaStar key={i} /> : <FaRegStar key={i} />);
    }
    return stars;
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/trabalhos/${id}`, { data: { sub: uid } });
      navigate('/jobs');
    } catch (error) {
      console.error('Erro ao deletar job:', error);
    }
  };

  const handleCommentPosted = async () => {
    try {
      const comentariosResponse = await api.get(`/comentarios/trabalho/${id}`);
      setComentarios(comentariosResponse.data);
      setNumComments(comentariosResponse.data.length);
    } catch (error) {
      console.error('Erro ao atualizar comentários:', error);
    }
  };

  const handleStarClick = async (rating) => {
    try {
      await api.post(`/avaliacao/${trabalho.usuario.id}`, {
        classificacao: rating,
      });
      const avaliacoesResponse = await api.get(`/avaliacao/${trabalho.usuario.id}`);
      setStars(avaliacoesResponse.data.mediaAvaliacoes);
      setTotalStars(avaliacoesResponse.data.totalAvaliacoes);
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!trabalho) {
    return <div>No data found</div>;
  }

  return (
    <div className={`container ${styles.jobDetails}`}>
      <div className={styles.backButton}>
        <Link to="/jobs">Voltar</Link>
      </div>
      <div className={styles.card}>
        {trabalho.usuario.photoUrl ? (
          <img src={trabalho.usuario.photoUrl} alt="Foto" />
        ) : (
          <img src={image} alt="Foto" />
        )}
        <div className={styles.info}>
          <h3>{trabalho.usuario.nome}</h3>
          <p>{trabalho.servico.NomeServico}</p>
          <p className={styles.descricaoStyle}>{trabalho.descricao}</p>
          <div>
            {renderStars(stars)} ({totalStars})
          </div>
          <div>
            <FaRegComment /> {numComments}
          </div>
          <div>{trabalho.localizacao}</div>
          <div className='d-flex align-align-items-center h-50'>
  Contato: {trabalho.telefone ? (
    <span className=''>
      {trabalho.telefone}{' '}
      <a
        className="whatsapp-link"
        href={`http://api.whatsapp.com/send?1=pt_BR&phone=${trabalho.telefone}&text= Olá ${trabalho.usuario.nome.split(' ')[0]} ,Gostei do seu perfil profissional, poderia me passar informações?`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={26} color='green' className='pb-1'/>
      </a>
    </span>
  ) : (
    "sem contato"
  )}
</div>
          <div>R$ {trabalho.valorHora}/h</div>
          
          {trabalho.usuario.sub === uid && (
            <div className="mt-3 w-75 d-flex justify-content-center gap-5">
              <Link to={`/job/editar/${id}`} className="btn btn-primary"><FaUserEdit size={22}/></Link>
              <button className="btn btn-danger" onClick={() => setShowConfirm(true)}><AiFillDelete size={22} /></button>
            </div>
          )}
        
        </div>
     
      </div>
      <h5 className='text-black-50 mt-3'>Avalie o Profissional</h5>
      <div className={styles.starRating}>
   
        {[1, 2, 3, 4, 5].map((rating) => (
          <FaStar
            key={rating}
            size={28}
            className={rating <= stars ? styles.filledStar : styles.emptyStar}
            onClick={() => handleStarClick(rating)}
          />
        ))}
      </div>
      <section className={styles.listcomentarios}>
        <CommentForm trabalhoId={id} userSub={uid} onCommentPosted={handleCommentPosted} />
        <ListComentarios comentarios={comentarios} />
      </section>

      {showConfirm && (
        <div className={styles.confirmModal}>
          <div className={styles.confirmModalContent}>
            <h5>Você tem certeza que deseja excluir este trabalho?</h5>
            <div className={styles.alignbuttons}>
              <button className="btn btn-danger" onClick={handleDelete}>Sim</button>
              <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Não</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Job;
