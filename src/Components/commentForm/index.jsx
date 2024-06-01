import React, { useState } from 'react';
import api from '../../services/api';

function CommentForm({ trabalhoId, userSub, onCommentPosted }) {
  const [comentario, setComentario] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/comentarios', {
        comentario: comentario,
        trabalhoId: trabalhoId,
        userSub: userSub,
      });
      setComentario('');
      onCommentPosted(); // Chame a função de callback
    } catch (error) {
      setError(error.response?.data?.message || 'Erro ao postar comentário');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <label htmlFor="comentario">Comentar</label>
        <textarea
          id="comentario"
          className="form-control"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          required
        />
      </div>
      {error && <div className="alert alert-danger mt-2">{error}</div>}
      <button type="submit" className="btn btn-primary mt-2" disabled={loading}>
        {loading ? 'Postando...' : 'Postar'}
      </button>
    </form>
  );
}

export default CommentForm;
