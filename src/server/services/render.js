//./server/services/render.js
const axios = require('axios');

exports.homeRoutes = (req, res) => {
    // Tạo resquest tới /api/trips
    axios.get('http://localhost:3001/api/trips')
        .then(function(response){
            res.render('index', { trips : response.data });
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.add_trip = (req, res) =>{
    res.render('add_trip');
}

exports.update_trip = (req, res) =>{
    axios.get('http://localhost:3001/api/trips', { params : { id : req.query.id }})
        .then(function(tripsdata){
            res.render("update_trip", { trips : tripsdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}