//./assets/js/index.js



$("#add_trip").submit(function(event){
    alert("Đã thêm chuyến xe thành công!");
})

$("#update_trip").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {} 

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })


    var request = {
        "url" : `http://localhost:3001/api/trips/${data.id}`,
        "method" : "PUT",
        "data" : data,
        headers: {
            'token': sessionStorage.getItem('accessToken'),
          }
    }

    $.ajax(request).done(function(response){
        alert("Cập Nhật Chuyến Xe Thành Công!");
    })

})

if(window.location.pathname == "/home"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3001/api/trips/${id}`,
            "method" : "DELETE",
            headers: {
                'token': sessionStorage.getItem('accessToken'),
              },
        }

        if(confirm("Bạn Chắc Chắn Muốn Xóa Chuyến Xe Này?")){
            $.ajax(request).done(function(response){
                alert("Xóa Chuyến Xe Thành Công!");
                location.reload();
            })
        }

    })
}



  $(document).ready(function () {
    $('#login').submit(function (e) {
      e.preventDefault(); // Ngăn chặn hành động mặc định của form

      $.ajax({
        url: '/api/login',
        method: 'POST',
        data: $(this).serialize(),
        success: function (response) {
          alert('Đăng nhập thành công!');    // Thông báo thành công

       
          window.location.href = '/home'; // Chuyển hướng đến trang home
   
        },
        error: function (err) {
          console.error('Đăng nhập thất bại:', err);
        },
      });
    });
  });
