// ==UserScript==
// @name         Counting rows in ticket container TEST
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
    var updateNumOfRows, timer = 1500;
    $("#numberVal").text( ' (' + numOfRows + ')' ); //Displays number of tickets

    //Adding refresh button here for convenience
    $('#status_dropdown').append(
        $(document.createElement('button')).prop({
            type: 'button',
            innerHTML: 'Refresh',
            class: 'btn btn-default refreshButton',
        })
    );

    $.fn.TicketCount = function()
    {
        setTimeout(
            function()
            {
                updateNumOfRows = $('.spec-ticket-item.ticket-item.ember-view:not(.loading)').length;
                $("#numberVal").text( ' (' + updateNumOfRows + ')' );
            }, timer);
    }

    $('.ticket-view-link.ember-view.sui-dropdown_entry').click(function() { timer = 1500; $.fn.TicketCount(); });

    //$('.btn.btn-default.refreshButton').click(function() { timer = 100; $.fn.TicketCount(); });
    $('.refresh-btn.btn.btn-default.js-refresh-btn').click(function() { timer = 100; $.fn.TicketCount(); });

    //This function if to fix the counter mistake once the user scrolls to a certain point
/*     $('.ember-view').scroll(function(){
        var currentScrollPosition = $(this).scrollTop();

        console.log(currentScrollPosition);
    }); */

    $('.btn.btn-default.refreshButton').click(function() {

        var x = $('#ember1810').scrollTop();
        $('#ember1810').animate({scrollTop: x+28});
        console.log(x);
    });
});
