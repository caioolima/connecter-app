import React, { useState, useEffect } from 'react';

const TaskModal = ({ isOpen, onClose, onSave, task }) => {
  const [formState, setFormState] = useState({ title: '', description: '' });

  useEffect(() => {
    if (task) {
      setFormState({ title: task.taskTitle, description: task.taskDescription });
    } else {
      setFormState({ title: '', description: '' }); // Limpar formulário ao abrir para adicionar uma nova tarefa
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formState);
    handleClose();
  };

  const handleClose = () => {
    setFormState({ title: '', description: '' }); // Limpar formulário ao fechar
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2 style={styles.title}>{task ? 'Editar Tarefa' : 'Adicionar Tarefa'}</h2>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={formState.title}
          onChange={handleChange}
          style={styles.input}
        />
        <textarea
          name="description"
          placeholder="Descrição"
          value={formState.description}
          onChange={handleChange}
          style={styles.textarea}
        />
        <div style={styles.buttonContainer}>
          <button
            onClick={handleSubmit}
            style={{ ...styles.button, ...styles.saveButton }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#e0e0e0')} // Cinza claro para hover
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#fff')}
          >
            Salvar
          </button>
          <button
            onClick={handleClose}
            style={{ ...styles.button, ...styles.closeButton }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#e0e0e0')} // Cinza claro para hover
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#fff')}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fundo preto translúcido
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#000', // Fundo preto do modal
    padding: '20px',
    borderRadius: '10px',
    width: '380px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
    color: '#fff', // Texto branco
    textAlign: 'center',
    border: '1px solid #333', // Borda ao redor do modal
  },
  title: {
    marginBottom: '15px',
    fontSize: '1.4rem',
    borderBottom: '1px solid #444', // Linha inferior para título
    paddingBottom: '10px',
    color: '#fff',
  },
  input: {
    width: '93%',
    padding: '10px',
    marginBottom: '12px',
    border: '1px solid #444',
    borderRadius: '8px',
    backgroundColor: '#333', // Fundo escuro para input
    color: '#fff',
    outline: 'none',
    fontSize: '0.9rem',
    transition: 'border-color 0.3s',
  },
  textarea: {
    width: '93%',
    padding: '10px',
    marginBottom: '12px',
    border: '1px solid #444',
    borderRadius: '8px',
    backgroundColor: '#333',
    color: '#fff',
    outline: 'none',
    fontSize: '0.9rem',
    height: '90px',
    transition: 'border-color 0.3s',
    resize: 'none', // Desativar redimensionamento
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#fff', // Fundo branco para o botão
    color: '#000', // Texto preto
    border: '1px solid #000', 
    padding: '10px 10px', // Diminuir o padding para botões menores
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
    flex: 1,
    fontSize: '0.8rem', // Diminuir o tamanho da fonte
  },
  saveButton: {
    marginRight: '8px',
  },
  closeButton: {
    marginLeft: '8px',
  },
};

export default TaskModal;
