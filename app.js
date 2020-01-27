var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var campgrounds = [
    {
        name: 'Helvetinjarvi',
        image:
            'https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80'
    },
    {
        name: 'Kasivarsi',
        image:
            'https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=959&q=80'
    },
    {
        name: 'Luontopolku',
        image:
            'https://images.unsplash.com/photo-1534950947221-dcaca2836ce8?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
    }
];

// REST routes
app.get('/', function(req, res) {
    res.render('landing');
});

app.get('/campgrounds', function(req, res) {
    res.render('campgrounds', { campgrounds: campgrounds });
});

app.post('/campgrounds', function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get('/campgrounds/new', function(req, res) {
    res.render('new');
});

// Start server
app.listen(process.env.PORT || 3000, process.env.IP, function() {
    console.log('The YelpCamp Server Has Started');
});