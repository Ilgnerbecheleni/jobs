import React from 'react';
import { useParams } from 'react-router-dom';

function Job() {
  const { id } = useParams(); // Aqui estamos usando o hook useParams para pegar os parâmetros da URL
  return (
    <div>
      <h2>Detalhes do trabalhador {id}</h2>
      {/* Aqui você pode usar o id conforme necessário */}
    </div>
  );
}

export default Job;
