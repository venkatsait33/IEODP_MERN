const Pagination = ({ page, setPage }) => {
  return (
    <div className="flex justify-end gap-2 mt-4">
      <button
        className="btn btn-sm"
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        disabled={page === 1}
      >
        Prev
      </button>

      <span className="px-2 py-1 text-sm">Page {page}</span>

      <button className="btn btn-sm" onClick={() => setPage((p) => p + 1)}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
