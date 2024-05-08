
import Card from '../Card'

function ListCards() {
  return (
    <div>
        <nav className="navbar bg-body-tertiary mb-5 mt-5">
      <div className="container-fluid">
        <form className="d-flex" role="search">
          <select className="form-select me-2" aria-label="Select">
            <option value="">Selecione uma opção</option>
            <option value="pedreiro">Pedreiro</option>
            <option value="pintor">Pintor</option>
            <option value="carpinteiro">Carpinteiro</option>
            <option value="eletricista">Eletricista</option>
          </select>
          <button className="btn btn-outline-success" type="submit">Filtrar</button>
        </form>
      </div>
    </nav>
<ul className="list-group list-group-flush">
  <li className="list-group-item"><Card id={'0222'} nome={'Junior'} categoria={'pintor'} numStars={3} /></li>
  <li className="list-group-item"><Card id={'0223'} nome={'Jhon Due'} categoria={'pedreiro'} numStars={2}/></li>
  <li className="list-group-item"><Card  id={'0224'} nome={'Jhon'} categoria={'eletricista'} numStars={4}/></li>

</ul>
    </div>

  )
}

export default ListCards
