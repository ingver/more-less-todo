exports.renderSafe = function(res, path, data) {
    res.render(path, data, function(err, html) {
        if (err) return console.error(err);
        res.end(html);
    });
};
