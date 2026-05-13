export type UserRole = 'ADMIN' | 'MEMBER';
export type ProjectRole = 'ADMIN' | 'MEMBER';
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface JwtPayload {
  sub: string;
  email: string;
  name: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string | null;
  role: string;
  createdAt?: string | Date;
}

export type ProjectMemberUser = Omit<User, 'role'> & {
  role?: ProjectRole;
};

export interface Project {
  id: string;
  name: string;
  description?: string | null;
  color?: string | null;
  ownerId?: string;
  owner?: User;
  members?: Array<{
    id: string;
    role: ProjectRole;
    user: User;
  }>;
  tasks?: Task[];
  _count?: {
    tasks: number;
    members: number;
  };
}

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string | Date | null;
  assigneeId?: string | null;
  createdById?: string;
  projectId?: string;
  assignee?: User | null;
  createdBy?: Pick<User, 'id' | 'name'> | null;
  project?: Pick<Project, 'id' | 'name' | 'color'> | null;
  updatedAt?: string | Date;
  createdAt?: string | Date;
}