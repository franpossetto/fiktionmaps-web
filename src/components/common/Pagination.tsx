import { Pagination as P } from "antd";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  totalElements: number;
  pageSize: number;
  setCurrentPage: (pageNumber: number) => void;
}

export const Pagination = (props: PaginationProps) => {
  const { totalPages, currentPage, totalElements, pageSize, setCurrentPage } =
    props;

  const onChangePagination = (page: number): void => {
    setCurrentPage(page);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white h-14 border-gray-100 border-t-2 pt-4">
      <div className="flex justify-center items-center">
        {totalPages != null ? (
          <P
            defaultCurrent={currentPage}
            pageSize={pageSize}
            total={totalElements}
            size="small"
            responsive
            onChange={onChangePagination}
          />
        ) : (
          <P defaultCurrent={1} total={3} size="small" disabled responsive />
        )}
        <p> {totalElements} places</p>
      </div>
    </div>
  );
};
