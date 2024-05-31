import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import axios from 'axios';
function CadastroJob() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [localidade, setLocalidade] = useState('');
  const [cepError, setCepError] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [valorHora, setValorHora] = useState('');

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await api.get('categorias');
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
          valorHora: parseFloat(valorHora), // Convertendo para float
          servicoId: categoriaSelecionada
        }
      );
      console.log('Resposta da API:', response.data);
      setNome('');
      setTelefone('');
      setCep('');
      setLocalidade('');
      setCategoriaSelecionada('');
      setValorHora('');
    } catch (error) {
      console.error('Erro ao cadastrar job:', error);
    }
  };

  const handleCepChange = (event) => {
    const newCep = event.target.value;
    setCep(newCep);
    if (newCep.length === 8) {
      fetchCEP(newCep);
    } else {
      setCepError(false);
    }
  };

  const fetchCEP = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
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
        <div className={`mb-3 ${cepError ? 'has-error' : ''}`}>
          <label htmlFor="cep" className="form-label">CEP</label>
          <input type="text" className={`form-control ${cepError ? 'is-invalid' : ''}`} id="cep" value={cep} onChange={handleCepChange} required maxLength={8} />
          {cepError && <div className="invalid-feedback">Erro ao buscar CEP. Por favor, verifique o CEP e tente novamente.</div>}
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
        <button type="submit" className="btn btn-primary">Cadastrar Job</button>
      </form>
    </section>
  );
}

export default CadastroJob;