import React from 'react';
import styled from 'styled-components';

// Componente UserDetails que exibe informações detalhadas do usuário
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

// Estilo para o cartão de detalhes do usuário
const DetailsCard = styled.div`
  background: linear-gradient(145deg, #1a1a1a, #121212); /* Gradiente de fundo escuro */
  padding: 30px;
  border-radius: 16px; /* Cantos arredondados */
  color: #e0e0e0; /* Cor do texto */
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.3), -4px -4px 12px rgba(255, 255, 255, 0.2); /* Sombra do cartão */
  max-width: 600px;
  height: 220px; /* Altura fixa */
  margin: 40px auto; /* Margem superior e inferior automáticas para centralização */
  border: 1px solid #333; /* Borda do cartão */
  transition: box-shadow 0.3s ease, transform 0.3s ease; /* Transições suaves para sombra e transformação */

  &:hover {
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.4), -8px -8px 16px rgba(255, 255, 255, 0.3); /* Aumenta a sombra no hover */
    transform: scale(1.02); /* Aumenta o tamanho do cartão no hover */
  }

  @media (max-width: 768px) {
    height: 280px; /* Ajusta a altura para telas menores */
  }
`;

// Estilo para o título do cartão
const Title = styled.h2`
  font-size: 2rem; /* Tamanho da fonte */
  color: #fff; /* Cor do texto em branco */
  text-align: center; /* Alinhamento centralizado do texto */
  margin-bottom: 20px; /* Margem inferior */
  font-weight: 700; /* Peso da fonte */
  position: relative;
  padding-bottom: 10px; /* Espaçamento interno inferior */
  border-bottom: 3px solid #ea4f97; /* Linha inferior rosa */
  transition: color 0.3s ease; /* Transição suave para a cor do texto */

  &:hover {
    color: #c3c3c3; /* Cor do texto no hover */
  }
`;

// Estilo para o grid de detalhes
const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr; /* Define colunas com diferentes larguras */
  gap: 20px; /* Espaçamento entre colunas */
  row-gap: 15px; /* Espaçamento entre linhas */
`;

// Estilo para cada item de detalhe
const DetailItem = styled.div`
  display: flex;
  flex-direction: column; /* Alinha os itens verticalmente */
`;

// Estilo para os rótulos dos detalhes
const Label = styled.span`
  font-weight: 600; /* Peso da fonte */
  color: #aaa; /* Cor cinza clara */
  text-transform: uppercase; /* Transforma o texto em maiúsculas */
  font-size: 0.9rem; /* Tamanho da fonte */
  letter-spacing: 1px; /* Espaçamento entre letras */
  margin-bottom: 5px; /* Margem inferior */
  transition: color 0.3s ease; /* Transição suave para a cor do texto */

  &:hover {
    color: #ea4f97; /* Cor do rótulo no hover */
  }
`;

// Estilo para os valores dos detalhes
const Value = styled.span`
  color: #ffffff; /* Cor do texto em branco */
  font-size: 1.1rem; /* Tamanho da fonte */
  font-weight: 500; /* Peso da fonte */
`;

// Função auxiliar para formatar a data no formato DD/MM/AAAA
const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

export default UserDetails;
