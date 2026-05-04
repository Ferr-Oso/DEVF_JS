const frutas = ["manzana","manzana","pera","naranja","plátano","uva","fresa","melón","sandía","kiwi","piña"];
const conteoFrutas= {};

for (let i = 0; i < frutas.length; i++) {
    const fruta = frutas[i];
        if (conteoFrutas[fruta]) {
        conteoFrutas[fruta]+=1;
    }   else {
        conteoFrutas[fruta] = 1;
    }
}

console.log(conteoFrutas);