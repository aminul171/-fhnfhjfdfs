const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to serve the index.html file
app.get('/', (req, res) => {
  // Read users.json file
  fs.readFile(path.join(__dirname, 'admins.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading JSON file');
    }

    const users = JSON.parse(data);

    // Read sa.html file
    fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, html) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error reading HTML file');
      }

      // Replace placeholders in HTML with user data
      const modifiedHtml = html.replace('<!-- USERS_DATA -->', generateTableRows(users));

      // Send the modified HTML to the client
      res.send(modifiedHtml);
    });
  });
});


app.get('/sa', (req, res) => {
  // Read users.json file
  fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading JSON file');
    }

    const users = JSON.parse(data);

    // Read sa.html file
    fs.readFile(path.join(__dirname, 'public', 'sa.html'), 'utf8', (err, html) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error reading HTML file');
      }

      // Replace placeholders in HTML with user data
      const modifiedHtml = html.replace('<!-- USERS_DATA -->', generateTableRows(users));

      // Send the modified HTML to the client
      res.send(modifiedHtml);
    });
  });
});

app.get('/cs', (req, res) => {
  // Read users.json file
  fs.readFile(path.join(__dirname, 'cs.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading JSON file');
    }

    const users = JSON.parse(data);

    // Read sa.html file
    fs.readFile(path.join(__dirname, 'public', 'cs.html'), 'utf8', (err, html) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error reading HTML file');
      }

      // Replace placeholders in HTML with user data
      const modifiedHtml = html.replace('<!-- USERS_DATA -->', generateTableRows(users));

      // Send the modified HTML to the client
      res.send(modifiedHtml);
    });
  });
});
app.get('/ad', (req, res) => {
  // Read users.json file
  fs.readFile(path.join(__dirname, 'ad.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading JSON file');
    }

    const users = JSON.parse(data);

    // Read sa.html file
    fs.readFile(path.join(__dirname, 'public', 'ad.html'), 'utf8', (err, html) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error reading HTML file');
      }

      // Replace placeholders in HTML with user data
      const modifiedHtml = html.replace('<!-- USERS_DATA -->', generateTableRows(users));

      // Send the modified HTML to the client
      res.send(modifiedHtml);
    });
  });
});

app.get('/sag', (req, res) => {
  // Read users.json file
  fs.readFile(path.join(__dirname, 'sag.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading JSON file');
    }

    const users = JSON.parse(data);

    // Read sa.html file
    fs.readFile(path.join(__dirname, 'public', 'sag.html'), 'utf8', (err, html) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error reading HTML file');
      }

      // Replace placeholders in HTML with user data
      const modifiedHtml = html.replace('<!-- USERS_DATA -->', generateTableRows(users));

      // Send the modified HTML to the client
      res.send(modifiedHtml);
    });
  });
});
app.get('/ma', (req, res) => {
  // Read users.json file
  fs.readFile(path.join(__dirname, 'mag.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading JSON file');
    }

    const users = JSON.parse(data);

    // Read sa.html file
    fs.readFile(path.join(__dirname, 'public', 'mag.html'), 'utf8', (err, html) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error reading HTML file');
      }

      // Replace placeholders in HTML with user data
      const modifiedHtml = html.replace('<!-- USERS_DATA -->', generateTableRows(users));

      // Send the modified HTML to the client
      res.send(modifiedHtml);
    });
  });
});
// Function to generate table rows from user data
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
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});
app.get('/users', (req, res) => {
  fs.readFile(path.join(__dirname, 'admins.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading JSON file');
    }
    const users = JSON.parse(data);
    res.json(users);
  });
});

// Define a route to handle form submission and add a new user

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const jsonFilesDir = path.join(__dirname);

const readJsonFile = (fileName) => {
  try {
    const filePath = path.join(jsonFilesDir, fileName);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading file:', error);
    return [];
  }
};

const writeJsonFile = (fileName, data) => {
  try {
    const filePath = path.join(jsonFilesDir, fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing to file:', error);
  }
};

const createWhatsAppLink = (phoneNumber) => {
  return `https://wa.me/${phoneNumber.replace(/\D/g, '')}`;
};

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/add', (req, res) => {
  const { data, fileName } = req.body;

  if (!data || !fileName) {
    return res.status(400).json({ message: 'Data and file name are required' });
  }

  const { type, name, phoneNumber } = data;

  if (!type || !name || !phoneNumber) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const phoneAppLink = createWhatsAppLink(phoneNumber);

  const newEntry = {
    type,
    name,
    phoneAppLink,
    phoneNumber
  };

  const jsonData = readJsonFile(fileName);
  jsonData.push(newEntry);
  writeJsonFile(fileName, jsonData);

  res.json({ message: 'Data added successfully', newData: newEntry });
});

app.post('/delete', (req, res) => {
  const { data, fileName } = req.body;

  if (!data || !fileName) {
    return res.status(400).json({ message: 'Data and file name are required' });
  }

  const { phoneNumber } = data;

  if (!phoneNumber) {
    return res.status(400).json({ message: 'Phone number is required for deletion' });
  }

  let jsonData = readJsonFile(fileName);

  const newData = jsonData.filter(entry => entry.phoneNumber !== phoneNumber);

  writeJsonFile(fileName, newData);

  res.json({ message: 'Data deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
