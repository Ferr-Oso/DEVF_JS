
let nota = Math.floor(Math.random() * 101);

console.log("Tu nota es: " + nota);
if (nota> 0) {

    if (nota >= 90){
        console.log("Tu nota es Excelente");   
    }
    else if ( nota >= 75 && nota < 90){
        console.log("Tu nota es Buena");
    }
    else if (nota >= 60 && nota < 75){
        console.log("Tu nota es Suficiente");
    }
    else {
        console.log("Tu nota es Reprobatoria");
}
} else {
    console.log("El alumno obtuvo un 0 o no presentó calificación.");
}