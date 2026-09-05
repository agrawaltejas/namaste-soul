import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  // A single page needs no controls.
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const atStart = page === 1;
  const atEnd = page === totalPages;

  const arrowClass =
    'label-eyebrow group flex items-center gap-3 transition-colors ' +
    'disabled:pointer-events-none disabled:opacity-30 hover:text-primary';

  return (
    <nav
      aria-label="Pagination"
      className="mt-16 flex items-center justify-between gap-6 border-t border-border pt-8"
    >
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={atStart}
        className={arrowClass}
      >
        <ArrowLeft
          className="h-4 w-4 transition-transform duration-500 ease-out-soft group-hover:-translate-x-1"
          strokeWidth={1.5}
        />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page numbers set in the display serif, so they read as folios */}
      <div className="flex items-center gap-1">
        {pages.map((n) => {
          const isCurrent = n === page;
          return (
            <button
              key={n}
              type="button"
              onClick={() => onPageChange(n)}
              aria-current={isCurrent ? 'page' : undefined}
              aria-label={`Page ${n}`}
              className={[
                'font-display h-10 w-10 text-base transition-colors',
                isCurrent
                  ? 'border-b border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              ].join(' ')}
            >
              {n}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={atEnd}
        className={arrowClass}
      >
        <span className="hidden sm:inline">Next</span>
        <ArrowRight
          className="h-4 w-4 transition-transform duration-500 ease-out-soft group-hover:translate-x-1"
          strokeWidth={1.5}
        />
      </button>
    </nav>
  );
};

export default Pagination;
