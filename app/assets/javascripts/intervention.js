

$(function() {
   $("#buildings").hide();
   $("#columns").hide();
   $("#elevators").hide();
   $("#batteries").hide();
   $("#building-class").hide();
   $("#battery-class").hide();
   $("#column-class").hide();
   $("#elevator-class").hide();
   
//get building via customer
   $("select#customer").change(function(){
    $('select#building option').show();
    $('#building-class').show();
    var customer = $(this).val();
    if (customer == ""){
    } else {
     // Send the request and update course dropdown
     $.ajax({
      cache: false,
      url: '/get_buildings_by_customer/' + customer,
      timeout: 5000,
      error: function(XMLHttpRequest, errorTextStatus, error) {
       alert("Failed to submit : " + errorTextStatus + " ;" + error);
      },
      success: function(data) {
       // Clear all options from course select
       $("select#building option").remove();
       $("select#battery option").remove();
       $("select#column option").remove();
       $("select#elevator option").remove();

       //put in a empty default line
       var row = "<option value=\"" + "" + "\">" + "none" + "</option>";
       $(row).appendTo("select#building");
       $(row).appendTo("select#battery");
       $(row).appendTo("select#column");
       $(row).appendTo("select#elevator");
       // Fill course select
       $.each(data, function(i, j) {
        row = "<option value=\"" + j.id + "\">" + j.id + "</option>";
        $(row).appendTo("select#building");
       });
      }
     });
    }
   });
   //get batteries via building
   $("select#building").change(function(){
      $('select#battery option').show();
      $('#battery-class').show();
      var building = $(this).val();
      if (building == ""){
      } else {
       // Send the request and update course dropdown
       $.ajax({
        cache: false,
        url: '/get_batteries_by_building/' + building,
        timeout: 5000,
        error: function(XMLHttpRequest, errorTextStatus, error) {
         alert("Failed to submit : " + errorTextStatus + " ;" + error);
        },
        success: function(data) {
         // Clear all options from course select
         $("select#battery option").remove();
         $("select#column option").remove();
         $("select#elevator option").remove();
         //put in a empty default line
         var row = "<option value=\"" + "" + "\">" + "none" + "</option>";
         $(row).appendTo("select#battery");
         $(row).appendTo("select#column");
         $(row).appendTo("select#elevator");
         // Fill course select
         $.each(data, function(i, j) {
          row = "<option value=\"" + j.id + "\">" + j.id + "</option>";
          $(row).appendTo("select#battery");
         });
        }
       });
      }
     });
     //get columns via battery
     $("select#battery").change(function(){
      $('select#column option').show();
      $('#column-class').show();
      var battery = $(this).val();
      if (battery == ""){
      } else {
       // Send the request and update course dropdown
       $.ajax({
        cache: false,
        url: '/get_columns_by_battery/' + battery,
        timeout: 5000,
        error: function(XMLHttpRequest, errorTextStatus, error) {
         alert("Failed to submit : " + errorTextStatus + " ;" + error);
        },
        success: function(data) {
         // Clear all options from course select
         $("select#column option").remove();
         $("select#elevator option").remove();
         //put in a empty default line
         var row = "<option value=\"" + "" + "\">" + "none" + "</option>";
         $(row).appendTo("select#column");
         $(row).appendTo("select#elevator");
         // Fill course select
         $.each(data, function(i, j) {
          row = "<option value=\"" + j.id + "\">" + j.id + "</option>";
          $(row).appendTo("select#column");
         });
        }
       });
      }
     });
     //get elevators via column
     $("select#column").change(function(){
      $('select#elevator option').show();
      $('#elevator-class').show();
      var column = $(this).val();
      if (column == ""){
      } else {
       // Send the request and update course dropdown
       $.ajax({
        cache: false,
        url: '/get_elevators_by_column/' + column,
        timeout: 5000,
        error: function(XMLHttpRequest, errorTextStatus, error) {
         alert("Failed to submit : " + errorTextStatus + " ;" + error);
        },
        success: function(data) {
         // Clear all options from course select
         $("select#elevator option").remove();
         //put in a empty default line
         var row = "<option value=\"" + "" + "\">" + "none" + "</option>";
         $(row).appendTo("select#elevator");
         // Fill course select
         $.each(data, function(i, j) {
          row = "<option value=\"" + j.id + "\">" + j.id + "</option>";
          $(row).appendTo("select#elevator");
         });
        }
       });
      }
   });
});