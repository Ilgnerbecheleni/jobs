/* eslint-disable react/prop-types */

import styles from './style.module.css'; // Importando os estilos do módulo CSS
function CardJob({image}) {
  return (
    <div className={styles.cardjob}>
      <img src={image} alt="job icone" className={styles.cardimg} />
    </div>
  )
}

export default CardJob
