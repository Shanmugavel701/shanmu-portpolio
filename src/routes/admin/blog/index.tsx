import { createFileRoute } from "@tanstack/react-router";
import { BlogAdminDashboard } from "@/components/blog/BlogAdminDashboard";

export const Route = createFileRoute("/admin/blog/")({
  component: BlogAdminDashboard,
  head: () => ({
    meta: [
      { title: "Admin Blog Studio | Shanmu" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});
