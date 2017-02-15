/**
 * Created by Administrator on 2017/2/15.
 */
$(function () {
    $("img").on("click", function () {
        $('input').attr({
            type:'hidden',
            value:'kitty'
        }).appendTo('#comment_form')
    })
})