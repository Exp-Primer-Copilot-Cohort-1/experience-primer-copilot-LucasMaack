// Create web server
// Start server
// Create a JSON file
// Read JSON file
// Create a route
// Create a route handler
// Parse JSON data
// Create a new comment
// Write new comment to JSON file
// Send response
// Handle errors
// Handle 404 errors
// End server

const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

// Create web server
const server = http.createServer((req, res) => {
  // Create a route
  if (req.url === '/comments' && req.method === 'GET') {
    // Read JSON file
    fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
        return;
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });
  } else if (req.url === '/comments' && req.method === 'POST') {
    // Parse JSON data
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const comment = JSON.parse(body);

      // Read JSON file
      fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Internal Server Error' }));
          return;
        }

        const comments = JSON.parse(data);

        // Create a new comment
        comments.push(comment);

        // Write new comment to JSON file
        fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments), (err) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Internal Server Error' }));
            return;
          }

          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(comment));
        });
      });
    });
  } else {
    // Handle 404 errors
    res.writeHead(404, { '