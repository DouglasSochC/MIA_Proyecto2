import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cargamasiva',
  templateUrl: './cargamasiva.component.html',
  styleUrls: ['./cargamasiva.component.css']
})
export class CargamasivaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  capturarFile(event:any){
    const archivo = event.target.files[0];
    if (!archivo) {
      console.log("Error");
      return;
    }
    const lector = new FileReader();
    lector.onloadend = (e) => {
      const contenido = e.target?.result;
      console.log(this.convertirCSVtoJSON(contenido));
    };
    lector.readAsText(archivo);
  }

  public convertirCSVtoJSON(csv:any) {
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");
    console.log(headers);
    console.log(headers.length);
    console.log(lines)
    var dato = [];
    for (var i = 1; i < lines.length; i++) {
      console.log(i);
      const hola = i;
      dato.push({hola: "a"});
      /*var dato = [];
      var obj = {};
      var currentline = lines[i].split(",");
      for (var j = 0; j < headers.length; j++) {
        dato.push({"a": currentline[j]});
        dato.push({"b": currentline[j]});
      }
      result.push(dato);*/
    }
    console.log(dato);
    return JSON.stringify([]);
}

}
