//./server/contronller/contronller.js
var CreateTrip = require('../model/model');

// tạo và lưu chuyến đi
exports.create = (req,res)=>{
    
    if(!req.body){
        res.status(400).send({ message : "Nội dung không được rỗng!"});
        return;
    }

    // new trips
    const trips = new CreateTrip({
        noi_xuat_phat : req.body.noi_xuat_phat,
        ngay_xuat_phat : req.body. ngay_xuat_phat,
        gio_xuat_phat: req.body.gio_xuat_phat,
        noi_den : req.body.noi_den,
        ngay_den : req.body.ngay_den,
        gio_den: req.body.gio_den,
        tong_so_cho: req.body.tong_so_cho,
        so_cho_trong: req.body.so_cho_trong,
        sdt_lien_he: req.body.sdt_lien_he,
    })

    // Lưu chuyến đi vào database
    trips
        .save(trips)
        .then(data => {
            res.redirect('/add-trip');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Đã xảy ra lỗi trong khi tạo thao tác tạo"
            });
        });

}


exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        CreateTrip.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Không tìm thấy chuyến xe có id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Lỗi truy xuất chuyến đi với id " + id})
            })

    }else{
        CreateTrip.find()
            .then(trips => {
                res.send(trips)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Đã xảy ra lỗi khi truy xuất thông tin chuyến đi" })
            })
    }

    
}

// Cập nhật chuyến xe bằng id 
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Dữ liệu cập nhật không được rỗng"})
    }

    const id = req.params.id;
    CreateTrip.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Không thể cập nhật chuyến xe với ${id}. Có thể không tìm thấy chuyến đi!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Lỗi Thông Tin Chuyến Xe!"})
        })
}

// Xóa chuyến xe với id request
exports.delete = (req, res)=>{
    const id = req.params.id;

    CreateTrip.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Không thể xóa chuyến xe với ${id}. Có thể không tìm thấy chuyến đi!`})
            }else{
                res.send({
                    message : "Đã xóa chuyến xe thành công!!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Không thể xóa chuyến xe có id=" + id
            });
        });
}