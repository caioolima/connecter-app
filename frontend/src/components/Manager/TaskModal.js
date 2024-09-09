import React, { useEffect } from 'react';
import styled from 'styled-components';
import useFormManager from '../../hooks/Manager Hooks/useFormManager';

// Componente Modal para adicionar ou editar uma tarefa
const TaskModal = ({ isOpen, onClose, onSave, task }) => {
  // Define valores padrão para o formulário com base na presença de uma tarefa
  const initialFormData = task
    ? {
        title: task.taskTitle,
        description: task.taskDescription,
      }
    : {
        title: '',
        description: '',
      };

  // Inicializa o formManager com os dados da tarefa ou valores em branco
  const { formData, handleChange, resetForm } = useFormManager(initialFormData);

  useEffect(() => {
    // Atualiza o formulário quando a tarefa muda
    if (task) {
      resetForm({
        title: task.taskTitle,
        description: task.taskDescription,
      });
    } else {
      resetForm({
        title: '',
        description: '',
      });
    }
  }, [task]); // Atualiza o formulário sempre que a tarefa muda

  const handleSubmit = () => {
    onSave(formData); // Salva os dados do formulário
    handleClose(); // Fecha o modal
  };

  const handleClose = () => {
    resetForm(); // Limpa o formulário ao fechar o modal
    onClose(); // Fecha o modal
  };

  if (!isOpen) return null; // Se o modal não está aberto, não renderiza nada

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
          <Button onClick={handleSubmit} $variant="save">
            Salvar
          </Button>
          <Button onClick={handleClose} $variant="cancel">
            Cancelar
          </Button>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

// Estilização dos componentes do modal

const ModalOverlay = styled.div`
  position: fixed; /* Posiciona o overlay sobre toda a tela */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Fundo semi-transparente */
  display: flex;
  justify-content: center; /* Centraliza o modal horizontalmente */
  align-items: center; /* Centraliza o modal verticalmente */
  z-index: 1000; /* Garante que o modal fique sobre outros elementos */
`;

const ModalContent = styled.div`
  background: linear-gradient(145deg, #1a1a1a, #121212); /* Gradiente de fundo para o modal */
  padding: 20px;
  border-radius: 12px;
  width: 400px;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.3), -4px -4px 12px rgba(255, 255, 255, 0.2); /* Sombra do modal */
  color: #e0e0e0;
  text-align: center;
  border: 1px solid #333;
  transition: transform 0.3s ease-in-out;

  &:hover {
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.4), -8px -8px 16px rgba(255, 255, 255, 0.3);
    transform: scale(1.02); /* Efeito de aumento ao passar o mouse */
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
    color: #c3c3c3; /* Altera a cor ao passar o mouse */
  }
`;

const Input = styled.input`
  width: calc(100% - 24px); /* Ajusta a largura do input */
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
    border-color: #ea4f97; /* Altera a cor da borda ao focar */
  }
`;

const Textarea = styled.textarea`
  width: calc(100% - 24px); /* Ajusta a largura do textarea */
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
    border-color: #ea4f97; /* Altera a cor da borda ao focar */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between; /* Espaça os botões igualmente */
`;

const Button = styled.button`
  background-color: ${({ $variant }) =>
    $variant === 'save' ? '#ea4f97' : $variant === 'cancel' ? '#555' : '#ea4f97'};
  color: ${({ $variant }) => ($variant === 'cancel' ? '#fff' : '#e0e0e0')};
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  flex: 1;
  font-size: 0.9rem;
  margin: 0 5px;

  &:hover {
    background-color: ${({ $variant }) =>
      $variant === 'save' ? '#e60066' : $variant === 'cancel' ? '#666' : '#f291be'};
  }
`;

export default TaskModal;
