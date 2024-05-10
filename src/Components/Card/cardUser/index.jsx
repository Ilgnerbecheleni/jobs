import React, { useContext, useEffect, useState } from 'react';
import { AuthGoogleContext } from '../../../contexts/google/authGoogle';
import styles from './style.module.css'; // Importando os estilos do módulo CSS
import { FaSignOutAlt } from 'react-icons/fa';
function CardUser() {
  // Obtendo o primeiro nome do usuário
 const [photo , setPhoto]= useState()
const [name , setName]= useState()


const {signed,SignOut } = useContext(AuthGoogleContext);

  useEffect(() => {
   if(signed){
    const sessionUser = sessionStorage.getItem('@Authfirebase:user');
    const logado = JSON.parse(sessionUser);
    if (logado !== undefined) {
      setName(logado.displayName.split(' ')[0]);
   setPhoto(logado.photoURL)
    }
   }
    
  }, []);


  return (
    <div className={styles.carduser}>
   <div className={styles.carduser}>
   <img src={photo} alt="" className={styles.imguser}/>
    <h6 className={styles.nomeuser}>{name}</h6>
   </div>
    <button className={styles.btnOutlineInfo} onClick={SignOut}><FaSignOutAlt onClick={SignOut} color='white'/></button>
    
    </div>
  );
}

export default CardUser;
