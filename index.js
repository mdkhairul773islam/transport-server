const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = require('express')();
const http = require('http').createServer(app);
const path = require('path');

const Router = require('./src/routes/index');

app.use(cors({ origin: '*' }));

app.use(
  fileUpload({
    createParentPath: true,
  }),
);

app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb', strict: false }));

app.use(Router);

app.use(express.static(path.join(__dirname, 'src')));

const port = process.env.PORT || 9000;
http.listen(port, () => console.log(`Server Is Running On ${port}`));
