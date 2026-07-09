const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Node.js API!' });
});

app.post('/api/echo', (req, res) => {
  res.json({ received: req.body });
});

let requestCounter = 0;

app.get('/api/nexttick-problem', (req, res) => {
  // Problem: this route schedules the counter increment with process.nextTick(),
  // but sends the response using the current counter value before the nextTick callback runs.
  process.nextTick(() => {
    requestCounter += 1;
    console.log('process.nextTick update:', requestCounter);
    res.json({
      problem: 'counter increment is scheduled in nextTick after response is sent',
      requestCounter,
      hint: 'The response does not show the increment that happens inside process.nextTick()',
    });
  });

});

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
