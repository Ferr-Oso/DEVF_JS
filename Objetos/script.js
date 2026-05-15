let miLibro = {

    titulo: "El Gran Gatsby",
    autor: "F. Scott Fitzgerald",
    anio: 1925,
    estado: "disponible",
    capitulos: [],

    describirLibro: function() {

        console.log(`Libro titulado ${this.titulo}, escrito por ${this.autor} en el año ${this.anio}, se encuentra: ${this.estado}. Tiene ${this.capitulos.length} capítulos.`);
    },

    agregarCapitulo: function(tituloCapitulo){
        this.capitulos.push(tituloCapitulo);
        console.log(`Capítulo "${tituloCapitulo}" agregado al libro.`);
    },

    eliminarCapitulo: function(tituloCapitulo) {
        this.capitulos= this.capitulos.filter(cap => cap !== tituloCapitulo);
        console.log(`Capítulo "${tituloCapitulo}" eliminado del libro.`);
    },

}
/* miLibro.describirLibro();
miLibro.agregarCapitulo("Capítulo 1: El Comienzo");
miLibro.agregarCapitulo("Capítulo 2: La Fiesta");
miLibro.agregarCapitulo("Capítulo 3: El Misterio");
miLibro.describirLibro();
miLibro.eliminarCapitulo("Capítulo 3: El Misterio");
miLibro.describirLibro(); */
