// ==UserScript==
// @name         Official Ticket Count
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Counting the rows in each ticket container
// @author       Shawn Ijaz
// @match        https://on.spiceworks.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// ==/UserScript==
/* globals jQuery, $, waitForKeyElements */

$( document ).ready(function() {

    var createSpan = $(".dropdown-label.spec-dropdown-label").append( "<span id='numberVal'>  </span>" ); //adds span tag next to the dropdown label to display number of tickets
    var numOfRows = $('.spec-ticket-item.ticket-item.ember-view:not(.loading)').length; //Counts how many tickets*/
    var currentScrollPosition, timer = 100;

    $("#numberVal").text( ' (' + numOfRows + ')' ); //Displays number of tickets

    $('.ticket-view-link.ember-view.sui-dropdown_entry').click(function() { $.fn.PageLoad();}); //Dropdown Menu Click Function
    $('.refresh-btn.btn.btn-default.js-refresh-btn').click(function() { $.fn.PageLoad(); }); //Refresh Button Click Function

    $.fn.PageLoad = function()
    {
        var check = true;

        //Function to check if page has loaded
        setTimeout(
            function()
            {
                check = $('.print-hide.ember-view.sw-loading-spinner.loading-spinner.loading').is(':visible');
            }, timer);

        //If page hasn't loaded yet, recall the functon. Else calculate the number of tickets in the container.
        setTimeout(
            function()
            {
                if(check == true) { $.fn.PageLoad(); }
                else { $.fn.CalculateTickets(); }
            }, timer);
    }

    //Function to calculate the number of thickets in the ticket contianer
    $.fn.CalculateTickets = function()
    {
        setTimeout(
            function()
            {
                var ticketCounter = $('.spec-ticket-item.ticket-item.ember-view:not(.loading)').length;
                var subtractHidden = $('.spec-ticket-item.ticket-item.ember-view:not(.loading) > :hidden').length;
                var updateNumOfRows = ticketCounter - subtractHidden;
                $.fn.CheckCount(updateNumOfRows);
            }, timer);

        $('.ember-view').scroll(function(){
            currentScrollPosition = $(this).scrollTop();
            var ticketCounter = $('.spec-ticket-item.ticket-item.ember-view:not(.loading)').length;
            var subtractHidden = $('.spec-ticket-item.ticket-item.ember-view:not(.loading) > :hidden').length;
            var updateNumOfRows = ticketCounter - subtractHidden - 5 + currentScrollPosition/29;
            $("#numberVal").text( ' (' + Math.floor(updateNumOfRows) + ')' );
        });
    }

    //Function to recalculate the number of tickets in case the ticket counter is off
    $.fn.CheckCount = function(updateNumOfRows)
    {
        var noTickets = $('.no-tickets.spec-inbox-zero.print-hide').is(':visible');

        if(noTickets == false && updateNumOfRows <= 0) { $.fn.CalculateTickets(); }
        else { $("#numberVal").text( ' (' + Math.floor(updateNumOfRows) + ')' ); }
    }
});
