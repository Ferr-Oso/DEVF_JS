let librosLeidos = [];

function agregarLibro(titulo) {
    librosLeidos.push(titulo);
    console.log(`Libro: "${titulo}" ha sido añadido`);
}

function mostrarLibrosLeidos() {
    if (librosLeidos.length === 0) {
        console.log("No has leído ningún libro aún.");
    } else {
        for (let i = 0; i < librosLeidos.length; i++) {
            console.log(`Libro ${i + 1}: "${librosLeidos[i]}"`);
        };
    }
}
console.log("-----------------------------------------");

agregarLibro("Cien Años de Soledad");
agregarLibro("Don Quijote de la Mancha");
agregarLibro("El Principito");

console.log("-----------------------------------------");
mostrarLibrosLeidos();


