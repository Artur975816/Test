import TaskForm from './TaskForm';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const statuses = ['To Do', 'In Progress', 'Done'];

const TaskBoard = ({ tasks }) => {
  const initialColumns = statuses.reduce((acc, status) => {
    acc[status] = tasks.filter(task => task.status === status);
    return acc;
  }, {});

  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = result => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceList = [...columns[source.droppableId]];
    const destList = [...columns[destination.droppableId]];

    const [movedTask] = sourceList.splice(source.index, 1);
    movedTask.status = destination.droppableId;
    destList.splice(destination.index, 0, movedTask);

    setColumns({
      ...columns,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destList,
    });
  };

  const handleAddTask = task => {
    setColumns(prev => ({
      ...prev,
      [task.status]: [...prev[task.status], task],
    }));
  };

  return (
    <>
<TaskForm onSubmit={handleAddTask} />
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', gap: '20px' }}>
        {statuses.map(status => (
          <Droppable key={status} droppableId={status}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  backgroundColor: snapshot.isDraggingOver ? '#ddd' : '#eee',
                  padding: '10px',
                  width: '250px',
                  minHeight: '300px',
                }}
              >
                <h4>{status}</h4>
                {columns[status].map((task, index) => (
                  <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          padding: '8px',
                          margin: '0 0 10px 0',
                          backgroundColor: snapshot.isDragging ? '#aaa' : '#fff',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          ...provided.draggableProps.style,
                        }}
                      >
                        {task.title}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
</>
  );
};

export default TaskBoard;
