
/**Disponibilita dropdown**/
function AvFunction(){
  document.querySelector(".avContainer").classList.toggle("showav")
}

/*Chiude se clicchi fuori dai btn*/
window.onclick = function (e){
  if (!e.target.matches('.clickD, .fa4, .accordion')) {
    document.querySelector(".avContainer").classList.remove("showav")
  }
}

/*Chiudi con scorrimento pagina*/
document.addEventListener("scroll", function(e){
  document.querySelector(".avContainer").classList.remove("showav")
})

/**Scorri verso Howto**/
function StartFunction(){
  document.getElementById('HowTo').scrollIntoView({behavior: "smooth", block: "end"});
}

/**Select Materia**/
$(document).ready(function () {
  $('#select-subject').selectize({
    sortField: 'text'
  });
  $("#select-level").selectize({
    maxItems: 3,
  });
  $('#select-city').selectize({
    sortField: 'text'
  });
  });

