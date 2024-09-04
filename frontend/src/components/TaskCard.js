import React from 'react';
import styled from 'styled-components';

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <Card>
      <Title>{task.title}</Title>
      <Description>{task.description}</Description>
      <Actions>
        <Button onClick={onEdit} primary>Edit</Button>
        <Button onClick={onDelete} secondary>Delete</Button>
      </Actions>
    </Card>
  );
};

const Card = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  max-width: 400px;
  margin: 1rem auto;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.colors.primary};
  font-weight: 600;
`;

const Description = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 1rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  background-color: ${(props) =>
    props.primary ? props.theme.colors.primary : 'transparent'};
  border: ${(props) =>
    props.primary ? 'none' : `1px solid ${props.theme.colors.secondary}`};
  color: ${(props) =>
    props.primary ? '#fff' : props.theme.colors.secondary};
  padding: 0.7rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.primary ? props.theme.colors.primaryDark : props.theme.colors.secondaryLight};
    color: ${(props) =>
      props.primary ? '#fff' : props.theme.colors.primary};
  }
`;

export default TaskCard;
