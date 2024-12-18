import React, { useState } from 'react';
import { Check, Edit, X, GripHorizontal } from 'lucide-react';
import { Task } from '../State/tasksAtom';
import { Reorder } from 'framer-motion';

interface TaskListProps {
  tasks: Task[];
  toggleTaskCompletion: (id: number) => void;
  deleteTask: (id: number) => void;
  editTask: (id: number, newName: string) => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  toggleTaskCompletion,
  deleteTask,
  editTask,
  setTasks,
}) => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [newTaskName, setNewTaskName] = useState<string>('');

  const startEditing = (task: Task) => {
    setEditingTaskId(task.id);
    setNewTaskName(task.name);
  };

  const saveEdit = (taskId: number) => {
    if (newTaskName.trim()) {
      editTask(taskId, newTaskName.trim());
    }
    setEditingTaskId(null);
  };

  return (
    <Reorder.Group
      as="ul"
      axis="y"
      values={tasks}
      onReorder={setTasks}
      className="space-y-2"
    >
      {tasks.map((task) => (
        <Reorder.Item
          key={task.id}
          value={task}
          className="flex items-center justify-between px-4 py-2 bg-white rounded-lg shadow "
        >
          <div className="flex items-center space-x-4">
            <div
              className="cursor-grab"

            >
              <GripHorizontal className="w-5 h-5 text-gray-500 hover:text-gray-700" />
            </div>
            <label className="relative inline-flex items-center cursor-pointer mb-[auto] mt-1">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
              />
              <div
                className={`w-5 h-5 rounded-full border-2 ${task.completed
                  ? 'bg-green-500 border-green-500'
                  : 'border-blue-500'
                  } flex items-center justify-center transition-colors duration-300`}
              >
                {task.completed && <Check className="w-6 h-6 text-white" />}
              </div>
            </label>

            {editingTaskId === task.id ? (
              <input
                type="text"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                className="flex-grow px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
                onBlur={() => saveEdit(task.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') saveEdit(task.id);
                  if (e.key === 'Escape') setEditingTaskId(null);
                }}
                autoFocus
              />
            ) : (
              <span
                className={`text-gray-800 ${task.completed ? 'line-through text-gray-500' : ''
                  }`}
                onDoubleClick={() => startEditing(task)}
              >
                {task.name}
              </span>
            )}
          </div>
          <div className="flex space-x-2 mb-[auto]">
            <button
              onClick={() => startEditing(task)}
              className="text-yellow-500 hover:text-yellow-600"
            >
              <Edit className="w-5 h-5 " />
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              <X />
            </button>
          </div>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};

export default TaskList;
