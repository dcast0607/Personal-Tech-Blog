const router = require('express').Router();

const apiRoutes = require('./api');
const displayRoutes = require('./displayRoutes');
const pageRoutes = require('./pages/pageRoutes');

router.use('/', displayRoutes);
router.use('/api', apiRoutes);
router.use('/pageRoutes', pageRoutes);

module.exports = router;