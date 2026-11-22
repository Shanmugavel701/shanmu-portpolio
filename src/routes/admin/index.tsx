import { createFileRoute } from "@tanstack/react-router";
import { BlogAdminDashboard } from "@/components/blog/BlogAdminDashboard";

export const Route = createFileRoute("/admin/")({
  component: BlogAdminDashboard,
  head: () => ({
    meta: [
      { title: "Admin Portal | Shanmu" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});
