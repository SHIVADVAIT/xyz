import React, { useEffect, useState, useRef } from 'react';
import { TableBody, TableCell, TableHead, TableRow, Table, TableContainer, TablePagination } from '@mui/material';
import { CommanTableContain, PaginationContain } from "../../style/Admin/CourseCategory";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0); // Current page state
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page state
  const [showPaginationBorder, setShowPaginationBorder] = useState(false); // State to control the pagination border
  const tableContainerRef = useRef(null);

  const staticHeaders = [
    { id: "User ID", label: "User ID" },
    { id: "Name", label: "Name" },
    { id: "Phone", label: "Phone", mediaModal: true },
    { id: "Email", label: "Email" },
    { id: "Status", label: "Status" },
  ];

  // Sample users data
  useEffect(() => {
    fetch('http://localhost:8080/api/admin/fetch')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.users);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  // Pagination functions
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when rows per page changes
  };

  // Paginated data
  const filteredData = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Check if vertical scrollbar is visible and update pagination border visibility
  useEffect(() => {
    const tableContainer = tableContainerRef.current;
    if (tableContainer) {
      const isVerticalScrollVisible = tableContainer.scrollHeight > tableContainer.clientHeight;
      setShowPaginationBorder(isVerticalScrollVisible);
    }
  }, [filteredData, rowsPerPage, page]);

  return (
    <CommanTableContain>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>S.No.</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell  className='small'>Email</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No users are present.
              </TableCell>
            </TableRow>
          ) : (
            filteredData.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                <TableCell>{user.user_id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.phone_no}</TableCell>
                <TableCell className="small">{user.email_id}</TableCell>
                <TableCell>{user.status}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </CommanTableContain>
  );
};

export default UserList;
import { Box, Button, TableContainer, TextField } from "@mui/material";
import { styled, textTransform } from "@mui/system";
import { Colors } from "../theme/index";
import { yellow } from "@mui/material/colors";

export const AddButtonContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: "16px", // Matches `mb={2}` (2 * 8px = 16px)
}));

export const CommanTableContain = styled(TableContainer)(() => ({
  maxHeight: "400px", // Set the maximum height for the table container
  overflowY: "auto", // Enable vertical scrolling
  overflowX: "auto", // Enable horizontal scrolling
  border: "1px solid rgba(224, 224, 224, 1)", // Add a border around the table
  borderRadius: "5px", // Optional: Add rounded corners
  marginTop: "10px",
  "& table": {
    width: "100%", // Ensure the table takes up the full width
    borderCollapse: "collapse", // Ensure borders collapse for a cleaner look
  },
  "& .small": {
    fontSize: "12px", // Make the font smaller for the "Email" column
    width: "150px", // Adjust the width of the "Email" column
    whiteSpace: "nowrap", // Prevent text wrapping
    textTransform: "none", // Ensure the text is not capitalized
  },
  "& table thead th": {
    position: "sticky", // Make the header sticky
    top: 0, // Stick to the top
    zIndex: 3, // Ensure it stays above other elements
    backgroundColor: "#bec4cb", // Background color for the header
    color: "#000", // Header text color
    fontWeight: "bold", // Make the header font bold
    borderBottom: "1px solid rgba(224, 224, 224, 1)", // Add a bottom border
    textAlign: "center", // Center-align the header text
  },
}));

export const SmartSearchContain = styled(Box)(() => ({
  width: "200px",
  position: "relative",
  "& .MuiFormControl-root": {
    margin: "0 2px",
  },
  "& label": {
    fontSize: "12px",
  },
  paddingRight: "25px",
  "& input": {
    fontSize: "12px",
    paddingRight: "25px",
    backgroundColor: "#fff",
    "&::placeholder": {
      fontSize: "12px",
    },
  },
  "& svg": {
    position: "absolute",
    right: "3px",
    top: "7px",
    color: Colors.light_gray,
  },
}));

export const PaginationContain = styled(Box)(() => ({
  borderBottom: "1px solid rgba(224, 224, 224, 1)", 
  borderRight: "1px solid rgba(224, 224, 224, 1)",
  borderLeft: "1px solid rgba(224, 224, 224, 1)",
  // Add a border around the entire pagination
  borderRadius: "5px", // Optional: Add rounded corners
  padding: "0.2px 0", // Reduce vertical padding to decrease height
  "& .MuiTablePagination-select": {
    zIndex: 11,
  },
}));

export const PdfButton = styled(Button)(() => ({
  backgroundColor: "transparent",
  minWidth: "30px",
  borderRadius: "5px",
  color: Colors.pending,
}));

export const ContainerCustom = styled(Box)(() => ({
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
  backgroundColor: "#f5f5f5",
  marginBottom: "10px",
  padding: "0",
  borderRadius: "5px",
}));

export const TableModal = styled(Box)(() => ({
  maxWidth: "550px",
  width: "100%",
  maxHeight: "500px",
  backgroundColor: Colors.white,
  display: "flex",
  flexDirection: "column",
  "& .ModalHeader": {
    backgroundColor: Colors.primary,
    color: Colors.white,
    fontSize: "14px",
    position: "relative",
    padding: "15px",
    "& .Title": {
      paddingRight: "30px",
    },
    "& .CloseButton": {
      position: "absolute",
      right: "5px",
      top: "8px",
      width: "30px",
      height: "30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
      color: Colors.white,
      "& svg": {
        color: "inherit",
      },
    },
  },
  "& .ModalBody": {
    padding: "10px",
    overflow: "hidden",
    flex: "1 1 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "420px",
    "& img": {
      maxWidth: "530px",
      width: "100%",
      maxHeight: "400px",
      objectFit: "contain",
    },
  },
}));

export const StatusSwitchContainer = styled(Box)(() => ({
  ' & .switch_button': { 
    backgroundColor: yellow,
  },
  display: "flex",
  alignItems: "center",
  justifyContent: "center", // Center the switch horizontally
}));

export const StyledTextField = styled(TextField)(() => ({
  width: "100%", // Ensure the input field takes up the full width of the cell
  "& .MuiInputBase-root": {
    fontSize: "1rem", // Adjust font size for a medium appearance
    padding: "10px", // Adjust padding for a medium appearance
    borderRadius: "5px", // Optional: Add rounded corners
    border: "1px solid rgba(224, 224, 224, 1)", // Optional: Add a border
  },
}));

export const IconStyles = styled(Box)(() => ({
  "& .icon-done": {
    color: "green",
    cursor: "pointer",
    fontSize: "20px", // Adjust the size if needed
  },
  "& .icon-close": {
    color: "red",
    cursor: "pointer",
    fontSize: "20px", // Adjust the size if needed
  },
  "& .icon-edit": {
    color: "blue",
    cursor: "pointer",
    fontSize: "20px", // Adjust the size if needed
  },
  "& .icon-delete": {
    color: "red",
    cursor: "pointer",
    fontSize: "20px", // Adjust the size if needed
  },
}));