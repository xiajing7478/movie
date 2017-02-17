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
                    $('#language').val('英国');
                    $('#year').val(data.year);
                    $('#flash').val();
                    $('#poster').val(data.images.large);
                    $('#price').val(40);
                    $('#doctor').val(data.directors[0].name);
                    $('#summary').val(data.summary);
                },
                error: function (data) {
                    console.log(JSON.stringify(data));
                }
            })
        }
    });


    /**
     * 分页
     */

    var str='',
        nums = $('#totalCounts').val(),
        page=$("#page").val(),
        hide_categoryId = $('#hide_categoryId').val();

    for(var i=1; i<= nums; i++){
        if(page == i){
            str += '<li class="active"><a href="/list?page='+i+'&categoryId='+hide_categoryId+'">'+i+'</a></li>';
        }else{
            str += '<li><a href="/list?page='+i+'&categoryId='+hide_categoryId+'">'+i+'</a></li>';
        }
    }
    $('#pageList').append(str);

    //$('#pageTool').Paging({pagesize:10,count:parseInt($('#totalCounts').val()),callback:function(page,size,count){
    //    $.ajax({
    //        url:'/list?page='+page,
    //        type:'get',
    //        dataType:'json',
    //        success: function (data) {
    //            console.log(JSON.stringify(data));
    //        },
    //        error: function (data) {
    //            console.log(JSON.stringify(data));
    //        }
    //    })
    //    //console.log(arguments)
    //    //alert('当前第 ' +page +'页,每页 '+size+'条,总页数：'+count+'页')
    //}});


    /**
     * export
     */
    $('#btn_export').on("click", function () {
        window.location.href = '/list/exportExcel';
    });


    /**
     * 分类搜索
     */

    if(categoryId != ""){
        $("#categorySort option").each(function (index,value) {
            if($(this).val() == hide_categoryId){
                $(this).attr("selected",true);
                return;
            }
        })
    };
    $('#categorySort').change(function () {
        var url =  "/list?categoryId="+$(this).val();
        window.location = url;
    })


})
