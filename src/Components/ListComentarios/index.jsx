/* eslint-disable react/prop-types */


function ListComentarios({ comentarios }) {
  return (
    <div className='mt-5'>
      <h4>Comentários</h4>
      {comentarios.length > 0 ? (
        <ul className="list-group w-100 list-group-flush">
          {comentarios.map((comentario, index) => (
            <li key={index} className="list-group-item ">
              {comentario.user} : {comentario.comentario}
            </li>
          ))}
        </ul>
      ) : (
        <p>Sem comentários ainda.</p>
      )}
    </div>
  );
}

export default ListComentarios;
