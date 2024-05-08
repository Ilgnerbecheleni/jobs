import Banner from "../../Components/Banner"
import CardJob from "../../Components/CardJob"
import eletric from '../../assets/energy.png'
import pedreiro from '../../assets/making-wall.png'
import pintor from '../../assets/roller-paint.png'
import carpinteiro from '../../assets/carpenter.png'
import styles from './style.module.css'; // Importando os estilos do módulo CSS

function Home() {
  return (
    <main className={styles.maincontent}>
     <Banner/>
     <div className={styles.content}>
      <h1>Encontre o serviço na medida para sua residência</h1>
      <section className={styles.cardsession}>
        <CardJob image={eletric}/>
        <CardJob image={pedreiro}/>
        <CardJob image={carpinteiro}/>
        <CardJob image={pintor}/>
      </section>
     </div>
    </main>
  )
}

export default Home
