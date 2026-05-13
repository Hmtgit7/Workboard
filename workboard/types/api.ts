import type { ProjectRole, TaskPriority, TaskStatus } from './index';

export type ApiResponse<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string };

export interface LoginBody {
  email: string;
  password: string;
}

export interface RegisterBody extends LoginBody {
  name: string;
}

export interface CreateProjectBody {
  name: string;
  description?: string;
  color?: string;
}

export interface UpdateProjectBody {
  name?: string;
  description?: string;
  color?: string;
}

export interface AddProjectMemberBody {
  email: string;
  role?: ProjectRole;
}

export interface CreateTaskBody {
  title: string;
  description?: string;
  priority?: TaskPriority;
  assigneeId?: string;
  dueDate?: string;
}

export interface UpdateTaskBody {
  title?: string;
  description?: string | null;
  status?: TaskStatus;
  priority?: TaskPriority;
  assigneeId?: string | null;
  dueDate?: string | null;
}