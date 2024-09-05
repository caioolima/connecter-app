  // src/pages/UserTasksPage.js
  import React, { useEffect, useState, useRef } from 'react';
  import styled from 'styled-components';
  import { useNavigate } from 'react-router-dom';
  import { jwtDecode } from 'jwt-decode'; // Corrigido a importação de jwt-decode
  import { FaEllipsisV } from 'react-icons/fa'; // Importa o ícone de menu

  const UserTasksPage = () => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [filter, setFilter] = useState('recent');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({ firstName: '', email: '' });
    const [selectedTask, setSelectedTask] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(null);
    const menuRef = useRef(null); // Referência para o menu

    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem('token');
  
      if (token) {
        setIsAuthenticated(true);
  
        try {
          const decodedToken = jwtDecode(token);
          const fullName = decodedToken.name || 'Nome não disponível';
          const firstName = capitalizeFirstLetter(fullName.split(' ')[0]);
  
          setUser({
            firstName,
            email: decodedToken.email || 'Email não disponível',
          });
  
          const fetchTasks = async () => {
            try {
              const response = await fetch('http://localhost:5000/api/tasks/', {
                headers: { Authorization: `Bearer ${token}` },
              });
  
              if (response.ok) {
                const data = await response.json();
                setTasks(data);
                filterTasks(data, filter);
              } else {
                console.error('Erro ao carregar tarefas:', response.statusText);
              }
            } catch (error) {
              console.error('Erro ao carregar tarefas:', error);
            }
          };
  
          fetchTasks();
        } catch (error) {
          console.error('Erro ao decodificar o token:', error);
        }
      } else {
        navigate('/login');
      }
    }, [navigate, filter]);
  
    useEffect(() => {
      if (tasks.length) {
        filterTasks(tasks, filter);
      }
    }, [tasks, filter]);
  
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
  
    const formatDate = (dateString) => {
      if (!dateString) return 'Data não disponível.';
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
  
    const filterTasks = (tasks, filter) => {
      switch (filter) {
        case 'recent':
          // Ordena as tarefas com base na data e hora, com as mais recentes primeiro
          setFilteredTasks([...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
          break;
        case 'completed':
          setFilteredTasks(tasks.filter(task => task.taskStatus));
          break;
        case 'pending':
          setFilteredTasks(tasks.filter(task => !task.taskStatus));
          break;
        default:
          setFilteredTasks(tasks);
      }
    };
    
  
    const handleEditClick = (task) => {
      setSelectedTask(task);
      setModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
      setSelectedTask(null);
    };
  
    const handleUpdateTask = async (updatedTask) => {
      try {
        const response = await fetch(`http://localhost:5000/api/tasks/${updatedTask.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(updatedTask),
        });
  
        if (response.ok) {
          const updatedTaskData = await response.json();
          setTasks(tasks.map(task => task.id === updatedTaskData.id ? updatedTaskData : task));
          filterTasks(tasks, filter);
          handleCloseModal();
        } else {
          console.error('Erro ao atualizar tarefa:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
      }
    };
  
    const handleCompleteTask = async (taskId) => {
      try {
        const response = await fetch(`http://localhost:5000/api/tasks/${taskId}/complete`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        if (response.ok) {
          const updatedTask = await response.json();
          setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
          filterTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task), filter);
          handleCloseModal();
        } else {
          console.error('Erro ao marcar tarefa como concluída:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao marcar tarefa como concluída:', error);
      }
    };
  
    const handleDeleteTask = async (taskId) => {
      try {
        const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        if (response.ok) {
          setTasks(tasks.filter(task => task.id !== taskId));
          filterTasks(tasks.filter(task => task.id !== taskId), filter);
          handleCloseModal();
        } else {
          console.error('Erro ao excluir tarefa:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao excluir tarefa:', error);
      }
    };
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setMenuOpen(false); // Fecha o menu ao clicar fora
        }
      };
    
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    const toggleMenu = (taskId) => {
      setMenuOpen((prev) => (prev === taskId ? null : taskId)); // Alterna o estado do menu baseado no ID da tarefa
    };
  
    return (
      <Container>
        <Sidebar>
          <Header>Tarefas de {user.firstName}</Header>
          <FilterMenu>
            <FilterButton onClick={() => setFilter('recent')} active={filter === 'recent'}>Recentes</FilterButton>
            <FilterButton onClick={() => setFilter('completed')} active={filter === 'completed'}>Concluídas</FilterButton>
            <FilterButton onClick={() => setFilter('pending')} active={filter === 'pending'}>Pendentes</FilterButton>
          </FilterMenu>
        </Sidebar>
        <Content>
          <TaskGrid>
            {filteredTasks.length ? (
              filteredTasks.map((task) => (
                <TaskCard key={task.id}>
                  <CardHeader>
                    <TaskName>{task.taskTitle}</TaskName>
                    <MenuIcon onClick={() => toggleMenu(task.id)}>
  <FaEllipsisV />
</MenuIcon>
{menuOpen === task.id && ( // Verifica se o menu deve estar aberto para esta tarefa
  <DropdownMenu ref={menuRef}>
    <DropdownItem onClick={() => handleEditClick(task)}>Editar</DropdownItem>
    {!task.taskStatus && (
      <DropdownItem onClick={() => handleCompleteTask(task.id)}>Concluir</DropdownItem>
    )}
  </DropdownMenu>

)}
                  </CardHeader>
                  <TaskDescription>{task.taskDescription}</TaskDescription>
                  <TaskDate>{formatDate(task.createdAt)}</TaskDate>
                </TaskCard>
              ))
            ) : (
              <NoTasks>Nenhuma tarefa encontrada.</NoTasks>
            )}
          </TaskGrid>
        </Content>
        {modalOpen && selectedTask && (
          <Modal>
            <ModalContent>
              <h2>Editar Tarefa</h2>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateTask(selectedTask);
                }}
              >
                <Input
                  type="text"
                  value={selectedTask.taskTitle}
                  onChange={(e) => setSelectedTask({ ...selectedTask, taskTitle: e.target.value })}
                  placeholder="Título da tarefa"
                  required
                />
                <TextArea
                  value={selectedTask.taskDescription}
                  onChange={(e) => setSelectedTask({ ...selectedTask, taskDescription: e.target.value })}
                  placeholder="Descrição da tarefa"
                  required
                />
                <Button type="submit">Salvar</Button>
                <Button type="button" onClick={() => handleDeleteTask(selectedTask.id)}>Excluir</Button>
                <Button type="button" onClick={handleCloseModal}>Cancelar</Button>
              </Form>
            </ModalContent>
          </Modal>
        )}
      </Container>
    );
  };
  
  const Container = styled.div`
    display: flex;
    min-height: 100vh;
  `;
  
  const Sidebar = styled.div`
    width: 20%;
    background-color: #000;
    padding: 20px;
  `;
  
  const Header = styled.h1`
    font-size: 24px;
    margin-bottom: 2rem;
    margin-top: 5rem;
    color: #fff;
  `;
  
  const FilterMenu = styled.div`
    display: flex;
    flex-direction: column;
  `;
  
  const FilterButton = styled.button`
  background-color: ${(props) => (props.active ? '#000000' : '#ffffff')}; /* Preto quando ativo, branco quando inativo */
  color: ${(props) => (props.active ? '#ffffff' : '#000000')}; /* Branco quando ativo, preto quando inativo */
  border: 1px solid #eaeaea; /* Borda leve */
  padding: 8px 16px;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 5px; /* Bordas levemente arredondadas */
  transition: background-color 0.2s ease, color 0.2s ease, border 0.2s ease; /* Transições suaves */
  
  &:hover {
    background-color: #333333; /* Cinza claro no hover */
    border-color: #d0d0d0; /* Ajuste sutil na borda no hover */
    color: #fff;
  }

  &:focus {
    outline: none; /* Remove outline padrão */
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1); /* Sombra leve no foco */
  }

  &:active {
    background-color: #333333; /* Tom mais escuro quando pressionado */
    border-color: #333333; /* Borda alinhada com o background */
  }
`;

  const Content = styled.div`
    flex: 1;
    padding: 20px;
  `;
  
  const TaskGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 5rem;
  `;
  
  const TaskCard = styled.div`
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  `;
  
  const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;
  
  const TaskName = styled.h3`
    margin: 0;
  `;
  
  const MenuIcon = styled.div`
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: relative; /* Posiciona o menu em relação ao MenuWrapper */
  top: 100%; /* Coloca o menu diretamente abaixo do ícone */
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  z-index: 1000;
  min-width: 120px; /* Define uma largura mínima para o menu */
`;

const DropdownItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

  
  const TaskDescription = styled.p`
    font-size: 14px;
    margin: 10px 0;
  `;
  
  const TaskDate = styled.span`
    font-size: 12px;
    color: #777;
  `;
  
  const NoTasks = styled.div`
    text-align: center;
    color: #777;
    padding: 20px;
  `;
  
  const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  
  const ModalContent = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-width: 80%;
  `;
  
  const Form = styled.form`
    display: flex;
    flex-direction: column;
  `;
  
  const Input = styled.input`
    margin-bottom: 10px;
    padding: 10px;
    font-size: 16px;
  `;
  
  const TextArea = styled.textarea`
    margin-bottom: 10px;
    padding: 10px;
    font-size: 16px;
  `;
  
  const Button = styled.button`
    padding: 10px;
    margin-top: 10px;
    cursor: pointer;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 4px;
  `;
  
  export default UserTasksPage;