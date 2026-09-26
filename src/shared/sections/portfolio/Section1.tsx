import type { ProjectDetail } from "@/api/project";

type Section1Props = {
  project: ProjectDetail;
};

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="d-flex justify-content-between border-bottom-100 py-4">
      <p className="fz-font-md neutral-900 mb-0">{label}</p>
      <p className="fz-font-lg fw-600 mb-0 neutral-900">{value}</p>
    </div>
  );
}

export default function Section1({ project }: Section1Props) {
  const {
    title,
    description,
    category,
    client,
    role,
    location,
    projectDate,
    company,
  } = project;

  const meta: { label: string; value: string }[] = [
    { label: "Client", value: client ?? company.name },
    ...(projectDate ? [{ label: "Release Date", value: projectDate }] : []),
    ...(role ? [{ label: "Role", value: role }] : []),
    ...(location ? [{ label: "Location", value: location }] : []),
  ];

  return (
    <section className="sec-portfolio-header overflow-hidden pt-150 pb-50">
      <div className="container">
        <div className="row g-3 align-items-end">
          <div className="col-md-9">
            <h1 className="fz-ds-1 lh-1 fw-500 d-flex mb-0">
              {title}
              <sup className="fz-80 fw-400 top-0">®</sup>
            </h1>
            <h5 className="fw-600 mb-0">{company.name}</h5>
          </div>
          <div className="col-md-3 ms-auto text-md-end">
            <span className="neutral-900 fz-font-label text-uppercase">
              {category?.replace(/-/g, " ")}
            </span>
          </div>
          <div className="col-12">
            <div className="border-bottom-100 pb-30" />
          </div>
        </div>
        <div className="row mt-50">
          <div className="col-lg-5">
            <div className="sec-2-home-5__card sec-2-home-5__card--list d-flex align-items-center">
              <ul className="sec-2-home-5__list list-unstyled mb-0">
                <li className="sec-2-home-5__list-item">
                  <h6 className="mb-0 fw-600">Introduction</h6>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-7">
            {meta.length > 0 ? (
              meta.map((row) => <MetaRow key={row.label} {...row} />)
            ) : (
              <p className="fz-font-lg neutral-900 mb-0">{description ?? "No description provided."}</p>
            )}
            {description ? (
              <p className="fz-font-2xl fw-400 neutral-900 mt-40">{description}</p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
