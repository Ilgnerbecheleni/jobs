
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
  <li className="list-group-item"><Card/></li>
  <li className="list-group-item"><Card/></li>
  <li className="list-group-item"><Card/></li>

</ul>
    </div>

  )
}

export default ListCards
