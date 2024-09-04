  // src/pages/UserTasksPage.js
  import React, { useEffect, useState } from 'react';
  import styled from 'styled-components';
  import { useNavigate } from 'react-router-dom';
  import { jwtDecode } from 'jwt-decode'; // Corrigido a importação de jwt-decode

  const UserTasksPage = () => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [filter, setFilter] = useState('recent');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({ firstName: '', email: '' });
    const [selectedTask, setSelectedTask] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
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
                    <TaskDate>{formatDate(task.createdAt)}</TaskDate>
                  </CardHeader>
                  <TaskDescription>{task.taskDescription}</TaskDescription>
                  <ActionButtons>
                    <ActionButton onClick={() => handleEditClick(task)}>Editar</ActionButton>
                    {!task.taskStatus && (
                      <ActionButton onClick={() => handleCompleteTask(task.id)}>Concluir</ActionButton>
                    )}
                  </ActionButtons>
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
    height: auto;
    background: #ffffff; /* Fundo branco */
    color: #000000; /* Texto preto */
    font-family: 'Roboto', sans-serif;
  `;

  const Sidebar = styled.div`
    width: 250px;
    height: auto;
    background: #000000; /* Fundo preto */
    color: #ffffff; /* Texto branco */
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const Header = styled.h1`
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    margin: 5rem auto;
  `;

  const FilterMenu = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  `;

  const FilterButton = styled.button`
    background: ${({ active }) => (active ? '#333333' : '#000000')}; /* Preto se ativo, preto escuro se inativo */
    color: #ffffff;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: background 0.3s ease;
    font-size: 1rem;
    width: 100%;

    &:hover {
      background: #444444; /* Preto um pouco mais claro */
    }
  `;

  const Content = styled.div`
    flex: 1;
    padding: 2rem;
  `;

  const TaskGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    width: 100%;
    margin: 5rem auto;
  `;

  const TaskCard = styled.div`
    background: #ffffff; /* Fundo branco */
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `;

  const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const TaskName = styled.h2`
    font-size: 1.2rem;
    color: #000000; /* Texto preto */
  `;

  const TaskDate = styled.span`
    font-size: 0.9rem;
    color: #666666; /* Texto cinza escuro */
  `;

  const TaskDescription = styled.p`
    color: #000000; /* Texto preto */
  `;

  const ActionButtons = styled.div`
    display: flex;
    gap: 0.5rem;
  `;

  const ActionButton = styled.button`
    background: #333333; /* Preto escuro */
    color: #ffffff;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: background 0.3s ease;
    font-size: 0.9rem;

    &:hover {
      background: #222222; /* Preto mais escuro */
    }
  `;

  const NoTasks = styled.p`
    color: #000000; /* Texto preto */
    font-size: 1rem;
    text-align: center;
  `;

  const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8); /* Fundo escurecido para o modal */
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const ModalContent = styled.div`
    background: #ffffff; /* Fundo branco */
    color: #000000; /* Texto preto */
    border-radius: 8px;
    padding: 2rem;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  `;

  const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `;

  const Input = styled.input`
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0.5rem;
    font-size: 1rem;
  `;

  const TextArea = styled.textarea`
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0.5rem;
    font-size: 1rem;
    min-height: 100px;
    resize: vertical;
  `;

  const Button = styled.button`
    background: #333333; /* Preto escuro */
    color: #ffffff;
    border: none;
    border-radius: 4px;
    padding: 0.75rem;
    cursor: pointer;
    transition: background 0.3s ease;
    font-size: 1rem;

    &:hover {
      background: #222222; /* Preto mais escuro */
    }
  `;

  export default UserTasksPage;
