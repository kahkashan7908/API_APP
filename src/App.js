import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button,} from '@mui/material';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(0);
  const rowsPerPage = 5; // Set to 5 records per page

  useEffect(() => {
    axios.get('http://localhost:5000/api/data')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const showDetails = (user) => {
    setSelectedUser(user);
  }

  const closeDetails = () => {
    setSelectedUser(null);
  }

  const start = page * rowsPerPage;
  const end = start + rowsPerPage;
  const usersToDisplay = users.slice(start, end);

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>Users</h1>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: 'Azure' }}>
              <TableCell><h2>Name</h2></TableCell>
              <TableCell><h2>Email</h2></TableCell>
              <TableCell><h2>City</h2></TableCell>
              <TableCell><h2>Action</h2></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersToDisplay.map((user) => (
              <>
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.address.city}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => showDetails(user)}>View Details</Button>
                  </TableCell>
                </TableRow>
                {selectedUser === user && (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <div className="user-details">
                        <h2>{user.name}</h2>
                        <p><b>Username:</b> {user.username}</p>
                        <p><b>Phone:</b> {user.phone}</p>
                        <p><b>Address:</b> {user.address.street + "," + user.address.city}</p>
                        <p><b>Company:</b> {user.company.name}</p>
                        <p><b>Website:</b> {user.website}</p>
                        <Button variant="contained" onClick={closeDetails}>Close Details</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
        >
          Previous
        </Button>
        <p style={{ margin: '10px' }}>{`Page ${page + 1}`}</p>
        <Button
          variant="contained"
          onClick={() => setPage(page + 1)}
          disabled={end >= users.length}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default App;
