exports.renderSafe = (res, path, data) => {
    res.render(path, data, function(err, html) {
        if (err) return console.error(err);
        res.end(html);
    });
};

exports.logReq = msg => (req, res, next) => {
    console.log(msg);
    console.log('req.session', req.session);
    console.log('req.user', req.user);
    next();
};
