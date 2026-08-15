export const clientKeys = {
  all: ['clients'] as const,
  lists: () => [...clientKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) => [...clientKeys.lists(), { filters }] as const,
  details: () => [...clientKeys.all, 'detail'] as const,
  detail: (id: number | string) => [...clientKeys.details(), id] as const,
};

export const propertyKeys = {
  all: ['properties'] as const,
  lists: () => [...propertyKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) => [...propertyKeys.lists(), { filters }] as const,
  details: () => [...propertyKeys.all, 'detail'] as const,
  detail: (id: number | string) => [...propertyKeys.details(), id] as const,
};

export const reportKeys = {
  all: ['reports'] as const,
  lists: () => [...reportKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) => [...reportKeys.lists(), { filters }] as const,
  details: () => [...reportKeys.all, 'detail'] as const,
  detail: (id: number | string) => [...reportKeys.details(), id] as const,
};

export const mediaKeys = {
  all: ['media'] as const,
  lists: () => [...mediaKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) => [...mediaKeys.lists(), { filters }] as const,
  details: () => [...mediaKeys.all, 'detail'] as const,
  detail: (id: number | string) => [...mediaKeys.details(), id] as const,
};

export const notificationKeys = {
  all: ['notifications'] as const,
  lists: () => [...notificationKeys.all, 'list'] as const,
};

export const userKeys = {
  all: ['users'] as const,
  profile: () => [...userKeys.all, 'profile'] as const,
};

export const servicePlanKeys = {
  all: ['service-plans'] as const,
  lists: () => [...servicePlanKeys.all, 'list'] as const,
  details: () => [...servicePlanKeys.all, 'detail'] as const,
  detail: (id: number | string) => [...servicePlanKeys.details(), id] as const,
};

