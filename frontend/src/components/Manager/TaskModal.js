import React from 'react';
import styled from 'styled-components';
import useFormManager from '../../hooks/Manager Hooks/useFormManager'; 

const TaskModal = ({ isOpen, onClose, onSave, task }) => {
  const { formData, handleChange, resetForm } = useFormManager({
    title: task ? task.taskTitle : '',
    description: task ? task.taskDescription : '',
  });

  const handleSubmit = () => {
    onSave(formData);
    handleClose();
  };

  const handleClose = () => {
    resetForm(); // Limpar formulário ao fechar
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <Title>{task ? 'Editar Tarefa' : 'Adicionar Tarefa'}</Title>
        <Input
          type="text"
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
        />
        <Textarea
          name="description"
          placeholder="Descrição"
          value={formData.description}
          onChange={handleChange}
        />
        <ButtonContainer>
          <Button onClick={handleSubmit} save>
            Salvar
          </Button>
          <Button onClick={handleClose} cancel>
            Cancelar
          </Button>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: linear-gradient(145deg, #1a1a1a, #121212);
  padding: 20px;
  border-radius: 12px;
  width: 400px;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.3), -4px -4px 12px rgba(255, 255, 255, 0.2);
  color: #e0e0e0;
  text-align: center;
  border: 1px solid #333;
  transition: transform 0.3s ease-in-out;

  &:hover {
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.4), -8px -8px 16px rgba(255, 255, 255, 0.3);
    transform: scale(1.02);
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.6rem;
  color: #fff;
  font-weight: 700;
  position: relative;
  padding-bottom: 10px;
  border-bottom: 3px solid #ea4f97;
  transition: color 0.3s ease;

  &:hover {
    color: #c3c3c3;
  }
`;

const Input = styled.input`
  width: calc(100% - 24px);
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #444;
  border-radius: 8px;
  background-color: #333;
  color: #e0e0e0;
  outline: none;
  font-size: 1rem;
  transition: border-color 0.3s, background-color 0.3s;

  &:focus {
    border-color: #ea4f97;
  }
`;

const Textarea = styled.textarea`
  width: calc(100% - 24px);
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #444;
  border-radius: 8px;
  background-color: #333;
  color: #e0e0e0;
  outline: none;
  font-size: 1rem;
  height: 100px;
  transition: border-color 0.3s, background-color 0.3s;
  resize: none;

  &:focus {
    border-color: #ea4f97;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  background-color: ${({ save, cancel }) =>
    save ? '#ea4f97' : cancel ? '#555' : '#ea4f97'};
  color: ${({ cancel }) => (cancel ? '#fff' : '#e0e0e0')};
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  flex: 1;
  font-size: 0.9rem;
  margin: 0 5px;

  &:hover {
    background-color: ${({ save, cancel }) =>
      save ? '#e60066' : cancel ? '#666' : '#f291be'};
  }
`;

export default TaskModal;
