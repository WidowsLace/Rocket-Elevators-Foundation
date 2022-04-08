$("#buildings").hide();
$("#columns").hide();
$("#elevators").hide();
$("#batteries").hide();
$(function() {
   
//get building via customer
   if ($("select#customer").val() == "") {
    $("select#building option").remove();
    var row = "<option value=\"" + "" + "\">" + "Building" + "</option>";
    $(row).appendTo("select#building");
   }
   $("select#customer").change(function() {
    var id_value_string = $(this).val();
    if (id_value_string == "") {
     $("select#building option").remove();
     var row = "<option value=\"" + "" + "\">" + "Building" + "</option>";
     $(row).appendTo("select#building");
    } else {
     // Send the request and update course dropdown
     $.ajax({
      dataType: "json",
      cache: false,
      url: '/get_buildings_by_customer/' + id_value_string,
      timeout: 5000,
      error: function(XMLHttpRequest, errorTextStatus, error) {
       alert("Failed to submit : " + errorTextStatus + " ;" + error);
      },
      success: function(data) {
       // Clear all options from course select
       $("select#building option").remove();
       //put in a empty default line
       var row = "<option value=\"" + "" + "\">" + "Building" + "</option>";
       $(row).appendTo("select#building");
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
   if ($("select#building").val() == "") {
      $("select#battery option").remove();
      var row = "<option value=\"" + "" + "\">" + "Battery" + "</option>";
      $(row).appendTo("select#battery");
     }
     $("select#building").change(function() {
      var id_value_string = $(this).val();
      if (id_value_string == "") {
       $("select#battery option").remove();
       var row = "<option value=\"" + "" + "\">" + "Battery" + "</option>";
       $(row).appendTo("select#battery");
      } else {
       // Send the request and update course dropdown
       $.ajax({
        dataType: "json",
        cache: false,
        url: '/get_batteries_by_building/' + id_value_string,
        timeout: 5000,
        error: function(XMLHttpRequest, errorTextStatus, error) {
         alert("Failed to submit : " + errorTextStatus + " ;" + error);
        },
        success: function(data) {
         // Clear all options from course select
         $("select#battery option").remove();
         //put in a empty default line
         var row = "<option value=\"" + "" + "\">" + "Battery" + "</option>";
         $(row).appendTo("select#battery");
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
   if ($("select#battery").val() == "") {
      $("select#column option").remove();
      var row = "<option value=\"" + "" + "\">" + "Column" + "</option>";
      $(row).appendTo("select#column");
     }
     $("select#battery").change(function() {
      var id_value_string = $(this).val();
      if (id_value_string == "") {
       $("select#column option").remove();
       var row = "<option value=\"" + "" + "\">" + "Column" + "</option>";
       $(row).appendTo("select#column");
      } else {
       // Send the request and update course dropdown
       $.ajax({
        dataType: "json",
        cache: false,
        url: '/get_columns_by_battery/' + id_value_string,
        timeout: 5000,
        error: function(XMLHttpRequest, errorTextStatus, error) {
         alert("Failed to submit : " + errorTextStatus + " ;" + error);
        },
        success: function(data) {
         // Clear all options from course select
         $("select#column option").remove();
         //put in a empty default line
         var row = "<option value=\"" + "" + "\">" + "Column" + "</option>";
         $(row).appendTo("select#column");
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
     if ($("select#column").val() == "") {
      $("select#elevator option").remove();
      var row = "<option value=\"" + "" + "\">" + "Elevator" + "</option>";
      $(row).appendTo("select#elevator");
     }
     $("select#column").change(function() {
      var id_value_string = $(this).val();
      if (id_value_string == "") {
       $("select#elevator option").remove();
       var row = "<option value=\"" + "" + "\">" + "Elevator" + "</option>";
       $(row).appendTo("select#elevator");
      } else {
       // Send the request and update course dropdown
       $.ajax({
        dataType: "json",
        cache: false,
        url: '/get_elevators_by_column/' + id_value_string,
        timeout: 5000,
        error: function(XMLHttpRequest, errorTextStatus, error) {
         alert("Failed to submit : " + errorTextStatus + " ;" + error);
        },
        success: function(data) {
         // Clear all options from course select
         $("select#elevator option").remove();
         //put in a empty default line
         var row = "<option value=\"" + "" + "\">" + "Elevator" + "</option>";
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