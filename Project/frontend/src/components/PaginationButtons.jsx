import {
  TablePagination,
  IconButton,
  ButtonGroup,
  Button,
  Box,
} from "@mui/material";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";

// Custom pagination actions component
const PaginationButtons = ({ count, page, rowsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(count / rowsPerPage) - 1;

  const handlePageClick = (newPage) => {
    onPageChange(null, newPage);
  };

  const visiblePageNumbers = () => {
    const currentPage = page + 1;
    const totalVisible = 5; // Number of visible page buttons
    const pages = [];

    let start = Math.max(1, currentPage - Math.floor(totalVisible / 2));
    let end = Math.min(totalPages + 1, start + totalVisible - 1);

    if (end - start + 1 < totalVisible) {
      start = Math.max(1, end - totalVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    // if(!pages.includes(1))pages.unshift(1);
    // if(!pages.includes(totalPages))pages.push(totalPages)
    return pages;
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <IconButton
        onClick={() => handlePageClick(0)}
        disabled={page === 0}
        aria-label="first page"
      >
        <KeyboardDoubleArrowLeft />
      </IconButton>
      <IconButton
        onClick={() => handlePageClick(page - 1)}
        disabled={page === 0}
        aria-label="previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>

      <ButtonGroup variant="text">
        {visiblePageNumbers().map((pageNumber) => (
          <Button
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber - 1)}
            disabled={page === pageNumber - 1}
            sx={{
              minWidth: 32,
              fontWeight: page === pageNumber - 1 ? "bold" : "normal",
              color: page === pageNumber - 1 ? "primary.main" : "inherit",
            }}
          >
            {pageNumber}
          </Button>
        ))}
      </ButtonGroup>

      <IconButton
        onClick={() => handlePageClick(page + 1)}
        disabled={page >= totalPages}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>

      <IconButton
        onClick={() => handlePageClick(totalPages)}
        disabled={page >= totalPages}
        aria-label="last page"
      >
        <KeyboardDoubleArrowRight />
      </IconButton>
    </Box>
  );
};
export default PaginationButtons;
