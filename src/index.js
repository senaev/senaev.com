const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/static'));

app.listen(80, () => console.log('Listening on port 80'));
