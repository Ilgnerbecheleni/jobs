import { useEffect, useState } from "react";
import Card from "../Card";
import api from "../../services/api";
import { Alert, Pagination } from "react-bootstrap";

function ListCards() {
  const [trabalhos, setTrabalhos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [localidadeSelecionada, setLocalidadeSelecionada] = useState(""); // Estado para localidade
  const [localidades, setLocalidades] = useState([]); // Estado para armazenar localizações únicas
  const [avaliacaoMin, setAvaliacaoMin] = useState(0); // Estado para avaliação mínima
  const [trabalhosFiltrados, setTrabalhosFiltrados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Estado para a página atual
  const itemsPerPage = 5; // Número de itens por página

  useEffect(() => {
    fetchCategorias();
  }, []);

  useEffect(() => {
    const fetchTrabalhos = async () => {
      try {
        const response = await api.get("/trabalhos");
        const trabalhosData = response.data;

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

        // Extrair as localizações únicas dos trabalhos
        const uniqueLocalidades = [
          ...new Set(trabalhosWithRatings.map((trabalho) => trabalho.localizacao)),
        ];
        setLocalidades(uniqueLocalidades); // Armazena as localizações únicas
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrabalhos();
  }, []);

  useEffect(() => {
    // Filtrar os trabalhos com base na categoria, localidade e avaliação
    let trabalhosFiltrados = trabalhos;

    if (categoriaSelecionada) {
      trabalhosFiltrados = trabalhosFiltrados.filter((trabalho) => {
        return trabalho.servico.NomeServico === categoriaSelecionada;
      });
    }

    if (localidadeSelecionada) {
      trabalhosFiltrados = trabalhosFiltrados.filter((trabalho) => {
        return trabalho.localizacao === localidadeSelecionada;
      });
    }

    if (avaliacaoMin > 0) {
      trabalhosFiltrados = trabalhosFiltrados.filter((trabalho) => {
        return trabalho.mediaAvaliacoes >= avaliacaoMin;
      });
    }

    setTrabalhosFiltrados(trabalhosFiltrados);
  }, [categoriaSelecionada, localidadeSelecionada, avaliacaoMin, trabalhos]);

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

  const handleLocalidadeChange = (event) => {
    setLocalidadeSelecionada(event.target.value);
  };

  const handleAvaliacaoChange = (event) => {
    setAvaliacaoMin(event.target.value);
  };

  // Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = trabalhosFiltrados.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(trabalhosFiltrados.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return <Pagination>{items}</Pagination>;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Alert variant="danger">Error: {error.message}</Alert>
      </div>
    );
  }

  if (!trabalhos) {
    return <div>No data found</div>;
  }

  return (
    <div>
      <nav className="navbar bg-body-tertiary mb-5 mt-5">
        <div className="container-fluid">
          <form className="d-flex" role="search">
            {/* Filtro por Categoria */}
            <select
              className="form-select me-2"
              aria-label="Select"
              value={categoriaSelecionada}
              onChange={handleCategoriaChange}
            >
              <option value="">Selecione uma Categoria</option>
              {categorias.map((categoria, index) => (
                <option key={index} value={categoria.NomeServico}>
                  {categoria.NomeServico}
                </option>
              ))}
            </select>

            {/* Filtro por Localidade */}
            <select
              className="form-select me-2"
              aria-label="Select Localidade"
              value={localidadeSelecionada}
              onChange={handleLocalidadeChange}
            >
              <option value="">Selecione uma Localidade</option>
              {localidades.map((localidade, index) => (
                <option key={index} value={localidade}>
                  {localidade}
                </option>
              ))}
            </select>

            {/* Filtro por Avaliação */}
            <select
              className="form-select"
              aria-label="Avaliação Mínima"
              value={avaliacaoMin}
              onChange={handleAvaliacaoChange}
            >
              <option value={0}>Selecione Avaliação Mínima</option>
              {[1, 2, 3, 4, 5].map((avaliacao) => (
                <option key={avaliacao} value={avaliacao}>
                  {avaliacao} estrelas
                </option>
              ))}
            </select>
          </form>
        </div>
      </nav>

      <ul className="list-group">
        {currentItems.map((trabalho) => (
          <li key={trabalho.id} className="list-group-item">
            <Card
              id={trabalho.id}
              trabalho={trabalho}
              numStars={trabalho.mediaAvaliacoes || 0}
              totalStars={trabalho.totalAvaliacoes || 0}
            />
          </li>
        ))}
      </ul>

      {/* Renderizar a Paginação */}
      <div className="d-flex justify-content-center mt-4">
        {renderPagination()}
      </div>
    </div>
  );
}

export default ListCards;
