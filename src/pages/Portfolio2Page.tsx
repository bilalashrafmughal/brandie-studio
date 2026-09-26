import { useEffect, useState } from "react";
import PageMeta from "@/seo/PageMeta";
import Section1, { type PortfolioItem } from "@/shared/sections/portfolio-2/Section1";
import Section2 from "@/shared/sections/about-3/Section7";
import { getProjects, type Project } from "@/api/project";
import { API_BASE_URL, BACKEND_URL } from "@/api/index";

/** Map an API project category onto the portfolio filter values. */
const CATEGORY_MAP: Record<string, PortfolioItem["category"]> = {
  "ui-ux-design": "design",
  branding: "design",
  "web-development": "design",
  photography: "photography",
  "digital-marketing": "marketing",
  "motion-graphics": "marketing",
};

const projectToItem = (project: Project, index: number): PortfolioItem => ({
  classList: "col-lg-6",
  category: CATEGORY_MAP[project.category] ?? "design",
  link: `/portfolio/${project.slug}`,
  linkCase: "#",
  img: project.mainImage ? `${BACKEND_URL}${project.mainImage}` : "/assets/imgs/pages/img-63.webp",
  headline: project.description ?? project.title,
  description: project.description ?? "",
  title: project.title,
  featuredHtml: project.featured ? (
    <span className="alt-portfolio-tag bg-theme-primary px-3 py-2 rounded-pill p-absolute top-0 end-0 m-4 fz-10 fw-600 text-white">
      FEATURED CASE
    </span>
  ) : undefined,
});

export default function Portfolio2Page() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    getProjects()
      .then((projects) => {
        if (!isMounted) return;
        setItems(projects.map(projectToItem));
      })
      .catch((err: unknown) => {
        if (!isMounted) return;
        console.error("Failed to load projects:", err);
        setError("Failed to load projects. Please try again later.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <PageMeta title="Portfolio - Brandie Studio" />
      <Section1 items={items} loading={loading} error={error} />
      <Section2 />
    </>
  );
}
