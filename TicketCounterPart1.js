// ==UserScript==
// @name         Ticket Counter Part 1
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
    var complicated = true, timer, currentScrollPosition;

    $("#numberVal").text( ' (' + numOfRows + ')' ); //Displays number of tickets

    //Add refresh button
    $('#status_dropdown').append(
        $(document.createElement('button')).prop({
            type: 'button',
            innerHTML: 'Refresh',
            class: 'btn btn-default refreshButton',
        })
    );

    //Dropdown menu calling the functions
    //If one of these dropdown menus have multiple tickets in which the user has to scroll to get all tickets, the complicated will need to be equal to true
    //Additionally, if you added a ticket filter, you'll need to add that also. EX:
    //$('#example_tickets').click(function() { timer = 100; complicated = true/false; $.fn.PageLoad(); });
    $('#unassigned_tickets').click(function() { timer = 100; complicated = false; $.fn.PageLoad(); });
    $('#waiting_tickets').click(function() { timer = 100; complicated = false; $.fn.PageLoad(); });
    $('#alerted_tickets').click(function() { timer = 100; complicated = false; $.fn.PageLoad(); });
    $('#past_due_tickets').click(function() { timer = 100; complicated = false; $.fn.PageLoad(); })
    $('#my_tickets').click(function() { timer = 100; complicated = false; $.fn.PageLoad(); });

    $('#open_tickets').click(function() { timer = 100; complicated = true; $.fn.PageLoad(); });
    $('#closed_tickets').click(function() { timer = 100; complicated = true; $.fn.PageLoad(); });
    $('#all_tickets').click(function() { timer = 100; complicated = true; $.fn.PageLoad(); });

    //This function detects when the page is loaded
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

                else
                {
                    if(complicated == true) { $.fn.TicketCountScrolling(); }
                    else { $.fn.TicketCount(); }
                }
            }, timer);
    }

    //Function to calute the number of tickets in the ticket container without a scrollable container
    $.fn.TicketCount = function()
    {
        setTimeout(
            function()
            {
                var ticketCounter = $('.spec-ticket-item.ticket-item.ember-view:not(.loading)').length;
                var subtractHidden = $('.spec-ticket-item.ticket-item.ember-view:not(.loading) > :hidden').length;
                var updateNumOfRows = ticketCounter - subtractHidden;
                $.fn.CheckCount(updateNumOfRows);
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
                $.fn.CheckCount(updateNumOfRows);
            }, timer);
    }

    //This function recalculate the ticket counter if original number is off
    $.fn.CheckCount = function(updateNumOfRows)
    {
        var noTickets = $('.no-tickets.spec-inbox-zero.print-hide').is(':visible');

        if(noTickets == false && updateNumOfRows <= 0)
        {
            setTimeout(
                function()
                {
                    if(complicated == true) { $.fn.TicketCountScrolling(); }
                    else { $.fn.TicketCount(); }
                }, timer);
        }

        else { $("#numberVal").text( ' (' + Math.floor(updateNumOfRows) + ')' ); }
    }

    //This button recalculates the number of tickets when scrolled
    $('.btn.btn-default.refreshButton').click(function() {
        timer = 0;
        $.fn.PageLoad();
    });

    $('.refresh-btn.btn.btn-default.js-refresh-btn').click(function() {
        timer = 100;
        $.fn.PageLoad();
    });
});
