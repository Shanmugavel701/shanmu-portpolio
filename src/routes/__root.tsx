import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },

      // ── SEO Core ──────────────────────────────────────────────────
      { title: "Shanmu | Digital Creator, Developer & Entrepreneur — Tamil Nadu, India" },
      {
        name: "description",
        content:
          "Shanmugavel (Shanmu) is a Tamil Nadu-based digital creator, full-stack developer, graphic designer and entrepreneur. 5+ years · 20+ clients · ₹2Cr+ revenue generated. Services: Website Development, Graphic Design, Video Editing, Social Media & Digital Marketing.",
      },
      { name: "author", content: "Shanmugavel" },
      {
        name: "keywords",
        content:
          "Shanmugavel, Shanmu, digital creator Tamil Nadu, web developer India, graphic designer, video editor, social media manager, digital marketing, website development, brand identity, Shadivi, VelzX, freelancer India",
      },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
      { name: "theme-color", content: "#0a0a0a" },
      { name: "rating", content: "general" },
      { name: "revisit-after", content: "7 days" },
      { name: "language", content: "English" },
      { name: "geo.region", content: "IN-TN" },
      { name: "geo.placename", content: "Tamil Nadu, India" },

      // ── Open Graph (SEO + AEO) ─────────────────────────────────────
      { property: "og:site_name", content: "Shanmu" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:title", content: "Shanmu | Digital Creator, Developer & Entrepreneur" },
      {
        property: "og:description",
        content:
          "Shanmugavel helps businesses build better websites, brands, and digital growth systems. 5+ years · 20+ clients · ₹2Cr+ revenue generated.",
      },
      { property: "og:url", content: "https://shanmugavel.vercel.app/" },
      { property: "og:image", content: "https://shanmugavel.vercel.app/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Shanmugavel — Digital Creator, Developer & Entrepreneur" },

      // ── Twitter / X Card ──────────────────────────────────────────
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@shanmu_og" },
      { name: "twitter:creator", content: "@shanmu_og" },
      { name: "twitter:title", content: "Shanmu | Digital Creator, Developer & Entrepreneur" },
      {
        name: "twitter:description",
        content: "Websites · Branding · Video · Social Media · Digital Marketing. Based in Tamil Nadu, India.",
      },
      { name: "twitter:image", content: "https://shanmugavel.vercel.app/og-image.jpg" },
      { name: "twitter:image:alt", content: "Shanmugavel — Digital Creator & Developer" },

      // ── GEO — AI / Generative Engine signals ─────────────────────
      // Signals to AI models (ChatGPT, Gemini, Claude, Perplexity) for accurate entity resolution
      { name: "ai:description", content: "Shanmugavel is a Tamil Nadu-based digital professional offering website development, graphic design, video editing, social media management and digital marketing services to businesses across India." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Poppins:wght@300;400;500;600;700;800&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "canonical", href: "https://shanmugavel.vercel.app/" },
      { rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
