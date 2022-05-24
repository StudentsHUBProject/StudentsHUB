$(document).ready(function(){

  if (!isAuth) {
    window.location.href = "./signin";
  }

$('#select-regione').selectize({
    sortField: 'text'
  });
$('#select-subject').selectize({
    sortField: 'text'
  });
$('#select-language').selectize({
    sortField: 'text'
  });
$('#select-slanguage').selectize({
    sortField: 'text'
});
$('#levelselector').selectize({
  sortField: 'text'
});
$('#select-occupation').selectize({
  sortField: 'text'
});
  

/**=====Real-time change del titolo=====**/
$('#input_titolo').bind('keyup change', function (event, previousText) {
    $('#titolo').html($(this).val());
 });


/**=====Real-time change del prezzo=====**/
 $('#input_prezzo').bind('keyup change', function (event, previousText) {
    $('#prezzo').html($(this).val());
 });

/**=====Real-time change del Nome=====**/
$('#input_nome').bind('keyup change', function (event, previousText) {
    $('#Nome').html($(this).val());
});

/**=====Real-time change del Cognome=====**/
$('#input_cognome').bind('keyup change', function (event, previousText) {
    $('#Cognome').html($(this).val());
});

/**=====Real-time change della regione=====**/
$('#select-regione').change(function(){
    $('#Regione').html($(this).val());
})

/**=====Real-time change del titolo di studio=====**/
$('#select-occupation').change(function(){
    $('#occupation').html($(this).val());
})

/**=====Real-time change della modalita=====**/
$('#home').change(function(){
    document.querySelector(".homeicon").classList.toggle("showhome")
})

$('#away').change(function(){
    document.querySelector(".awayicon").classList.toggle("showaway")
})

/**=====Real-time change del reset=====**/
$('#resetbtn').bind('click', function(){
    $('#occupation').html("");
    $('#Regione').html("");
    $('#Cognome').html("");
    $('#Nome').html("");
    $('#prezzo').html("");
    $('#titolo').html("");
    $("#levelselector")[0].selectize.clear();
    $("#select-regione")[0].selectize.clear();
    $("#select-subject")[0].selectize.clear();
    $("#select-language")[0].selectize.clear();
    $("#select-slanguage")[0].selectize.clear();
    $("#select-occupation")[0].selectize.clear();
    document.getElementById('foto').src = "#";
    document.querySelector(".homeicon").classList.remove("showhome")
    document.querySelector(".awayicon").classList.remove("showaway")
})


/**=====Real-Time change della foto=====**/
document.getElementById('input_foto').onchange = function (evt) {
    var tgt = evt.target
    files = tgt.files;

    // FileReader support
    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
            document.getElementById('foto').src = fr.result;
        }
        fr.readAsDataURL(files[0]);
    }
}


  //ajax request per la creazione del libro
  $("#submitbtn").on('click', function(){

    var crea={
        Nome:  $("#input_nome").val(),    
        Cognome:  $("#input_cognome").val(),
        Regione:  $("#select-regione").val(),
        Titolo_di_studio:  $("#select-occupation").val(),
        Foto:  document.getElementById("foto").src,
        Livello: $("#levelselector").val(),
        Materia: $("#select-subject").val(),
        Lingua:  $("#select-language").val(),
        Lingua_Secondaria:  $("#select-slanguage").val(),
        Modalità:  [$("#home:checked").val(), $("#away:checked").val()],
        Prezzo:  $("#input_prezzo").val(),
        Titolo:  $("#input_titolo").val(),
        Descrizione:  $("#desc").val(),
        Utente: "",
    };

    if(crea.Nome=="" || crea.Regione=="" || crea.Titolo_di_studio=="" || crea.Foto=="" || crea.Livello=="" ||
       crea.Materia=="" || crea.Lingua=="" || crea.Modalità==[false,false] || crea.Prezzo=="" || 
       crea.Titolo=="" || crea.Descrizione==""){}

    else{
      $.ajax({
      url: "http://localhost:8080/api/FormTutor",
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify(crea),
      success: function() {
        window.location.href="http://localhost:8080/corsi";
        },
      error: function (err) {
        console.log(err);
      }
    })
    }
  })

})

function StartFunction2(){
    document.getElementById('FAQsection').scrollIntoView({behavior: "smooth", block: "end"});
  }
  






