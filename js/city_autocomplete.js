/**
* @Author: Tristan Saëz & Adrien Le Boucher & Vincent Lebrenn
* @Company: ISEN Yncréa Ouest
* @Created Date: 16-Jun-2022
* @Last Modified: 06-Jun-2023
*/

'use strict';

//------------------------------------------------------------------------------
//--- showAutocomplete ---------------------------------------------------------
//------------------------------------------------------------------------------
// show results from automplete on the screen
function showAutocomplete(result) {
    $('#autocomplete').remove();

    let max = 0;
    let autocomplete = `<ul id="autocomplete">`;
    for(let element in result) {
        autocomplete += `<li class="city_auto" onclick="selectItem('${result[element]['ville']} (insee : ${result[element]['insee']})')">${result[element]['ville']} (insee : ${result[element]['insee']})<\li>`;
        max++;
        if(max > 10) break;
    }
    if(result.length - 10 > 0) autocomplete += `<li class="city_auto">And ${result.length - 10} more results...<\li>`
    autocomplete += `</ul>`;
    $('.city_autocomplete').append(autocomplete);
}

//--- removeAutocomplete ---------------------------------------------------------
// remove the list autocomplete from client screen
function removeAutocomplete() {
    $('#autocomplete').remove();
}

//--- removeAutocomplete ---------------------------------------------------------
// remove the list autocomplete from client screen
function getResults(city) {
    ajaxRequest('GET', 'php/autocomplete.php/', showAutocomplete, "city="+city);
}

//--- selectItem ---------------------------------------------------------
// put value of autocomplete in input field
function selectItem(city) {
    let field = $('.city_autocomplete :input');
    field[0].value = city;
}

// when client is typing if 3 or more characters is in the input, get autocompletion
$('.city_autocomplete').keyup(() => {
    let field = $('.city_autocomplete :input');
    
    if(field[0].value.length >= 1) getResults(field[0].value);
    if(field[0].value.length < 1) removeAutocomplete();
});

// when client is click on a field from the autocomplete, change it
$('.city_autocomplete').click(() => {
    let field = $('.city_autocomplete :input');
    field.trigger('change');
    removeAutocomplete();
})