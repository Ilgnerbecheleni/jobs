import axios from 'axios';
import { useState } from 'react';

function CadastroJob() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [localidade, setLocalidade] = useState('');
  const [cepError, setCepError] = useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode enviar os dados do formulário para onde desejar
    // Por exemplo, você pode enviar para uma API ou lidar com os dados localmente
    // props.onSubmit({ nome, telefone, cep, localidade });
    // Após o envio, você pode limpar os campos se necessário
    // setNome('');
    // setTelefone('');
    // setCep('');
    // setLocalidade('');
  };

  const handleCepChange = (event) => {
    const newCep = event.target.value;
    setCep(newCep);
    if (newCep.length === 8) { // Verifica se o CEP possui 8 caracteres (formato padrão)
      fetchCEP(newCep);
    } else {
      // Limpa o erro quando o usuário começa a digitar novamente
      setCepError(false);
    }
  };


  const fetchCEP = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.localidade) {
        setLocalidade(response.data.localidade);
        console.log(response.data)
        // Limpa o erro se a consulta for bem-sucedida
        setCepError(false);
      } else {
        // Define o erro se a cidade não for encontrada na resposta da API
        setCepError(true);
        setLocalidade('');
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      // Define o erro se ocorrer um erro durante a consulta ao CEP
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
        <input type="text" className={`form-control ${cepError ? 'is-invalid' : ''}`} id="cep" value={cep} onChange={handleCepChange} required  maxLength={8}/>
        {cepError && <div className="invalid-feedback">Erro ao buscar CEP. Por favor, verifique o CEP e tente novamente.</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="localidade" className="form-label">Localidade (Cidade)</label>
        <input type="text" className="form-control" id="localidade" value={localidade} onChange={(e) => setLocalidade(e.target.value)} required disabled />
      </div>
      <button type="submit" className="btn btn-primary">Cadastrar Job</button>
    </form>
</section>
  );
}

export default CadastroJob;
