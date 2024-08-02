const express = require('express');
const next = require('next');
 
const dev = process.env.NODE_ENV !== 'production'
const hostname = '0.0.0.0'
const port = process.env.port || 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()
 
app.prepare().then(() => {
    const server = express();

    server.use('/_next', express.static('.next', { dotfiles: 'allow' }));
  
    server.all('*', (req, res) => {
      return handle(req, res);
    });
  
    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://${hostname}:${port}`);
    });
})