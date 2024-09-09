import React from 'react';
import Navbar from '../components/Manager/Navbar';
import TaskModal from '../components/Manager/TaskModal';
import TaskList from '../components/Manager/TaskList';
import LoadingMessage from '../components/Manager/LoadingMessage';
import NoTasksMessage from '../components/Manager/NoTasksMessage';
import useTasksApi from '../hooks/Manager Hooks/useTaskApi';
import styled from 'styled-components';

// Estiliza o contêiner principal do componente, configurando o layout e a aparência
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #000;
  color: #fff;
  overflow: hidden;
`;

// Estiliza a área onde as tarefas são exibidas, permitindo rolagem vertical
const TaskWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const TaskManager = () => {
  // Usa o hook personalizado para gerenciar o estado e ações relacionadas às tarefas
  const { 
    tasks, 
    loading, 
    modalOpen, 
    currentTask, 
    filter, 
    setFilter, 
    setModalOpen, 
    setCurrentTask,
    handleAddTaskClick, 
    handleSaveTask, 
    handleCompleteTask, 
    handleDeleteTask 
  } = useTasksApi();

  return (
    <Container>
      {/* Renderiza a barra de navegação e passa as funções de callback para manipulação */}
      <Navbar onAddTaskClick={handleAddTaskClick} onFilterChange={setFilter} />
      <TaskWrapper>
        {/* Exibe uma mensagem de carregamento enquanto as tarefas estão sendo buscadas */}
        {loading ? (
          <LoadingMessage />
        ) : tasks.length > 0 ? (
          // Se houver tarefas, exibe a lista de tarefas com funções para editar, excluir e marcar como concluída
          <TaskList 
            tasks={tasks} 
            onEdit={(task) => {
              setCurrentTask(task); // Define a tarefa atual para edição
              setModalOpen(true); // Abre o modal para edição
            }}
            onDelete={handleDeleteTask} // Função para excluir tarefas
            onComplete={handleCompleteTask} // Função para marcar tarefas como concluídas
          />
        ) : (
          // Se não houver tarefas, exibe uma mensagem informando a ausência de tarefas
          <NoTasksMessage />
        )}
      </TaskWrapper>
      {/* Renderiza o modal de tarefa, passando funções para salvar e fechar */}
      <TaskModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onSave={handleSaveTask} 
        task={currentTask} 
      />
    </Container>
  );
};

export default TaskManager;
