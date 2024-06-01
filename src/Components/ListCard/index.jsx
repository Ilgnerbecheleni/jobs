/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Card from "../Card";
import api from "../../services/api";

function ListCards() {
  const [trabalhos, setTrabalhos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await api.get("categorias");
      setCategorias(response.data);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  useEffect(() => {
    const fetchTrabalhos = async () => {
      try {
        const response = await api.get("/trabalhos");
        const trabalhosData = response.data;
        console.table(response.data);

        // Fetching evaluations for each trabalho
        const trabalhosWithRatings = await Promise.all(
          trabalhosData.map(async (trabalho) => {
            try {
              const avaliacoesResponse = await api.get(
                `/avaliacao/${trabalho.usuario.id}`
              );
              const { mediaAvaliacoes, totalAvaliacoes } =
                avaliacoesResponse.data;
              return {
                ...trabalho,
                mediaAvaliacoes,
                totalAvaliacoes,
              };
            } catch (error) {
              console.error(
                `Erro ao obter avaliações para o usuário ${trabalho.usuario.id}`,
                error
              );
              return {
                ...trabalho,
                mediaAvaliacoes: 0,
                totalAvaliacoes: 0,
              };
            }
          })
        );

        setTrabalhos(trabalhosWithRatings);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrabalhos();
  }, []);

  const handleCategoriaChange = (event) => {
    setCategoriaSelecionada(event.target.value);
  };

  const handleFiltrarSubmit = (event) => {
    event.preventDefault();

    // Lógica de filtragem dos trabalhos com base na categoria selecionada
    const trabalhosFiltrados = trabalhos.filter((trabalho) => {
      return trabalho.servico.NomeServico === categoriaSelecionada;
    });

    setTrabalhos(trabalhosFiltrados);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <nav className="navbar bg-body-tertiary mb-5 mt-5">
        <div className="container-fluid">
          <form className="d-flex" role="search" onSubmit={handleFiltrarSubmit}>
            <select
              className="form-select me-2"
              aria-label="Select"
              value={categoriaSelecionada}
              onChange={handleCategoriaChange}
            >
              <option value="">Selecione uma opção</option>
              {categorias.map((categoria, index) => (
                <option key={index} value={categoria}>
                  {categoria.NomeServico}
                </option>
              ))}
            </select>
            <button className="btn btn-outline-success" type="submit">
              Filtrar
            </button>
          </form>
        </div>
      </nav>
      <ul className="list-group list-group-flush">
        {trabalhos.map((trabalho) => (
          <li key={trabalho.id} className="list-group-item">
            <Card
              trabalho={trabalho}
              numStars={trabalho.mediaAvaliacoes || 0}
              totalStars={trabalho.totalAvaliacoes || 0}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListCards;
