$(document).ready(function(){

  
  const $submit = $('input[type="submit"]');

  //para buscar las respuestas
  const $fetch = $('#fetch');
  
  $submit.click(function(e){
    e.preventDefault();
    
    //la constante
    const inputData = {
        name: $('#name').val(),
        email: $('#email').val(),
        animals: {
            species: $('#species').val(),
            quantity: parseInt($('input[name=cantidad]:checked').val())
        },
    //Las preguntas
    questions: {
        personality: $('#pr1').val(),
        character: $('#pr2').val(),
        freedom: $('#pr3').val(),
        superpower: $('#pr4').val(),
        message: $('#pr5').val(),
    }

  }
  //ajax es para enviar el jsonpara hacer la llamada a-sincronica 
    $.ajax({
        //este link es el que esta colgado en firebase github
        url: 'https://mi-proyecto-reto.firebaseio.com/.json',
        //por es para enviar json - cuando es pos necesita data
        type: "POST",
        //stringify es para convertir el objeto a json y poderlo enviar
        data: JSON.stringify(inputData),
        success: function (data) {
            alert('Compi, tu formulario se envío');
            },
        error: function(error) {
            console.log(error);
        }
    });
});

//lo que quiero que me devuelva
$fetch.click(function() {
    $('#fetch').hide();
  $.ajax({
        url: 'https://mi-proyecto-reto.firebaseio.com/.json',
        type: "GET",
        success: function (data) {
            $('#formulario').hide();
            $('#responsesContainer').append('<h1>¡Conociendonos!</h1>');
            //map = Itera sobre el array y devuelve otro array duplicado con las transformaciones
            Object.values(data).map(function(response) {
              $('#responsesContainer')
              //responses: cada respuesta que nos da get .append: es la respuesta
              .append(`<h3> ${response.name} </h3>`)
              .append(`<li>Animal de eleccion: ${response.animals.species}</li>`)
              .append(`<li>Su banda sonora: ${response.questions.personality}</li>`)
              .append(`<li>Personaje historico: ${response.questions.character}</li>`)
              .append(`<li>La libertad: ${response.questions.freedom}</li>`)
              .append(`<li>Super Poder: ${response.questions.superpower}</li>`)
              .append(`<li>Mensaje: ${response.questions.message}</li>`)
              .append(`<li>Numero de mascotas: ${response.animals.quantity}</li>`)
            });
        },

        /*const fiatUsers = Object.values(data).filter(function(response) {
            return response.animals.animals == 'fiat';
        });

        
        if (fiatUsers.length > 0) {
            $('#fiatUsers').append('<h1>Este es tu animal de elección: </h1>')
                fiatUsers.map(function(user) {
                $('#fiatUsers')
                .append(`<h3>${user.name}</h3>`)
                .append(`<li>Cantidad: ${user.animals.animals}<h2>`);
              });*/


        error: function(error) {
        console.log(error);
        }
    });
})

});
