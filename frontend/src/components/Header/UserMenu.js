// UserMenu.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';

const UserMenu = ({ name, onLogout }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <UserMenuContainer>
      <UserIcon onClick={toggleUserMenu}>
        <FaUserCircle />
      </UserIcon>
      {isUserMenuOpen && (
        <DropdownMenu>
          <UserName>{name}</UserName>
          <LogoutButton onClick={onLogout}>Logout</LogoutButton>
        </DropdownMenu>
      )}
    </UserMenuContainer>
  );
};

const UserMenuContainer = styled.div`
  position: relative;
`;

const UserIcon = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #007aff;
  border: 1px solid #0051a8;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1010;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const UserName = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 0.5rem;
`;

const LogoutButton = styled.button`
  background-color: #0051a8;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #003d7a;
  }
`;

export default UserMenu;
