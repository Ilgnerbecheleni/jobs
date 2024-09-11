import { useState, useEffect } from 'react';
import api from '../../services/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function CadastroJob() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [localidade, setLocalidade] = useState('');
  const [cepError, setCepError] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [valorHora, setValorHora] = useState('');
  const [descricao, setDescricao] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await api.get('/categorias');
      setCategorias(response.data);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post(
        'trabalhos',
        {
          titulo: nome,
          telefone,
          localizacao: localidade,
          valorHora: parseFloat(valorHora),
          servicoId: categoriaSelecionada,
          descricao
        }
      );
      setNome('');
      setTelefone('');
      setCep('');
      setLocalidade('');
      setCategoriaSelecionada('');
      setValorHora('');
      setDescricao('');
      navigate('/jobs');
      notfySucess();
    } catch (error) {
      console.error('Erro ao cadastrar job:', error);
      notifyError("Falha ao cadastrar o serviço");
    }
  };

  const notifyError = (erro) => {
    toast.error(erro, {
      position: "top-right",
      autoClose: 2000,
      pauseOnFocusLoss: false,
    });
  }

  const notfySucess = () => {
    toast.success("Usuário cadastrado!!", {
      position: "top-right"
    });
  }

  const handleCepChange = (event) => {
    let newCep = event.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    if (newCep.length > 5) {
      newCep = newCep.replace(/^(\d{5})(\d{1,3})/, '$1-$2'); // Aplica a máscara
    }
    setCep(newCep);

    // Verifica se o CEP está completo (8 dígitos)
    if (newCep.length === 9) {
      fetchCEP(newCep);
    } else {
      setCepError(false);
      setInputError(false);
    }
  };

  const handleCepBlur = () => {
    if (cep.length !== 9) {
      setInputError(true);
    }
  };

  const fetchCEP = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`);
      if (response.data.localidade) {
        setLocalidade(`${response.data.localidade}, ${response.data.uf}`);
        setCepError(false);
      } else {
        setCepError(true);
        setLocalidade('');
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      setCepError(true);
    }
  };

  return (
    <section className='container mt-5'>
      <ToastContainer limit={1} />
      <h3 className='display-4'>Cadastre um Serviço</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome de Exibição do Job</label>
          <input type="text" className="form-control" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="telefone" className="form-label">Telefone de Contato</label>
          <input type="tel" className="form-control" id="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
        </div>
        <div className={`mb-3 ${cepError || inputError ? 'has-error' : ''}`}>
          <label htmlFor="cep" className="form-label">CEP</label>
          <input
            type="text"
            className={`form-control ${cepError || inputError ? 'is-invalid' : ''}`}
            id="cep"
            value={cep}
            onChange={handleCepChange}
            onBlur={handleCepBlur}
            maxLength={9} // Para a máscara XXXXX-XXX
            required
          />
          {(cepError || inputError) && <div className="invalid-feedback">Digite um CEP válido (somente números).</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="localidade" className="form-label">Localidade (Cidade)</label>
          <input type="text" className="form-control" id="localidade" value={localidade} onChange={(e) => setLocalidade(e.target.value)} required disabled />
        </div>
        <div className="mb-3">
          <label htmlFor="valorHora" className="form-label">Valor da Hora (R$)</label>
          <input type="number" step="0.01" className="form-control" id="valorHora" value={valorHora} onChange={(e) => setValorHora(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="categoria" className="form-label">Categoria</label>
          <select className="form-select" id="categoria" value={categoriaSelecionada} onChange={(e) => setCategoriaSelecionada(e.target.value)} required>
            <option value="">Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>{categoria.NomeServico}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="descricao" className="form-label">Descrição (Opcional)</label>
          <textarea className="form-control" id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} maxLength={20} />
        </div>
        <button type="submit" className="btn btn-primary">Cadastrar Job</button>
      </form>
    </section>
  );
}

export default CadastroJob;
