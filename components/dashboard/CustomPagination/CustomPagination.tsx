'use client';

import useSetSearchQueryInURL from '@/hooks/useSetSearchQueryInURL';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const CustomPagination: React.FC<PaginationProps> = ({ meta }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { setQuery, searchParams } = useSetSearchQueryInURL();

  const { total: totalItems, limit: pageSize, totalPages } = meta;

  const currentPage = Number(searchParams.get('page')) || meta.page || 1;

  const handlePageChange = (page: number) => {
    setQuery('page', page);
  };

  useEffect(() => {
    if (!searchParams.get('page') && meta.page) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(meta.page));
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [searchParams, pathname, router, meta.page]);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 px-2 py-3">
      {/* Info */}
      <div className="text-xs sm:text-sm text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{start}</span> to{' '}
        <span className="font-semibold text-foreground">{end}</span> of{' '}
        <span className="font-semibold text-foreground">{totalItems}</span> entries
      </div>

      {/* Buttons */}
      <div className="flex items-center space-x-1.5">
        <button
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="flex cursor-pointer items-center gap-1 rounded-xl border border-border/80 bg-background dark:bg-[#0E1726]/90 px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/30 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-background"
        >
          <ChevronLeft className="h-4 w-4" /> <span>Prev</span>
        </button>

        {getPageNumbers().map((page, idx) => (
          <button
            key={idx}
            disabled={page === '...'}
            onClick={() => page !== '...' && handlePageChange(Number(page))}
            className={`cursor-pointer rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
              currentPage === page
                ? 'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700'
                : 'border border-border/80 bg-background dark:bg-[#0E1726]/90 text-foreground hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/30'
            } ${page === '...' ? 'cursor-default border-none bg-transparent hover:bg-transparent text-muted-foreground' : ''}`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="flex cursor-pointer items-center gap-1 rounded-xl border border-border/80 bg-background dark:bg-[#0E1726]/90 px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/30 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-background"
        >
          <span>Next</span> <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default CustomPagination;
