import { describe, expect, it } from "vitest";
import { buildDisruptionNotifierSankey } from "./buildDisruptionNotifierSankey";

function link(
  data: ReturnType<typeof buildDisruptionNotifierSankey>,
  source: string,
  target: string,
) {
  return data.links.find((item) => item.source === source && item.target === target);
}

describe("buildDisruptionNotifierSankey", () => {
  it("branches contactable from valid reservations and keeps notified on that branch", () => {
    const data = buildDisruptionNotifierSankey({
      records: 20,
      validReservations: 12,
      dataQualityIssues: 4,
      notificationSent: 5,
      notificationFailed: 2,
    });

    expect(link(data, "Valid Reservations", "Contactable")).toBeDefined();
    expect(link(data, "Valid Reservations", "Data Quality Issues")).toBeDefined();
    expect(link(data, "Contactable", "Notified")?.value).toBe(5);
    expect(link(data, "Records Detected", "Contactable")).toBeUndefined();
  });

  it("keeps contactable attached when data-quality counts exceed valid reservations", () => {
    const data = buildDisruptionNotifierSankey({
      records: 18,
      validReservations: 5,
      dataQualityIssues: 7,
      notificationSent: 3,
      notificationFailed: 3,
    });

    expect(link(data, "Valid Reservations", "Contactable")?.value).toBe(6);
    expect(link(data, "Contactable", "Notified")?.source).toBe("Contactable");
    expect(link(data, "Records Detected", "Valid Reservations")).toBeDefined();
  });
});
