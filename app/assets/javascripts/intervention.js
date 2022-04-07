$(document).ready(function () {
   $('.buildings-field').hide();
   $('.batteries-field').hide();
   $('.columns-field').hide();
   $('.elevators-field').hide();

   $(".customer-select").change(function () {
       $('.batteries-field').hide();
       $('.columns-field').hide();
       $('.elevators-field').hide();


       if ($(".customer-select").val() === "") {
           
           $("select.buildings-select option").remove();
           var row = "<option value=\"" + "" + "\">" + "Select" + "</option>";
           $(row).appendTo("select.buildings-select");
       } else {

           $('.buildings-field').show();
           var customer_id = $(this).val();
           $.ajax({
               dataType: "json",
               cache: false,
               url: '/get_buildings_by_customer/' + customer_id,
               timeout: 5000,
               error: function (XMLHttpRequest, errorTextStatus, error) {
                   alert("Failed to submit : " + errorTextStatus + " ;" + error);
               },
               success: function (data) {

                   // Clear all options from course select
                   $("select.buildings-select option").remove();
                   //put in a empty default line
                   var row = "<option value=\"" + "" + "\">" + "Select Building" + "</option>";
                   $(row).appendTo("select.buildings-select");
                   // Fill course select
                   $.each(data, function (i, j) {

                       row = "<option value=\"" + j.id + "\">" + j.admin_name + "</option>";
                       $(row).appendTo("select.buildings-select");
                   })
               }
           });
       }
   })


   $(".buildings-select").change(function () {
       $('.columns-field').hide();
       $('.elevators-field').hide();
       if ($(".buildings-select").val() === "") {
           $('.batteries-field').hide();
           $("select.batteries-select option").remove();
           var row = "<option value=\"" + "" + "\">" + "Select" + "</option>";
           $(row).appendTo("select.batteries-select");
       } else {

           $('.batteries-field').show();
           var building_id = $(this).val();

           $.ajax({
               dataType: "json",
               cache: false,
               url: '/get_batteries_by_building/' + building_id,
               timeout: 5000,
               error: function (XMLHttpRequest, errorTextStatus, error) {
                   alert("Failed to submit : " + errorTextStatus + " ;" + error);
               },
               success: function (data) {

                   // Clear all options from course select
                   $("select.batteries-select option").remove();
                   //put in a empty default line
                   var row = "<option value=\"" + "" + "\">" + "None" + "</option>";
                   $(row).appendTo("select.batteries-select");
                   // Fill course select
                   $.each(data, function (i, j) {

                       row = "<option value=\"" + j.id + "\">" + j.id + " - " + j.status + "</option>";
                       $(row).appendTo("select.batteries-select");
                   })
               }
           });
       }
   })


   $(".batteries-select").change(function () {
       $('.columns-field').hide();
       $('.elevators-field').hide();

       if ($(".batteries-select").val() === "") {
           $('.columns-field').hide();
           $("select.columns-select option").remove();
           var row = "<option value=\"" + "" + "\">" + "Select" + "</option>";
           $(row).appendTo("select.columns-select");
       } else {

           $('.columns-field').show();
           var battery_id = $(this).val();

           $.ajax({
               dataType: "json",
               cache: false,
               url: '/get_columns_by_battery/' + battery_id,
               timeout: 5000,
               error: function (XMLHttpRequest, errorTextStatus, error) {
                   alert("Failed to submit : " + errorTextStatus + " ;" + error);
               },
               success: function (data) {

                   // Clear all options from course select
                   $("select.columns-select option").remove();
                   //put in a empty default line
                   var row = "<option value=\"" + "" + "\">" + "None" + "</option>";
                   $(row).appendTo("select.columns-select");
                   // Fill course select
                   $.each(data, function (i, j) {

                       row = "<option value=\"" + j.id + "\">" + j.id + " - " + j.status + "</option>";
                       $(row).appendTo("select.columns-select");
                   })
               }
           });
       }
   })

   $(".columns-select").change(function () {

       if ($(".columns-select").val() === "") {
          
           $('.elevators-field').hide();
           $("select.elevators-select option").remove();
           var row = "<option value=\"" + "" + "\">" + "Select" + "</option>";
           $(row).appendTo("select.elevators-select");
       } else {
           
           $('.elevators-field').show();
           var column_id = $(this).val();

           $.ajax({
               dataType: "json",
               cache: false,
               url: '/get_elevators_by_column/' + column_id,
               timeout: 5000,
               error: function (XMLHttpRequest, errorTextStatus, error) {
                   alert("Failed to submit : " + errorTextStatus + " ;" + error);
               },
               success: function (data) {

                   // Clear all options from course select
                   $("select.elevators-select option").remove();
                   //put in a empty default line
                   var row = "<option value=\"" + "" + "\">" + "None" + "</option>";
                   $(row).appendTo("select.elevators-select");
                   // Fill course select
                   $.each(data, function (i, j) {

                       row = "<option value=\"" + j.id + "\">" + j.id + " - " + j.status + "</option>";
                       $(row).appendTo("select.elevators-select");
                   })
               }
           });
       }
   })


});
