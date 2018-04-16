$(document).ready(function() {
  $.ajax({
    type: 'GET',
    url: '/vr/getVrInfo',
    success: function(res) {
      var json = JSON.parse(res);
      console.log(json);
      $("#test").html(json.vrid);
    }
  });
});