import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageMeta from "@/seo/PageMeta";
import Section1 from "@/shared/sections/portfolio/Section1";
import Section2 from "@/shared/sections/portfolio/Section2";
import { getProject, type ProjectDetail } from "@/api/project";

export default function PortfolioDetailPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    let isMounted = true;
    setLoading(true);
    setError(null);

    getProject(slug)
      .then((data) => {
        if (isMounted) setProject(data);
      })
      .catch((err: unknown) => {
        if (!isMounted) return;
        console.error("Failed to load project:", err);
        setError("Failed to load this project. Please try again later.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return (
    <>
      <PageMeta title={project ? `${project.title} — Brandie Studio` : "Portfolio — Brandie Studio"} />
      {loading ? (
        <section className="pt-150 pb-100">
          <div className="container">
            <p className="text-center fz-font-lg neutral-900 mb-0">Loading project…</p>
          </div>
        </section>
      ) : error || !project ? (
        <section className="pt-150 pb-100">
          <div className="container">
            <p className="text-center fz-font-lg neutral-900 mb-0">{error ?? "Project not found."}</p>
          </div>
        </section>
      ) : (
        <div className="pl-150 pr-150 pt-100">
          <Section2 images={project.images} />
          <Section1 project={project} />
        </div>
      )}
    </>
  );
}
