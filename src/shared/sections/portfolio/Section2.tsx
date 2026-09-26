import { useMemo, type CSSProperties } from "react";
import type { ProjectImage } from "@/api/project";
import { BACKEND_URL } from "@/api/index";

/** Resolve a server-relative image path against the backend origin. */
const resolveImage = (path: string): string =>
  path.startsWith("http") ? path : `${BACKEND_URL}${path}`;

/** Map a numeric column span onto a Bootstrap column class. */
const columnClass = (columns: number): string => {
  const span = Math.min(Math.max(Math.round(columns), 1), 12);
  return `col-lg-${span}`;
};

/** Minimal 1px gap between columns and rows. */
const GUTTER_STYLE: CSSProperties = {
  "--bs-gutter-x": "2px",
  "--bs-gutter-y": "2px",
  "--bs-gutter-y-cols": "2px",
} as CSSProperties;

type Section2Props = {
  images: ProjectImage[];
};

export default function Section2({ images }: Section2Props) {
  const orderedImages = useMemo<ProjectImage[]>(
    () => images.slice().sort((a, b) => a.sortOrder - b.sortOrder),
    [images]
  );

  if (orderedImages.length === 0) {
    return (
      <section className="sec-portfolio-gallery pt-80 pb-100 container">
        <div className="container">
          <p className="text-center fz-font-lg neutral-900 mb-0">No images available for this project.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="sec-portfolio-gallery pt-80 pb-100">
      <div className="container">
        <div className="row" style={GUTTER_STYLE}>
          {orderedImages.map((image) => (
            <div key={image.id} className={columnClass(image.columns)}>
              <figure className="mb-0">
                <img
                  src={resolveImage(image.image)}
                  alt={image.caption ?? "Portfolio image"}
                  loading="lazy"
                  className="w-100 d-block"
                  style={{ width: "100%", height: "auto" }}
                />
                {image.caption ? (
                  <figcaption className="fz-font-md neutral-900 opacity-70 mt-10">{image.caption}</figcaption>
                ) : null}
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
