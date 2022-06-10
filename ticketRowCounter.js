// ==UserScript==
// @name         Counting rows in ticket container
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Counting the rows in each ticket container
// @author       Shawn Ijaz
// @match        https://on.spiceworks.com/tickets/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// ==/UserScript==
/* globals jQuery, $, waitForKeyElements */



$( document ).ready(function() {

    var createSpan = $(".dropdown-label.spec-dropdown-label").append( "<span id='numberVal'>  </span>" );
    var numOfRows = $('.spec-ticket-item.ticket-item.ember-view:not(.loading)').length;
    var updateNumOfRows;
    $("#numberVal").text( ' (' + numOfRows + ')' );

    $('.ticket-view-link.ember-view.sui-dropdown_entry').click(function() {

        // $('.print-hide.ember-view.sw-loading-spinner.loading-spinner:not(.loading)')
        // $('.print-hide.ember-view.sw-loading-spinner.loading-spinner.loading')

        setTimeout(
            function()
            {
                var updateNumOfRows = $('.spec-ticket-item.ticket-item.ember-view:not(.loading)').length;
                $("#numberVal").text( ' (' + updateNumOfRows + ')' );
            }, 1000);

/*         $('#ember1824').scroll(function() {
            if ($('.ticket-grid-container').is(':visible')) {
                console.log("Scroll");
            }*/
        });
    });





    // This class name is for the refresh button
    /*     $('.refresh-btn.btn.btn-default.js-refresh-btn').click(function() {

        setTimeout(
            function()
            {
                var updateNumOfRows = $('.spec-ticket-item.ticket-item.ember-view:not(.loading)').length;
                console.log(updateNumOfRows);
                $("#numberVal").text( ' (' + updateNumOfRows + ')' );
            }, 1000);

        console.log("Button Clicked");
    }); */


    //This class is for the inner class refresh buttion.
    /*     $('.glyphicon.glyphicon-refresh.spec-refresh-btn').click(function() {

        setTimeout(
            function()
            {
                var updateNumOfRows = $('.spec-ticket-item.ticket-item.ember-view:not(.loading)').length;
                console.log(updateNumOfRows);
                $("#numberVal").text( ' (' + updateNumOfRows + ')' );
            }, 1000);

        console.log("Button Clicked");
    }); */



    //Find where container is scrolling.
    /*     $('#ember1824').scroll(function() {
        if ($('.ticket-grid-container').is(':visible')) {
            console.log("Scroll");
        }
    }); */



    /*
NOTES:

The class name "spec-ticket-item ticket-item  ember-view loading" happens after all the rows have been displayed.

When we run the class name "spec-ticket-item ticket-item  ember-view.length",
it also counts the class name that says "spec-ticket-item ticket-item  ember-view.length".
That's the reason why we are subtracting rowCount and uncountLoading.

Rightclick Inspect to see details

*/
