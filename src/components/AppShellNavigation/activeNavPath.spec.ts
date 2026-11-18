import { describe, expect, it } from "vitest";

import { resolveActiveNavPath } from "./activeNavPath";

const AGENT_BUILDER_PATHS = [
  "/agent-builder",
  "/agent-builder/a2a",
  "/agent-builder/mcp",
  "/template-variables",
  "/catalog-api",
];

describe("resolveActiveNavPath", () => {
  it("keeps a parent route active on nested editor urls", () => {
    expect(
      resolveActiveNavPath(
        "/agent-builder/seller/v/1",
        AGENT_BUILDER_PATHS,
      ),
    ).toBe("/agent-builder");
  });

  it("activates only the longer sibling when the route is a child path", () => {
    expect(
      resolveActiveNavPath("/agent-builder/mcp", AGENT_BUILDER_PATHS),
    ).toBe("/agent-builder/mcp");
    expect(
      resolveActiveNavPath("/agent-builder/a2a", AGENT_BUILDER_PATHS),
    ).toBe("/agent-builder/a2a");
  });

  it("keeps the child active on routes under that child", () => {
    expect(
      resolveActiveNavPath("/agent-builder/mcp/servers", AGENT_BUILDER_PATHS),
    ).toBe("/agent-builder/mcp");
  });

  it("returns null when nothing matches", () => {
    expect(resolveActiveNavPath("/chats", AGENT_BUILDER_PATHS)).toBeNull();
    expect(resolveActiveNavPath("", AGENT_BUILDER_PATHS)).toBeNull();
  });
});
