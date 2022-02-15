var express = require('express');

module.exports = function(app) {

    var router = express.Router();

    router.use('/admin', require('./routes/admin.routes'));
    router.use('/authors', require('./routes/author.routes'));
    router.use('/books', require('./routes/book.routes'));
    router.use('/genres', require('./routes/genre.routes'));
    router.use('/publishers', require('./routes/publisher.routes'));
    router.use('/news', require('./routes/sitenew.routes'));
    router.use('/users', require('./routes/user.routes'));
    router.use('/trailers', require('./routes/trailer.routes'));
    router.use('/reviews', require('./routes/reviews.routes'));
    router.use('/files', require('./routes/file.routes'));
    router.use('/bookfiles', require('./routes/bookfile.routes'));
    router.use('/metrics', require('./routes/metrics.routes'));
    router.use('/favourites', require('./routes/favourites.routes'));

    app.use('/api', router);

};
