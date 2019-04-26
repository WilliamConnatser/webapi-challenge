require('dotenv').config();
const server = require('./server');
const port = process.env.PORT || 5000;
server.listen(5000, _ => console.log(`\n\n\u{1F680} \u{1F680} \u{1F680} \n Server running on ${port} \n\u{1F680} \u{1F680} \u{1F680}\n\n`))