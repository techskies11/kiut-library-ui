export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type EndpointStatus = 'published' | 'draft';

export type VersionStatus = 'archived';

export interface TableVersionsHistoryItem {
  id: string;
  method: HttpMethod;
  url: string;
  version: string;
  status: VersionStatus;
  updatedAt: string | Date;
}

export interface TableVersionsRow {
  id: string;
  method: HttpMethod;
  name: string;
  description?: string;
  url: string;
  status: EndpointStatus;
  version: string;
  updatedAt: string | Date;
  versions?: TableVersionsHistoryItem[];
}

export interface TableVersionsLabels {
  method: string;
  name: string;
  url: string;
  status: string;
  version: string;
  updated: string;
  actions: string;
  historialTitle: string;
  emptyHistory: string;
  view: string;
  run: string;
  edit: string;
  viewVersion: string;
  createDraft: string;
  expandRow: string;
  collapseRow: string;
}

export const DEFAULT_TABLE_VERSIONS_LABELS: TableVersionsLabels = {
  method: 'MÉTODO',
  name: 'NOMBRE',
  url: 'URL',
  status: 'STATUS',
  version: 'VERSIÓN',
  updated: 'ACTUALIZADO',
  actions: 'ACCIONES',
  historialTitle: 'HISTORIAL DE VERSIONES',
  emptyHistory: 'Sin versiones previas.',
  view: 'Ver',
  run: 'Ejecutar',
  edit: 'Editar',
  viewVersion: 'Ver',
  createDraft: 'Crear draft',
  expandRow: 'Expandir fila',
  collapseRow: 'Contraer fila',
};
