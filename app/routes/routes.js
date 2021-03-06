'use strict';

var path = process.cwd();

var requestTime = function (req, res, next) {
	process.env.TZ = 'USA/New York';
	req.requestTime = new Date();
	next();
};

function requestedOn(req, res, next) {
	
	var log = 'Requested at ' + req.requestTime;
	
	console.log(log);
	return next();
}

module.exports = function(app, cleaner) {
    
    app.use(requestTime);
    
    app.get('/', requestedOn, function(req, res) {
        res.render('index.ejs');   
    });
    
    app.post('/', requestedOn, cleaner.clean, function(req, res){
         res.send(req.response);
    });
    
    app.get('/*', requestedOn, function(req, res){
        res.render('404.ejs'); 
    });
    
    app.post('/*', requestedOn, function(req, res){
        res.render('404.ejs');
    });
};