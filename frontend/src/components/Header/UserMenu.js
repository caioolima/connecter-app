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
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #333;
  padding: 0.5rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #1e1e1e;
  border: 1px solid #444;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1010;
  min-width: 150px;
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
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 0.5rem;
`;

const LogoutButton = styled.button`
  background-color: #333;
  color: #fff;
  border: 1px solid #555;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  &:hover {
    background-color: #555;
    border-color: #666;
  }
`;

export default UserMenu;
