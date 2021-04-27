const app = require('./app');

const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`Server is up at port http://localhost:${port}`);
});