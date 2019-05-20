$('#feedList a .entryLink').on('click', function (e) {
    e.preventDefault()
    let url = $(this).parent("a").attr("href");
    //window.location = url;
    window.open(url);
})

function feedRefresh(feedId, feedUrl){
$.ajax({
    method: "POST",
    url: "" + feedId + "/?_method=PUT",
    data: {feedId: feedId, feedUrl: feedUrl},
    success: function(result) {
            console.log( "Load was performed." );
            window.location.reload(true); 
         }
    });
}