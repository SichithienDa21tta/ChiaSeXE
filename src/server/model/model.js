//./server/model/model.js
const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    noi_xuat_phat : {
        type : String,
        required: true
    },
    ngay_xuat_phat : {
        type: String,
        required: true,
    },
    gio_xuat_phat : {
        type : String,
        required: true
    },
    noi_den : {
        type : String,
        required: true
    },
    ngay_den : {
        type : String,
        required: true
    },
    gio_den : {
        type : String,
        required: true
    },
    tong_so_cho : {
        type : Number,
        required: true
    },
    so_cho_trong: {
        type : Number,
        required: true
    },
    sdt_lien_he : {
        type : Number,
        required: true
    },

})

const CreateTrip = mongoose.model('createTrip', schema);

module.exports = CreateTrip;