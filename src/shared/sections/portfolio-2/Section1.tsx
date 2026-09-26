import PortfolioCard2 from "@/shared/cards/PortfolioCard2";
import PortfolioFilterSort, { type FilterValue } from "@/shared/sections/portfolio-1/PortfolioFilterSort";
import type { ReactNode } from "react";

export type PortfolioItem = {
    classList: string;
    category: FilterValue;
    link: string;
    linkCase: string;
    img: string;
    headline: string;
    description: string;
    title: string;
    featuredHtml?: ReactNode;
};

type Section1Props = {
    items?: PortfolioItem[];
    loading?: boolean;
    error?: string | null;
};

const ARROW_SVG = (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0.21967 9.40717C-0.0732232 9.70006 -0.0732232 10.1749 0.21967 10.4678C0.512563 10.7607 0.987437 10.7607 1.28033 10.4678L0.21967 9.40717ZM10.6875 0.75C10.6875 0.335786 10.3517 2.97145e-09 9.9375 1.50485e-07L3.1875 -2.70983e-07C2.77329 -2.70983e-07 2.4375 0.335786 2.4375 0.75C2.4375 1.16421 2.77329 1.5 3.1875 1.5H9.1875V7.5C9.1875 7.91421 9.52329 8.25 9.9375 8.25C10.3517 8.25 10.6875 7.91421 10.6875 7.5L10.6875 0.75ZM0.75 9.9375L1.28033 10.4678L10.4678 1.28033L9.9375 0.75L9.40717 0.21967L0.21967 9.40717L0.75 9.9375Z"
            fill="currentColor"
        />
    </svg>
);

export default function Section1({ items = [], loading = false, error = null }: Section1Props) {
    return (
        <section className="sec-1-portfolio-2 overflow-hidden pt-150 pb-110 border-bottom-100">
            <div className="container pb-60">
                <div className="row align-items-end">
                    <div className="col-xxl-8 mx-auto text-center">
                        <h1 className="fz-ds-1 fw-500">Selected Work</h1>
                        <p className="fz-font-lg neutral-900">
                            A thoughtful selection of work shaped by simplicity and meaningful outcomes.
                        </p>
                    </div>
                </div>
            </div>
            <div className="container">
                {loading ? (
                    <p className="text-center fz-font-lg neutral-900">Loading projects…</p>
                ) : error ? (
                    <p className="text-center fz-font-lg neutral-900">{error}</p>
                ) : items.length === 0 ? (
                    <p className="text-center fz-font-lg neutral-900">No projects found.</p>
                ) : (
                    <PortfolioFilterSort
                        items={items}
                        filterColumnClassName="col-lg-8 mx-auto"
                        filterFlexClassName="justify-content-center"
                        leadingColumnClassName="col-2"
                    >
                        {(visibleItems, { hasMore, onLoadMore }) => (
                            <div className="row">
                                {visibleItems.map((item, idx) => (
                                    <PortfolioCard2
                                        key={`${item.title}-${idx}`}
                                        classList={item.classList}
                                        category={item.category}
                                        link={item.link}
                                        linkCase={item.linkCase}
                                        img={item.img}
                                        headline={item.headline}
                                        description={item.description}
                                        title={item.title}
                                        featuredHtml={item.featuredHtml}
                                    />
                                ))}
                                {hasMore && (
                                    <div className="col-12 text-center">
                                        <button type="button" className="at-btn" onClick={onLoadMore}>
                                            <span>
                                                <span className="text-1">LOAD MORE PROJECTS</span>
                                                <span className="text-2">LOAD MORE PROJECTS</span>
                                            </span>
                                            <i>
                                                {ARROW_SVG}
                                                {ARROW_SVG}
                                            </i>
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </PortfolioFilterSort>
                )}
            </div>
        </section>
    );
}
