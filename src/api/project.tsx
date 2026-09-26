import { apiClient } from "@/api/index";

/**
 * Types matching the Brandie Admin API project shape (see `api.md`).
 * Only the fields returned by GET /projects are declared.
 */

export type CompanyLite = {
  id: string;
  name: string;
  slug: string;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  mainImage: string | null;
  category: string;
  description: string | null;
  client: string | null;
  role: string | null;
  location: string | null;
  projectDate: string | null;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  company: CompanyLite;
  _count: { images: number };
};

export type GetProjectsParams = {
  /** Filter projects by company id (optional). */
  companyId?: string;
};

/** A single image belonging to a project, with its grid column span. */
export type ProjectImage = {
  id: string;
  image: string;
  caption: string | null;
  /** Bootstrap column span used when rendering the image (e.g. 6, 12). */
  columns: number;
  sortOrder: number;
};

/** A single project including its gallery images (GET /projects/:slug). */
export type ProjectDetail = Project & {
  images: ProjectImage[];
};

type ApiListResponse<T> = {
  status: string;
  message: string;
  data: T[];
};

type ApiSingleResponse<T> = {
  status: string;
  message: string;
  data: T;
};

/** Fetch all projects from the API. */
export const getProjects = async (params?: GetProjectsParams): Promise<Project[]> => {
  const { data } = await apiClient.get<ApiListResponse<Project>>("/projects", { params });
  return data.data;
};

/** Fetch a single project (with its images) by slug. */
export const getProject = async (slug: string): Promise<ProjectDetail> => {
  const { data } = await apiClient.get<ApiSingleResponse<ProjectDetail>>(`/projects/${slug}`);
  return data.data;
};
