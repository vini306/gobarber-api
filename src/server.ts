import express, { response } from 'express';
const app = express();

app.get('/', (request, response)=>{
  return response.send('Hello world');
});

app.listen(3333, () => {
  console.log('Server start at port 3333');
});