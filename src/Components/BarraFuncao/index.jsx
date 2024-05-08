import { NavLink } from 'react-router-dom';
import styles from './style.module.css'; // Importando o arquivo de estilos CSS Modules

function BarraFuncao() {
  return (
    <div className={styles.barraFuncao}>
      <ul className={styles.navList}>
        <li className="nav-item">
          <NavLink className={styles.btnOutlineInfo} activeClassName="active" to="/login">Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={styles.btnSuccess} to="/cadastro">Cadastre um job</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default BarraFuncao;
