const express = require('express');
const nano = require('nano');
const fs = require('fs');
const path = require('path');

const couch = nano('http://admin:1996@localhost:5984');
const db = couch.use('vue');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/text', async (req, res) => {
  try {
    const doc = await db.get('b80526d9f3c7d5d6b332521003000388');

    if (!doc || !doc.content) {
      throw new Error('Document or content field not found');
    }

    res.status(200).json({ text: doc.content });
  } catch (error) {
    console.error('Error retrieving text:', error);
    res.status(500).json({ error: 'Failed to retrieve text' });
  }
});

app.get('/api/image', (req, res) => {
  db.get('my_image', (err, body) => {
    if (err) {
      console.error('Error retrieving image:', err);
      res.status(500).send('Error retrieving image');
    } else {
      res.contentType('image/jpeg');
      res.send(Buffer.from(body.image_data, 'base64'));
    }
  });
});

app.get('/api/video', (req, res) => {
  const videoPath = path.join(__dirname, 'video.mp4');


  fs.access(videoPath, fs.constants.F_OK, (err) => {
    if (!err) {

      res.sendFile(videoPath);
    } else {

      reconstructVideo(res, videoPath);
    }
  });
});

function reconstructVideo(res, videoPath) {
  const query = { selector: { type: 'videoChunk' }, fields: ['data', 'position'] };

  db.find(query, (err, body) => {
    if (err) {
      console.error('Error fetching video chunks from CouchDB:', err);
      res.status(500).send('Error retrieving video');
      return;
    }

    if (body.docs.length === 0) {
      console.error('No video chunks found in CouchDB');
      res.status(404).send('Video not found');
      return;
    }


    body.docs.sort((a, b) => a.position - b.position);


    const writeStream = fs.createWriteStream(videoPath);
    body.docs.forEach((doc) => {
      writeStream.write(Buffer.from(doc.data, 'base64'));
    });

    writeStream.on('error', (err) => {
      console.error('Error writing video file:', err);
      res.status(500).send('Error reconstructing video');
    });

    writeStream.on('close', () => {
      console.log('Video reconstruction complete.');
      res.sendFile(videoPath);
    });

    writeStream.end();
  });
}


app.post('/api/save', async (req, res) => {
  try {
    const inputValue = req.body.inputValue;

    const result = await db.insert({ value: inputValue });

    res.status(200).json({ success: true, id: result.id });
  } catch (error) {
    console.error('Error saving input value:', error);
    res.status(500).json({ error: 'Failed to save input value' });
  }
});


app.get('/api/retrieve', async (req, res) => {
  try {

    const result = await db.list({ include_docs: true });

    const inputValues = result.rows.map(row => row.doc.value);
    res.status(200).json({ inputValues });
  } catch (error) {
    console.error('Error retrieving input values:', error);
    res.status(500).json({ error: 'Failed to retrieve input values' });
  }
});


app.listen(port, () => {
  console.log(`Go on port: ${port}`);
});
