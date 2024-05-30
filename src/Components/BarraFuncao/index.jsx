import { NavLink } from 'react-router-dom';
import styles from './style.module.css'; // Importando o arquivo de estilos CSS Modules
import { AuthGoogleContext } from '../../contexts/google/authGoogle';
import { useContext, useEffect, useState } from 'react';
import CardUser from '../Card/cardUser';
import { FaSignOutAlt } from 'react-icons/fa';

function BarraFuncao() {
  const [usuario, setUsuario] = useState(null);

  const { user, SignOut, signed } = useContext(AuthGoogleContext);

  useEffect(() => {
    const logado = JSON.parse(user);
    if (logado !== undefined) {
      setUsuario(logado);
      console.log(usuario)
    }
  }, []);

  return (
    <div className={styles.barraFuncao}>
      <ul className={styles.navList}>
        {/* Renderiza o botão de login apenas se o usuário não estiver logado */}
        {!signed ? (
          <li className="nav-item">
            <NavLink className={styles.btnOutlineInfo}  to="/login">Login</NavLink>
          </li>
        ) : (
          // Renderiza o botão de logout e outros elementos quando o usuário estiver autenticado
          <>
           
            <li className="nav-item d-flex align-items-center"  >
              <NavLink className={styles.btnSuccess} to="job/cadastro">Cadastre um job</NavLink>
          
            <CardUser user={usuario} />
            
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default BarraFuncao;
