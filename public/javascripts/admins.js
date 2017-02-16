/**
 * Created by Administrator on 2017/2/9.
 */

$(function () {
    /**
     * delete
     */
    $('.delete').on("click", function () {
        var $this =  $(this).parent().parent();
        var _id =  $(this).attr("data-id");
        deleteById(_id,$this);
    });
    
    function deleteById(id,obj){
        $.ajax({
            type:'POST',
            url:'/list/delete',
            dataType:'json',
            data:{id:id},
            success: function (data) {
                if(data.result)
                    obj.remove();
            },
            error: function (data) {
                console.log("error "+ data);
            }
        })
    };


    /**
     * find
     */
    var categoryId = $('#category_id').val();
    if(categoryId != ""){
        $("#categoryId option").each(function (index,value) {
            if($(this).val() == categoryId){
                $(this).attr("selected",true);
                return;
            }
        })
    };


    /**
     * add
     */
    $("#douban").on('blur', function () {
        var db_id = $(this).val();//豆瓣的id
        if(db_id){
            $.ajax({
                url:'https://api.douban.com/v2/movie/subject/'+db_id,
                cache:true,
                type:'get',
                dataType:'jsonp',
                crossDomain:true,
                jsonp:'callback',
                success: function (data) {
                    $('#title').val(data.title);
                    $('#country').val(data.countries[0]);
                    $('#language').val();
                    $('#year').val(data.year);
                    $('#flash').val();
                    $('#poster').val(data.images.large);
                    $('#price').val();
                    $('#doctor').val(data.directors[0].name);
                    $('#summary').val(data.summary);
                }
            })
        }
    })
})
