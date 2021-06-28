module.exports = (app) => {
  const Highscore = require('./models');
  app.post('/api/highscore', async (req, res) => {
    let response = { success: true };
    let message = '';

    const date = Date.now();
    const data = { date, ...req.body };
    const db = new Highscore(data);

    if (!data?.name) {
      message = 'Error: No name provided';
      handleError(res, message);
      return;
    }

    if (data.name.length < 2 || data.name.length > 20) {
      message = 'Error: Invalid name length';
      handleError(res, message);
      return;
    }

    if (!data?.difficulty) {
      message = 'Error: Missing difficulty';
      handleError(res, message);
      return;
    }

    switch (data.difficulty) {
      case 'Beginner':
        break;
      case 'Intermediate':
        break;
      case 'Expert':
        break;
      case 'Custom':
        break;
      default:
        message = 'Error: Invalid difficulty';
        handleError(res, message);
        return;
    }

    if (!data?.width) {
      message = 'Error: Missing width of board';
      handleError(res, message);
      return;
    }

    if (!Number.isInteger(data.width)) {
      message = 'Error: Width is not a number or not an integer';
      handleError(res, message);
      return;
    }

    if (data.width < 5 || data.width > 20) {
      message = 'Error: Width is incorrect';
      handleError(res, message);
      return;
    }

    if (!data?.height) {
      message = 'Error: Missing height of board';
      handleError(res, message);
      return;
    }

    if (!Number.isInteger(data.height)) {
      message = 'Error: Height is not a number or not an integer';
      handleError(res, message);
      return;
    }

    if (data.height < 5 || data.height > 15) {
      message = 'Error: Height is incorrect';
      handleError(res, message);
      return;
    }

    if (!data?.size) {
      message = 'Error: Missing size of board';
      handleError(res, message);
      return;
    }

    if (!Number.isInteger(data.size)) {
      message = 'Error: Size is not a number or not an integer';
      handleError(res, message);
      return;
    }

    if (data.width * data.height !== data.size) {
      message = 'Error: Size does not seem to be correct';
      handleError(res, message);
      return;
    }

    if (!data?.time) {
      message = 'Error: Missing time';
      handleError(res, message);
      return;
    }

    if (!Number.isInteger(data.time)) {
      message = 'Error: Time is not a number or not an integer';
      handleError(res, message);
      return;
    }

    if (data.time < 0) {
      message = 'Error: Time cannot be less than 0';
      handleError(res, message);
      return;
    }

    if (!data?.bombs) {
      message = 'Error: Missing number of mines';
      handleError(res, message);
      return;
    }

    if (!Number.isInteger(data.bombs)) {
      message = 'Error: Number of mines is not a number or not an integer';
      handleError(res, message);
      return;
    }

    if (data.bombs < 1 || data.bombs > 90) {
      message = 'Error: Number of mines is incorrect';
      handleError(res, message);
      return;
    }

    if (!data?.percent) {
      message = 'Error: Missing percent';
      handleError(res, message);
      return;
    }

    if (Number.isNaN(data.percent)) {
      message = 'Error: Percent is not a number';
      handleError(res, message);
      return;
    }

    if (data.percent < 0 || data.percent > 0.33333) {
      message = 'Error: Percent is incorrect';
      handleError(res, message);
      return;
    }

    try {
      await db.save();
    } catch (error) {
      message = error;
      handleError(res, message);
      return;
    }

    res.json(response);
  });

  app.get('/api/highscore/:difficulty', async (req, res) => {
    const param = req.params.difficulty;
    let response = { success: true };
    let data;

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
    response.data = data;
    res.json(response);
  });

  function handleError(res, message) {
    let response = { success: false, message };
    res.json(response);
  }
};
