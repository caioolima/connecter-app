import React from 'react';
import styled from 'styled-components';

const Modal = ({ task, onClose }) => (
  <ModalOverlay onClick={onClose}>
    <ModalContent onClick={(e) => e.stopPropagation()}>
      <ModalHeader>
        <h2>{task.taskTitle}</h2>
        <CloseButton onClick={onClose}>×</CloseButton>
      </ModalHeader>
      <ModalBody>
        <p><strong>Descrição:</strong> {task.taskDescription}</p>
        <p><strong>Data de Criação:</strong> {formatDate(task.createdAt)}</p>
        <p><strong>Status:</strong> {task.taskStatus ? 'Concluída' : 'Pendente'}</p>
      </ModalBody>
    </ModalContent>
  </ModalOverlay>
);

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
  background: #1e1e1e; /* Preto para o fundo */
  border-radius: 12px;
  padding: 20px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  position: relative;
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: 0;
  transform: scale(0.8);
  animation: fadeIn 0.3s forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #333;
  padding-bottom: 10px;
  margin-bottom: 10px;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #f5f5f5; /* Branco para o título */
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #f70073; /* Tom de rosa */
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: #f291be; /* Rosa mais claro no hover */
  }
`;

const ModalBody = styled.div`
  p {
    margin: 0 0 10px;
    color: #e0e0e0; /* Cinza claro para o texto */
    font-size: 1rem;
    line-height: 1.5;
  }

  strong {
    color: #f70073; /* Tom de rosa para os labels */
  }
`;

const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

export default Modal;
