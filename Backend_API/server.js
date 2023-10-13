const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();
const PORT = process.env.PORT || 5000;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.use(express.json());
// Use the cors middleware
app.use(cors());

// Set up routes (will do this in Step 2)
app.use('/api', require('./routes/apiRoutes'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
