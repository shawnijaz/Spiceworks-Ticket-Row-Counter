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

    var scroll = false
    var clickCheck = false;
    var createSpan = $(".dropdown-label.spec-dropdown-label").append( "<span id='numberVal'>  </span>" ); //adds span tag next to the dropdown label to display number of tickets
    var numOfRows = $('.spec-ticket-item.ticket-item.ember-view:not(.loading)').length; //Counts how many tickets
    $("#numberVal").text( ' (' + numOfRows + ')' ); //Displays number of tickets

    //Adding refresh button here for convenience
    $('#status_dropdown').append(
        $(document.createElement('button')).prop({
            type: 'button',
            innerHTML: 'Refresh',
            class: 'btn btn-default refreshButton',
        })
    );

    //Function to count the tickets after dropdown is selected
    //There is a slight delay when the dropdown button is clicked. Because of this, a timer function had to be use so that we can display results once page is loaded
    $.fn.TicketCounter = function()
    {
        setTimeout(
            function()
            {
                var updateNumOfRows = $('.spec-ticket-item.ticket-item.ember-view:not(.loading)').length;
                $("#numberVal").text( ' (' + updateNumOfRows + ')' );
            }, 1500);
    }

    //Once user scrolls to a certain point in the container, the count for some reason messes up. This functions fixes the issue.
    $.fn.TicketCounterSubtractFive = function()
    {
        setTimeout(
            function()
            {
                var recountedNumOfRows = $('.spec-ticket-item.ticket-item.ember-view:not(.loading)').length - 5;
                $("#numberVal").text( ' (' + recountedNumOfRows + ')' );
            }, 1500);
    }

    //This function if to fix the counter mistake once the user scrolls to a certain point
    $('.ember-view').scroll(function(){
        var currentScrollPosition = $(this).scrollTop();
        if(currentScrollPosition >= 1590)
        {
            scroll = true;
            $('#unassigned_tickets').click(function() { clickCheck = true; $.fn.TicketCounterSubtractFive(); });
            $('#my_tickets').click(function() { clickCheck = true; $.fn.TicketCounterSubtractFive(); });
            $('#waiting_tickets').click(function() { clickCheck = true; $.fn.TicketCounterSubtractFive(); });
            $('.refresh-btn.btn.btn-default.js-refresh-btn').click(function() { if(clickCheck == true) { $.fn.TicketCounterSubtractFive(); } });
            $('.btn.btn-default.refreshButton').click(function() { if(clickCheck == true) { $.fn.TicketCounterSubtractFive(); } });
        }
    });

    //When dropdown is clicked, if true, display the number. Otherwise don't display anything.
    $('#unassigned_tickets').click(function() { clickCheck = true; $.fn.TicketCounter(); });
    $('#my_tickets').click(function() { clickCheck = true; $.fn.TicketCounter(); });
    $('#waiting_tickets').click(function() { clickCheck = true; $.fn.TicketCounter(); });
    $('#open_tickets').click(function() { clickCheck = false; });
    $('#closed_tickets').click(function() { clickCheck = false; });
    $('#all_tickets').click(function() { clickCheck = false; });
    $('#alerted_tickets').click(function() { clickCheck = false; });
    $('#past_due_tickets').click(function() { clickCheck = false; });
    $('.ticket-view-link.ember-view.sui-dropdown_entry').click(function() { $("#numberVal").text( ' ' ); });

    // These two class name is for the refresh button to recount tickets when clicked in case previous function didn't load correctly or when new ticket is added
    $('.refresh-btn.btn.btn-default.js-refresh-btn').click(function() { if(clickCheck == true) { $.fn.TicketCounter(); } });
    $('.btn.btn-default.refreshButton').click(function() { if(clickCheck == true) { $.fn.TicketCounter(); } });
});
