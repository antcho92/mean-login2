var express = require('express');
    path = require('path');
    bp = require('body-parser'),
    port = process.env.PORT || 8080,
    app = express();

app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(bp.json());

require('./server/config/mongoose.js')

var routes_setter = require('./server/config/routes.js');
routes_setter(app);

app.listen(8080, function() {
  console.log("listening on port 8080");
});
