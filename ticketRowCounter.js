// ==UserScript==
// @name         Counting rows in ticket container
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
    var numOfRows = $('.spec-ticket-item.ticket-item.ember-view:not(.loading)').length; //Counts how many tickets
    var currentScrollPosition, timer = 1500, complicated = true;

    $("#numberVal").text( ' (' + numOfRows + ')' ); //Displays number of tickets

    //Adding refresh button here for convenience
    $('#status_dropdown').append(
        $(document.createElement('button')).prop({
            type: 'button',
            innerHTML: 'Refresh',
            class: 'btn btn-default refreshButton',
        })
    );

    //Function to calculate the number of tickets in the ticket container
    $.fn.TicketCount = function()
    {
        setTimeout(
            function()
            {
                var ticketCounter = $('.spec-ticket-item.ticket-item.ember-view:not(.loading)').length;
                var subtractHidden = $('.spec-ticket-item.ticket-item.ember-view:not(.loading) > :hidden').length;
                var updateNumOfRows = ticketCounter - subtractHidden;
                $("#numberVal").text( ' (' + updateNumOfRows + ')' );
            }, timer);
    }

    //Function to calculate the number of tickets in the ticket container if a scrollable container exist
    $.fn.TicketCountScrolling = function()
    {
        setTimeout(
            function()
            {
                $('.ember-view').scroll(function(){ currentScrollPosition = $(this).scrollTop(); });
                var ticketCounter = $('.spec-ticket-item.ticket-item.ember-view:not(.loading)').length;
                var subtractHidden = $('.spec-ticket-item.ticket-item.ember-view:not(.loading) > :hidden').length;
                var updateNumOfRows = ticketCounter - subtractHidden - 5 + currentScrollPosition/29;
                $("#numberVal").text( ' (' + Math.floor(updateNumOfRows) + ')' );
            }, timer);
    }

    //Depending on the selected dropdown options, one of these two functions will run
    $.fn.CallTicketCount = function()
    {
        timer = 1500;
        complicated = false;
        $.fn.TicketCount();
    }

    $.fn.CallTicketCountScrolling = function()
    {
        timer = 1500;
        complicated = true;
        $.fn.TicketCountScrolling();
    }

    //Function to recount the tickets when user scrolls or if ticket counter is off
    $.fn.Recount = function()
    {
        timer = 100;
        if (complicated == true) { $.fn.TicketCountScrolling(); }
        else { $.fn.TicketCount(); }
    }

    //Dropdown menu calling the functions
    $('#unassigned_tickets').click(function() { $.fn.CallTicketCount(); });
    $('#waiting_tickets').click(function() { $.fn.CallTicketCount(); });
    $('#alerted_tickets').click(function() { $.fn.CallTicketCount(); });
    $('#past_due_tickets').click(function() { $.fn.CallTicketCount(); })

    $('#open_tickets').click(function() { $.fn.CallTicketCountScrolling(); });
    $('#closed_tickets').click(function() { $.fn.CallTicketCountScrolling(); });
    $('#all_tickets').click(function() { $.fn.CallTicketCountScrolling(); });

    //User may have to call either the "CallTicketCount" or the "CallTicketCountScrolling" function depending on the number of tickets in their container
    $('#my_tickets').click(function() { $.fn.CallTicketCount(); });

    //Refresh button to recount or update count when scrolled
    $('.btn.btn-default.refreshButton').click(function() { $.fn.Recount(); });
    $('.refresh-btn.btn.btn-default.js-refresh-btn').click(function() { $.fn.Recount(); });
});
