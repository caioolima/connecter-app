import React from 'react';
import styled from 'styled-components';

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <Card>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <Actions>
        <Button onClick={onEdit}>Edit</Button>
        <Button onClick={onDelete}>Delete</Button>
      </Actions>
    </Card>
  );
};

const Card = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Actions = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  border: none;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
  }
`;

export default TaskCard;
