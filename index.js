const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs')
const app = express();
const PORT = process.env.PORT || 3000;
const mongoURI = 'mongodb+srv://aminuljisam876:nCtLDSYbtyiQ5Xta@cluster0.ja3hxsd.mongodb.net/File';


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));




app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//static folder
app.use(express.static(path.join(__dirname, 'public')));

// Function to generate WhatsApp link
function createWhatsAppLink(phoneNumber) {
  return `https://api.whatsapp.com/send?phone=${phoneNumber}`;
}

// Route to serve the admin.html file
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Route to fetch users from MongoDB
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error reading users from MongoDB');
  }
});

// Route to add a new user to MongoDB
app.post('/add', async (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ message: 'Data is required' });
  }

  const { type, name, phoneNumber } = data;

  if (!type || !name || !phoneNumber) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const phoneAppLink = createWhatsAppLink(phoneNumber); // Generate WhatsApp link

  try {
    const newUser = new User({
      type,
      name,
      phoneNumber
    });

    const savedUser = await newUser.save();
    res.json({ message: 'Data added successfully', newData: savedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding data to MongoDB' });
  }
});

// Route to delete a user from MongoDB
// Route to delete a user from MongoDB based on phone number and type
app.post('/delete', async (req, res) => {
  const { phoneNumber, type } = req.body;

  if (!phoneNumber || !type) {
    return res.status(400).send('Phone number and type are required for deletion');
  }

  try {
    // Assuming you have a mongoose model called User
    const userToDelete = await User.findOneAndDelete({ phoneNumber, type });

    if (!userToDelete) {
      return res.status(404).send('User not found');
    }

    // Render a success message
    res.status(200).send(`
      <h2>User deleted successfully</h2>
      <p>Deleted user with phone number: ${userToDelete.phoneNumber} and type: ${userToDelete.type}</p>
      <a href="/">Go Back</a>
    `);
  } catch (err) {
    console.error(err);
    // Render an error message
    res.status(500).send('Error deleting user from MongoDB');
  }
});



// Create a Mongoose Schema for the admins collection

// Create a Mongoose Schema for the cs collection
// Create a Mongoose Schema for the users collection
const userSchema = new mongoose.Schema({
  type: String,
  name: String,
  phoneNumber: String
}, { collection: 'users' }); // Specify the collection name for users

// Create a Mongoose Model for users
const User = mongoose.model('User', userSchema);


// Route to fetch users of type "admin" from MongoDB users collection
app.get('/', async (req, res) => {
  try {
    const admins = await User.find({ type: 'MAIN ADMIN' }); // Fetch all users of type "admin"
    const html = await fs.promises.readFile(path.join(__dirname, 'index.html'), 'utf8');

    // Replace placeholders in HTML with admin data
    const modifiedHtml = html.replace('<!-- USERS_DATA -->', generateTableRows(admins));

    // Send the modified HTML to the client
    res.send(modifiedHtml);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error reading admin users from MongoDB or HTML file');
  }
});

// Route to fetch users of type "sa" from MongoDB users collection
app.get('/sa', async (req, res) => {
  try {
    const admins = await User.find({ type: 'SUPER ADMIN' }); // Fetch all users of type "admin"
    const html = await fs.promises.readFile(path.join(__dirname, 'public', 'sa.html'), 'utf8');

    // Replace placeholders in HTML with admin data
    const modifiedHtml = html.replace('<!-- USERS_DATA -->', generateTableRows(admins));

    // Send the modified HTML to the client
    res.send(modifiedHtml);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error reading admin users from MongoDB or HTML file');
  }
});

// Route to fetch users of type "cs" from MongoDB users collection
app.get('/cs', async (req, res) => {
  try {
    const admins = await User.find({ type: 'CUSTOMER SUPPORT' }); // Fetch all users of type "admin"
    const html = await fs.promises.readFile(path.join(__dirname, 'public', 'cs.html'), 'utf8');

    // Replace placeholders in HTML with admin data
    const modifiedHtml = html.replace('<!-- USERS_DATA -->', generateTableRows(admins));

    // Send the modified HTML to the client
    res.send(modifiedHtml);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error reading admin users from MongoDB or HTML file');
  }
});

app.get('/ad', async (req, res) => {
  try {
    const admins = await User.find({ type: 'ADMIN' }); // Fetch all users of type "admin"
    const html = await fs.promises.readFile(path.join(__dirname, 'public', 'ad.html'), 'utf8');

    // Replace placeholders in HTML with admin data
    const modifiedHtml = html.replace('<!-- USERS_DATA -->', generateTableRows(admins));

    // Send the modified HTML to the client
    res.send(modifiedHtml);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error reading admin users from MongoDB or HTML file');
  }
});

app.get('/sag', async (req, res) => {
  try {
    const admins = await User.find({ type: 'SUPER AGENT' }); // Fetch all users of type "admin"
    const html = await fs.promises.readFile(path.join(__dirname, 'public', 'sag.html'), 'utf8');

    // Replace placeholders in HTML with admin data
    const modifiedHtml = html.replace('<!-- USERS_DATA -->', generateTableRows(admins));

    // Send the modified HTML to the client
    res.send(modifiedHtml);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error reading admin users from MongoDB or HTML file');
  }
});

app.get('/ma', async (req, res) => {
  try {
    const admins = await User.find({ type: 'MASTER AGENT' }); // Fetch all users of type "admin"
    const html = await fs.promises.readFile(path.join(__dirname, 'public', 'mag.html'), 'utf8');

    // Replace placeholders in HTML with admin data
    const modifiedHtml = html.replace('<!-- USERS_DATA -->', generateTableRows(admins));

    // Send the modified HTML to the client
    res.send(modifiedHtml);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error reading admin users from MongoDB or HTML file');
  }
});

function generateTableRows(users) {
  let rows = '';
  users.forEach(user => {
    rows += `
      <tr>
          <td><b>${user.type}</b></td>
          <td><b>${user.name}</b></td>
          <td><a href="${user.phoneAppLink}"><img src="images/ws.png" width="25"></a></td>
          <td><a href="${user.phoneAppLink}">${user.phoneNumber}</a></td>
      </tr>
    `;
  });
  return rows;
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
