
router.get('/', function(req, res, next) {
    res.render('index', {page:title, resTable:resTable});
});