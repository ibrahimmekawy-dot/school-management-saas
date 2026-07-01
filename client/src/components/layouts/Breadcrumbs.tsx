import { useLocation, Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs() {
  const [location] = useLocation();

  // Parse breadcrumbs from location
  const parts = location.split("/").filter(Boolean);
  const breadcrumbs = [{ label: "Home", href: "/" }];

  let currentPath = "";
  for (const part of parts) {
    currentPath += `/${part}`;
    const label = part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " ");
    breadcrumbs.push({ label, href: currentPath });
  }

  return (
    <div className="flex items-center gap-2 mb-6 text-sm">
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.href} className="flex items-center gap-2">
          {index > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
          {index === breadcrumbs.length - 1 ? (
            <span className="text-foreground font-medium">{crumb.label}</span>
          ) : (
            <Link href={crumb.href}>
              <a className="text-primary hover:underline">{crumb.label}</a>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
