'use client';
import { useState, useCallback } from 'react';
import type { Task, TaskStatus } from '@/types';
import type { CreateTaskBody, UpdateTaskBody } from '@/types/api';
import { API_ROUTES } from '@/lib/constants';

export function useTasks(projectId: string, initialTasks: Task[] = []) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const createTask = useCallback(
    async (data: CreateTaskBody) => {
      const res = await fetch(API_ROUTES.PROJECT_TASKS(projectId), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setTasks(t => [json.data, ...t]);
        return json.data;
      }
      throw new Error(json.error);
    },
    [projectId]
  );

  const updateTask = useCallback(async (id: string, data: UpdateTaskBody) => {
    const res = await fetch(API_ROUTES.TASK(id), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (json.success) {
      setTasks(t => t.map(tk => (tk.id === id ? { ...tk, ...json.data } : tk)));
      return json.data;
    }
    throw new Error(json.error);
  }, []);

  const updateStatus = useCallback(
    (id: string, status: TaskStatus) => updateTask(id, { status }),
    [updateTask]
  );

  const deleteTask = useCallback(async (id: string) => {
    const res = await fetch(API_ROUTES.TASK(id), { method: 'DELETE' });
    const json = await res.json();
    if (json.success) setTasks(t => t.filter(tk => tk.id !== id));
    else throw new Error(json.error);
  }, []);

  return { tasks, setTasks, createTask, updateTask, updateStatus, deleteTask };
}
