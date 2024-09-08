import React from 'react';
import styled from 'styled-components';

const UserDetails = ({ fullName, email, createdAt, username }) => (
  <DetailsCard>
    <Title>Detalhes do Usuário</Title>
    <DetailsGrid>
      <DetailItem>
        <Label>Nome:</Label>
        <Value>{fullName || 'Nome não disponível'}</Value>
      </DetailItem>
      <DetailItem>
        <Label>Email:</Label>
        <Value>{email || 'Email não disponível'}</Value>
      </DetailItem>
      <DetailItem>
        <Label>Data de Criação:</Label>
        <Value>{formatDate(createdAt) || 'Data não disponível'}</Value>
      </DetailItem>
      <DetailItem>
        <Label>Nome de Usuário:</Label>
        <Value>{username || 'Nome de usuário não disponível'}</Value>
      </DetailItem>
    </DetailsGrid>
  </DetailsCard>
);

const DetailsCard = styled.div`
  background: linear-gradient(145deg, #2c2c2c, #1e1e1e);
  padding: 30px;
  border-radius: 16px;
  color: #e0e0e0;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.3), -4px -4px 12px rgba(255, 255, 255, 0.2);
  max-width: 600px;
  height: 220px;
  margin: 40px auto;
  border: 1px solid #333;
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.4), -8px -8px 16px rgba(255, 255, 255, 0.3);
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    height: 280px; /* Ajuste a altura para telas menores */
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 700;
  position: relative;
  padding-bottom: 10px;
  border-bottom: 3px solid #ea4f97;
  transition: color 0.3s ease;

  &:hover {
    color: #c3c3c3;
  }
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  row-gap: 15px;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  font-weight: 600;
  color: #aaa;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;
  margin-bottom: 5px;
  transition: color 0.3s ease;

  &:hover {
    color: #ea4f97;
  }
`;

const Value = styled.span`
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 500;
`;

const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

export default UserDetails;
