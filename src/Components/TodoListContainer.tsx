import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Swal from 'sweetalert2';
import TaskList from './TaskList';
import { tasksAtom } from '../State/tasksAtom';


const TodoListContainer: React.FC = () => {
    const [tasks, setTasks] = useRecoilState(tasksAtom);
    const [taskName, setTaskName] = useState<string>('');

    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);


    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks]);


    const addTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (taskName.trim()) {
            setTasks((prevTasks) => [
                { id: Date.now(), name: taskName, completed: false },
                ...prevTasks,
            ]);
            setTaskName('');
        }
    };


    const toggleTaskCompletion = (id: number) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };


    const editTask = (id: number, newName: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, name: newName } : task
            )
        );
    };


    const deleteTask = (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {

                setTasks((prevTasks) => {
                    const updatedTasks = prevTasks.filter((task) => task.id !== id);

                    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
                    return updatedTasks;
                });
                Swal.fire({
                    title: "Deleted!",
                    text: "Your task has been deleted.",
                    icon: "success",
                });
            }
        });
    };


    return (
        <div className="max-w-2xl mx-auto p-4 space-y-4 bg-gray-100 rounded-lg shadow-md mt-8">
            <h1 className="text-2xl font-bold text-gray-800">To-Do List</h1>
            <form className="flex items-center space-x-2" onSubmit={addTask}>
                <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-400"
                    placeholder="Add a task..."
                />
                <button
                    type="submit"
                    className="px-4 py-2 text-white bg-sky-400 rounded-lg hover:bg-sky-500"
                >
                    Add
                </button>
            </form>
            <TaskList
                tasks={tasks}
                toggleTaskCompletion={toggleTaskCompletion}
                deleteTask={deleteTask}
                editTask={editTask}
                setTasks={setTasks}
            />

        </div>
    );
};

export default TodoListContainer;
