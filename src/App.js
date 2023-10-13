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
                      <TableContainer component={Paper}>
                        <Table aria-label="user-details-table">
                          <TableHead>
                            <TableRow style={{ backgroundColor: 'skyblue' }}>
                              <TableCell><h5>Name</h5></TableCell>
                              <TableCell><h5>Username</h5></TableCell>
                              <TableCell><h5>Phone</h5></TableCell>
                              <TableCell><h5>Address</h5></TableCell>
                              <TableCell><h5>Company</h5></TableCell>
                              <TableCell><h5>Website</h5></TableCell>
                              <TableCell><h5>Close</h5></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>{user.name}</TableCell>
                              <TableCell>{user.username}</TableCell>
                              <TableCell>{user.phone}</TableCell>
                              <TableCell>{user.address.street + ', ' + user.address.city}</TableCell>
                              <TableCell>{user.company.name}</TableCell>
                              <TableCell>{user.website}</TableCell>
                              <TableCell>
                                <Button variant="contained" onClick={closeDetails} className='btn bg-danger'>X</Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
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
