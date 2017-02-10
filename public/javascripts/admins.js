/**
 * Created by Administrator on 2017/2/9.
 */

$(function () {
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
    }
})
