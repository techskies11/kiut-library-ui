import { formatSankeyLinkLabel } from "../../Sankey/sankeyFormatters";

export interface DisruptionNotifierDocumentCount {
  date: string;
  processing_started: number;
  processing_completed: number;
  processing_failed: number;
  row_count_total: number;
}

export interface DisruptionNotifierProcessingCount {
  date: string;
  processing_started: number;
  processing_success: number;
  notification_sent: number;
  dq_error_phone_not_found: number;
  dq_error_flight_not_found: number;
  dq_error_booking_not_found: number;
  dq_error_other: number;
  notification_failed: number;
}

export interface DisruptionNotifierChartData {
  documentCounts?: { items?: DisruptionNotifierDocumentCount[] };
  processingCounts?: { items?: DisruptionNotifierProcessingCount[] };
}

export function buildDisruptionNotifierSankeyFromData(
  data?: DisruptionNotifierChartData,
): DisruptionNotifierSankeyData {
  const docs = data?.documentCounts?.items ?? [];
  const procs = data?.processingCounts?.items ?? [];
  const records =
    docs.reduce((sum, item) => sum + item.row_count_total, 0) ||
    procs.reduce((sum, item) => sum + item.processing_started, 0);
  const dqTotal = procs.reduce(
    (sum, item) =>
      sum +
      item.dq_error_phone_not_found +
      item.dq_error_flight_not_found +
      item.dq_error_booking_not_found +
      item.dq_error_other,
    0,
  );

  return buildDisruptionNotifierSankey({
    records,
    validReservations: procs.reduce((sum, item) => sum + item.processing_success, 0),
    dataQualityIssues: dqTotal,
    notificationSent: procs.reduce((sum, item) => sum + item.notification_sent, 0),
    notificationFailed: procs.reduce((sum, item) => sum + item.notification_failed, 0),
  });
}

export interface DisruptionNotifierSankeyTotals {
  records: number;
  validReservations: number;
  dataQualityIssues: number;
  notificationSent: number;
  notificationFailed: number;
}

export interface DisruptionNotifierSankeyNode {
  name: string;
  status: "success" | "error" | "abandon";
}

export interface DisruptionNotifierSankeyLink {
  source: string;
  target: string;
  value: number;
  label: string;
}

export interface DisruptionNotifierSankeyData {
  nodes: DisruptionNotifierSankeyNode[];
  links: DisruptionNotifierSankeyLink[];
}

const RECORDS = "Records Detected";
const VALID = "Valid Reservations";
const INVALID = "Invalid Reservations";
const CONTACTABLE = "Contactable";
const DATA_QUALITY = "Data Quality Issues";
const NOTIFIED = "Notified";
const NOT_NOTIFIED = "Not Notified";

/**
 * Records → Valid Reservations, then Contactable opens as another branch of
 * that next step (alongside data-quality issues). Notified continues from
 * Contactable so it stays on the same flow.
 */
export function buildDisruptionNotifierSankey(
  totals: DisruptionNotifierSankeyTotals,
): DisruptionNotifierSankeyData {
  const records = Math.max(0, totals.records);
  const valid = Math.max(0, totals.validReservations);
  const dqTotal = Math.max(0, totals.dataQualityIssues);
  const notified = Math.max(0, totals.notificationSent);
  const notificationFailed = Math.max(0, totals.notificationFailed);
  const invalidRecords = Math.max(0, records - valid);
  const contactable = Math.max(
    Math.max(0, valid - dqTotal),
    notified + notificationFailed,
  );
  const notDelivered = Math.max(0, contactable - notified);

  const fl = (value: number, total: number): string =>
    formatSankeyLinkLabel(value, total);

  const links: DisruptionNotifierSankeyLink[] = [];

  if (valid > 0 || contactable > 0 || dqTotal > 0) {
    links.push({
      source: RECORDS,
      target: VALID,
      value: Math.max(valid, contactable),
      label: fl(Math.max(valid, contactable), records),
    });
  }

  if (invalidRecords > 0) {
    links.push({
      source: RECORDS,
      target: INVALID,
      value: invalidRecords,
      label: fl(invalidRecords, records),
    });
  }

  if (contactable > 0) {
    links.push({
      source: VALID,
      target: CONTACTABLE,
      value: contactable,
      label: fl(contactable, records),
    });
  }

  if (dqTotal > 0) {
    links.push({
      source: VALID,
      target: DATA_QUALITY,
      value: dqTotal,
      label: fl(dqTotal, records),
    });
  }

  if (notified > 0) {
    links.push({
      source: CONTACTABLE,
      target: NOTIFIED,
      value: notified,
      label: fl(notified, records),
    });
  }

  if (notDelivered > 0) {
    links.push({
      source: CONTACTABLE,
      target: NOT_NOTIFIED,
      value: notDelivered,
      label: fl(notDelivered, records),
    });
  }

  const nodeCatalog: DisruptionNotifierSankeyNode[] = [
    { name: RECORDS, status: "success" },
    { name: VALID, status: "success" },
    { name: INVALID, status: "error" },
    { name: CONTACTABLE, status: "success" },
    { name: DATA_QUALITY, status: "abandon" },
    { name: NOTIFIED, status: "success" },
    { name: NOT_NOTIFIED, status: "abandon" },
  ];

  const used = new Set(links.flatMap((link) => [link.source, link.target]));
  return {
    nodes: nodeCatalog.filter((node) => used.has(node.name)),
    links,
  };
}
