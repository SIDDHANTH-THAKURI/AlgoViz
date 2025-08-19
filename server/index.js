import express from 'express';
import multer from 'multer';
import analyze from './analyzers/index.js';

const app = express();
const upload = multer();

app.post('/api/analyze', upload.single('code'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const ext = req.file.originalname.split('.').pop().toLowerCase();
    const code = req.file.buffer.toString('utf-8');
    const result = await analyze(ext, code);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Analysis failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Analyzer server running on port ${PORT}`);
});
