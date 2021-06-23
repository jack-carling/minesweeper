module.exports = (app) => {
  const Highscore = require('./models');
  app.post('/api/highscore', async (req, res) => {
    const query = req.query.t;
    let response = { success: true };

    const token = process.env.TOKEN;

    if (token === query) {
      const date = Date.now();
      const data = { date, ...req.body };
      const db = new Highscore(data);
      try {
        await db.save();
      } catch (error) {
        console.log(error);
      }
    } else {
      response = {
        success: false,
        message: 'Error: Invalid token',
      };
    }
    res.json(response);
  });
  app.get('/api/highscore/:difficulty', async (req, res) => {
    const param = req.params.difficulty;
    const query = req.query.t;
    let response = { success: true };
    let data;

    const token = process.env.TOKEN;

    if (token === query) {
      if (param === 'beginner') {
        data = await Highscore.find({ difficulty: 'Beginner' }).sort({ time: 1 }).limit(25);
      } else if (param === 'intermediate') {
        data = await Highscore.find({ difficulty: 'Intermediate' }).sort({ time: 1 }).limit(25);
      } else if (param === 'expert') {
        data = await Highscore.find({ difficulty: 'Expert' }).sort({ time: 1 }).limit(25);
      } else if (param === 'custom') {
        data = await Highscore.find({ difficulty: 'Custom' }).sort({ percent: -1, time: 1 }).limit(25);
      } else {
        response = {
          success: false,
          message: 'Error: Invalid param - beginner / intermediate / expert / custom',
        };
      }
    } else {
      response = {
        success: false,
        message: 'Error: Invalid token',
      };
    }
    response.data = data;
    res.json(response);
  });
};
