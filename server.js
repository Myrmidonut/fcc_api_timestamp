const express = require('express');
const cors    = require('cors');

const app = express();

app.use(cors({optionSuccessStatus: 200}));
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", (req, res) => {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp", (req, res) => {
  let date;
  
  if (req.query.time === "" || !req.query.time) date = new Date();
  else {
    const date_number = Number(req.query.time);
    let date_string = req.query.time;
    
    if (date_string == date_number) {
      date_string = date_number;
    }

    date = new Date(date_string);
  }
  
  res.json({
    "unix": date.getTime(),
    "utc": date.toUTCString()
  });
});

app.get("/api/timestamp/:date_string", (req, res) => {
  const date_number = Number(req.params.date_string);
  let date_string = req.params.date_string;
  
  if (date_string == date_number) {
    date_string = date_number;
  }
  
  const date = new Date(date_string);

  res.json({
    "unix": date.getTime(),
    "utc" : date.toUTCString()
  });
});

const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});