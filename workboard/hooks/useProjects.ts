'use client';
import { useState, useEffect, useCallback } from 'react';
import type { Project } from '@/types';
import type { CreateProjectBody } from '@/types/api';
import { API_ROUTES } from '@/lib/constants';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(API_ROUTES.PROJECTS);
      const json = await res.json();
      if (json.success) setProjects(json.data);
      else setError(json.error);
    } catch {
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const createProject = useCallback(async (data: CreateProjectBody) => {
    const res = await fetch(API_ROUTES.PROJECTS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (json.success) {
      setProjects(p => [json.data, ...p]);
      return json.data;
    }
    throw new Error(json.error);
  }, []);

  const deleteProject = useCallback(async (id: string) => {
    const res = await fetch(API_ROUTES.PROJECT(id), { method: 'DELETE' });
    const json = await res.json();
    if (json.success) setProjects(p => p.filter(pr => pr.id !== id));
    else throw new Error(json.error);
  }, []);

  return { projects, loading, error, createProject, deleteProject, refetch: fetchProjects };
}
