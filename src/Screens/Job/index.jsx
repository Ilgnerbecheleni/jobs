import React, { useContext, useEffect, useId, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaStar, FaRegStar, FaRegComment } from 'react-icons/fa';
import styles from './style.module.css';
import image from '../../assets/user.png';
import ListComentarios from '../../Components/ListComentarios';
import CommentForm from '../../Components/commentForm'; // Importar o novo componente
import api from '../../services/api';
import { AuthGoogleContext } from '../../contexts/google/authGoogle';

function Job() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trabalho, setTrabalho] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stars, setStars] = useState(0);
  const [totalstars, setTotalStars] = useState(0);
  const {  user} = useContext(AuthGoogleContext);
  const [userId, setUserId] = useState(null);
  const [teste,setTeste]= useState("teste")
  const [uid , setUid]=useState();
  const [showConfirm, setShowConfirm] = useState(false);
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trabalhoResponse = await api.get(`/trabalhos/${id}`);
        const trabalhoData = trabalhoResponse.data;
        setTrabalho(trabalhoData);
       setUserId(trabalhoData.usuarioSub);
   

        
        if (trabalhoData.usuario && trabalhoData.usuario.id) {
          const avaliacoesResponse = await api.get(`/avaliacao/${trabalhoData.usuario.id}`);
          setStars(avaliacoesResponse.data.mediaAvaliacoes);
          setTotalStars(avaliacoesResponse.data.totalAvaliacoes);
        }

        const comentariosResponse = await api.get(`/comentarios/trabalho/${id}`);
        setComentarios(comentariosResponse.data);
        console.log(comentariosResponse.data)
      } catch (err) {
        console.log(err)
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    function getUidFromSessionStorage() {
      return new Promise((resolve, reject) => {
        try {
          const uid = sessionStorage.getItem('@Authfirebase:uid');
          
          resolve(uid);
        } catch (error) {
          reject(error);
        }
      });
    }
    
    // Usando a função para obter o UID e definir no estado
    async function fetchUidAndSetState() {
      try {
        const uid = await getUidFromSessionStorage();
        setUid(uid.replace(/^"|"$/g, ''));
   //     console.log(uid);
   
      } catch (error) {
        console.error('Ocorreu um erro ao obter o UID:', error);
      }
    }


    fetchUidAndSetState()


    fetchData();
   
  }, [id, user.uid]);


  const renderStars = (numStars) => {
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
    } catch (error) {
      console.error('Erro ao atualizar comentários:', error);
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
    <div className={styles.jobDetails}>
      <div className={styles.backButton}>
        <Link to="/jobs">Voltar</Link>
      </div>
      <div className={styles.card}>
        {trabalho.usuario.photoUrl ? <img src={trabalho.usuario.photoUrl} alt="Foto" /> : <img src={image} alt="Foto" />}
        <div className={styles.info}>
          <h3>{trabalho.usuario.nome}</h3>
          <p>{trabalho.servico.NomeServico}</p>
          <div>{renderStars(stars)} ({totalstars})</div>
          <div>Telefone: {trabalho.telefone}</div>
          <div><FaRegComment /> {trabalho.numComments ? trabalho.numComments : 0}</div>
          <div>{trabalho.localizacao}</div>
          {userId === uid && (
            <div className='mt-3 w-75 d-flex justify-content-around'>
              <Link to={`/job/editar/${id}`} className="btn btn-primary">Editar Trabalho</Link>
              <button className="btn btn-danger" onClick={() => setShowConfirm(true)}>Excluir</button>
            </div>
          )}
        </div>
      </div>
      <section className={styles.listcomentarios}>
        <CommentForm 
          trabalhoId={id} 
          userSub={uid} 
          onCommentPosted={handleCommentPosted} 
        />
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
