const express = require('express');
const bodyParser = require('body-parser');
// Controllers
const studentController = require('./src/controllers/studentCtl');

// express
const app = express();
const router = express.Router();

// healtCheck
router.get('/health-check', async (req, res) => {
  const result = {
    status: 200,
    timestamp: Number(new Date()),
    params: req.query
  };

  res.status(result.status).json(result);
});

// GET all students
router.get('/student', (req, res) => {
  // ToDo
});

// GET an student
router.get('/student/:id', (req, res) => {
  // ToDo
});

// INSERT An Student
router.post('/student', async (req, res) => {
  const result = await studentController.save(req.body);
  res.json(result);
});

// Update student
router.put('/student/:id', async (req, res) => {
  const result = await studentController.update(req.body, req.params);
  res.json(result);
});

// DELETE An Student
router.delete('/student/:id', (req, res) => {
  // ToDo
});

app.use(bodyParser.json());
app.use('/api/v1', router);

app.listen(process.env.PORT, () => {
  console.log(
    `[${Date.now()}][${process.env.ENV}:${process.env.APP_PREFIX}:${process.env.NAME}] [LISTENING:${
      process.env.PORT
    }]`,
  );
});
