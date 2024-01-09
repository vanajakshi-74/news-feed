const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/newsfeed', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a mongoose model (schema)
const NewsFeedItemSchema = new mongoose.Schema({
  title: String,
  link: String,
  // Add more fields as needed
});

const NewsFeedItem = mongoose.model('NewsFeedItem', NewsFeedItemSchema);

// Express route to fetch data from MongoDB
app.get('/api/news', async (req, res) => {
  try {
    const newsItems = await NewsFeedItem.find();
    res.json(newsItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
