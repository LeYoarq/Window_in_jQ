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


                .append('<h1>Calcular mascota promedio</h1>');
                //ponemos en el html que teniamos un div vacio un titulo para que nos diga lo que queremos hacer
                var total = 0;
                //inicializamos una variable contador
                const respuestas = Object.values(data);
                //a la variable respuesta le metemos el array que hemos obtenido con la información
                respuestas.forEach(function(element) {
                    //para cada posición del array
                    total = total + parseInt(element.edad);
                    //le añadimos al contador el valor de la posición
                });
         
                const promedioMascotas = total/respuestas.length;
                //en promedioEdad tenemos el resultado de dividir el valor del contador entre
                //la longitud que tenga el array
         
                $('#responsesContainer').append(`<h2>${promedioMascotas} años</h2>`);
                //imprimimos en el sitio vacio del html el resultado de la operacion de calcular
                //la edad promedio
            }
         });
 

        error: function(error) {
        console.log(error);
        }
    });
})

});
