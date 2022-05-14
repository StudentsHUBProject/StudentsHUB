/**Drop Function Argomenti**/
function DropMenu(){
    document.querySelector('.list1').classList.remove('newlist')
    document.getElementById("myDropdown").classList.remove("show");
    document.querySelector(".avContainer").classList.remove("showav");
    let list = document.querySelector('.list');
    list.classList.toggle('newlist');
}

/**Drop Function Livello**/
function DropMenu2(){
    document.querySelector('.list').classList.remove('newlist')
    document.getElementById("myDropdown").classList.remove("show");
    document.querySelector(".avContainer").classList.remove("showav");
    let list = document.querySelector('.list1');
    list.classList.toggle('newlist');
}

/**Search dropdown regione**/
function myFunction() {
  document.querySelector('.list1').classList.remove('newlist');
  document.querySelector('.list').classList.remove('newlist');
  document.querySelector(".avContainer").classList.remove("showav");
  document.getElementById("myDropdown").classList.toggle("show");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    a[i].style.display = "none";
    }
}

function filterFunction() {
  var input, filter, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  if(filter != ""){
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "block";
    } else {
      a[i].style.display = "none";
    }
  }}
  else{
    for (i = 0; i < a.length; i++) {
      a[i].style.display = "none";
      }
  }
}

/**Disponibilita dropdown**/
function AvFunction(){
  document.querySelector('.list').classList.remove('newlist')
  document.querySelector('.list1').classList.remove('newlist') 
  document.getElementById("myDropdown").classList.remove("show");
  document.querySelector(".avContainer").classList.toggle("showav")
}

/**Chiude se clicchi fuori dai btn**/
window.onclick = function (e){
  if (!e.target.matches('.click, .fa, .fa2, .fa3, .fa4, #myInput, .accordion')) {
    document.querySelector('.list').classList.remove('newlist')
    document.querySelector('.list1').classList.remove('newlist') 
    document.getElementById("myDropdown").classList.remove("show");
    document.querySelector(".avContainer").classList.remove("showav")
  }
}

/**Chiudi con scorrimento pagina**/
document.addEventListener("scroll", function(e){
  document.querySelector('.list').classList.remove('newlist')
  document.querySelector('.list1').classList.remove('newlist') 
  document.getElementById("myDropdown").classList.remove("show");
  document.querySelector(".avContainer").classList.remove("showav")
})

/**Scorri verso Howto**/
function StartFunction(){
  document.getElementById('HowTo').scrollIntoView({behavior: "smooth", block: "end"});
}
