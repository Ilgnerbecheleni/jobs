import  { useEffect, useState } from "react";
import Card from "../Card";
import api from "../../services/api";

function ListCards() {
  const [trabalhos, setTrabalhos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [trabalhosFiltrados, setTrabalhosFiltrados] = useState([]);

  useEffect(() => {
    fetchCategorias();
  }, []);

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
        setTrabalhosFiltrados(trabalhosWithRatings); // Inicialmente, trabalhosFiltrados contém todos os trabalhos
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrabalhos();
  }, []);

  useEffect(() => {
    // Quando a categoria selecionada muda, filtramos os trabalhos correspondentes
    if (categoriaSelecionada) {
      const trabalhosFiltrados = trabalhos.filter((trabalho) => {
        return trabalho.servico.NomeServico === categoriaSelecionada;
      });
      setTrabalhosFiltrados(trabalhosFiltrados);
    } else {
      // Se nenhuma categoria estiver selecionada, mostramos todos os trabalhos
      setTrabalhosFiltrados(trabalhos);
    }
  }, [categoriaSelecionada, trabalhos]);

  const fetchCategorias = async () => {
    try {
      const response = await api.get("categorias");
      setCategorias(response.data);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  const handleCategoriaChange = (event) => {
    setCategoriaSelecionada(event.target.value);
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
          <form className="d-flex" role="search">
            <select
              className="form-select me-2"
              aria-label="Select"
              value={categoriaSelecionada}
              onChange={handleCategoriaChange}
            >
              <option value="">Selecione uma opção</option>
              {categorias.map((categoria, index) => (
                <option key={index} value={categoria.NomeServico}>
                  {categoria.NomeServico}
                </option>
              ))}
            </select>
          </form>
        </div>
      </nav>
      <ul className="list-group ">
        {trabalhosFiltrados.map((trabalho) => (
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
