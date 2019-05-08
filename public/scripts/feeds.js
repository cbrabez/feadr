function addFeed(feedurl, feedtitle){
   // var new_task = task;
   // var projectId = projectId;
   // console.log(projectId)
   $.ajax({
      method: "POST",
      url: "/feeds",
      data: {feedUrl: feedurl, feedTitle: feedtitle},
      success: function(result) {
        location.reload(true);
      }
   });
}
    