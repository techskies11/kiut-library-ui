export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type EndpointStatus = 'published' | 'draft';

export type VersionStatus = 'archived';

export type TableVersionsColumnAlign = 'left' | 'center' | 'right';

export type TableVersionsRowAction =
  | 'view'
  | 'run'
  | 'edit'
  | 'delete'
  | 'createDraft';

export type TableVersionsColumnType =
  | 'name'
  | 'method'
  | 'url'
  | 'status'
  | 'version'
  | 'updated'
  | 'active'
  | 'actions';

export interface TableVersionsColumn {
  key: string;
  label: string;
  type?: TableVersionsColumnType;
  align?: TableVersionsColumnAlign;
  headerClass?: string;
  cellClass?: string;
  /** Solo para `type: 'actions'`: acciones visibles en la fila principal. */
  actions?: TableVersionsRowAction[];
}

export interface TableVersionsHistoryItem {
  id: string;
  version: string;
  status: VersionStatus;
  updatedAt: string | Date;
  method?: HttpMethod;
  url?: string;
}

export interface TableVersionsRow {
  id: string;
  name: string;
  status: EndpointStatus;
  version: string;
  updatedAt: string | Date;
  description?: string;
  method?: HttpMethod;
  url?: string;
  active?: boolean;
  versions?: TableVersionsHistoryItem[];
}

export interface TableVersionsLabels {
  method: string;
  name: string;
  url: string;
  status: string;
  version: string;
  updated: string;
  active: string;
  actions: string;
  historialTitle: string;
  emptyHistory: string;
  view: string;
  run: string;
  edit: string;
  delete: string;
  createDraft: string;
  viewVersion: string;
  createDraftFromVersion: string;
  expandRow: string;
  collapseRow: string;
  toggleActive: string;
}

export const DEFAULT_TABLE_VERSIONS_LABELS: TableVersionsLabels = {
  method: 'MÉTODO',
  name: 'NOMBRE',
  url: 'URL',
  status: 'STATUS',
  version: 'VERSIÓN',
  updated: 'ACTUALIZADO',
  active: 'ACTIVO',
  actions: 'ACCIONES',
  historialTitle: 'HISTORIAL DE VERSIONES',
  emptyHistory: 'Sin versiones previas.',
  view: 'Ver',
  run: 'Ejecutar',
  edit: 'Editar',
  delete: 'Eliminar',
  createDraft: 'Crear draft',
  viewVersion: 'Ver',
  createDraftFromVersion: 'Crear draft',
  expandRow: 'Expandir fila',
  collapseRow: 'Contraer fila',
  toggleActive: 'Activar o desactivar',
};

/** Endpoints API: método, nombre, URL, status, versión, actualizado, acciones. */
export const ENDPOINT_TABLE_VERSIONS_COLUMNS: TableVersionsColumn[] = [
  {
    key: 'method',
    label: 'MÉTODO',
    type: 'method',
    headerClass: 'w-28',
    cellClass: 'w-28',
  },
  {
    key: 'name',
    label: 'NOMBRE',
    type: 'name',
    headerClass: 'min-w-0',
    cellClass: 'min-w-0',
  },
  {
    key: 'url',
    label: 'URL',
    type: 'url',
    headerClass: 'min-w-0',
    cellClass: 'min-w-0',
  },
  {
    key: 'status',
    label: 'STATUS',
    type: 'status',
    headerClass: 'w-32',
    cellClass: 'w-32',
  },
  {
    key: 'version',
    label: 'VERSIÓN',
    type: 'version',
    headerClass: 'w-20',
    cellClass: 'w-20',
  },
  {
    key: 'updated',
    label: 'ACTUALIZADO',
    type: 'updated',
    headerClass: 'w-28',
    cellClass: 'w-28',
  },
  {
    key: 'actions',
    label: 'ACCIONES',
    type: 'actions',
    align: 'right',
    headerClass: 'w-28',
    cellClass: 'w-28',
    actions: ['view', 'run', 'edit'],
  },
];

/** Recursos (bots, servicios): nombre, status, versión, actualizado, activo, acciones. */
export const RESOURCE_TABLE_VERSIONS_COLUMNS: TableVersionsColumn[] = [
  {
    key: 'name',
    label: 'NOMBRE',
    type: 'name',
    headerClass: 'min-w-0',
    cellClass: 'min-w-0',
  },
  {
    key: 'status',
    label: 'STATUS',
    type: 'status',
    headerClass: 'w-32',
    cellClass: 'w-32',
  },
  {
    key: 'version',
    label: 'VERSIÓN',
    type: 'version',
    headerClass: 'w-20',
    cellClass: 'w-20',
  },
  {
    key: 'updated',
    label: 'ACTUALIZADO',
    type: 'updated',
    headerClass: 'w-28',
    cellClass: 'w-28',
  },
  {
    key: 'active',
    label: 'ACTIVO',
    type: 'active',
    align: 'center',
    headerClass: 'w-24',
    cellClass: 'w-24',
  },
  {
    key: 'actions',
    label: 'ACCIONES',
    type: 'actions',
    align: 'right',
    headerClass: 'w-36',
    cellClass: 'w-36',
    actions: ['view', 'createDraft', 'edit', 'delete'],
  },
];
