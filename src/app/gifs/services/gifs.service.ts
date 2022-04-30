import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, GIFBuscar } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'RdY44SsMt7ur34nhKJKc93TRSVXVV3EJ'
  private URL: string= 'http://api.giphy.com/v1/gifs'
  private _historial: string[]=[];


  get historial(){
    return this._historial;
  }

  public resultados: Gif[]=[];

  constructor(private http: HttpClient) {
    this._historial=JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados=JSON.parse(localStorage.getItem('resultados')!) || [];
    console.log(JSON.parse(localStorage.getItem('historial')!))
   }

  buscarGifs(query:string){
    query=query.toLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      console.log(this.historial)
      this._historial=this._historial.slice(0,9);
      localStorage.setItem("historial", JSON.stringify(this._historial))
    }

    const params=new HttpParams().set('apiKey', this.apiKey)
      .set('limit', '10')
      .set('q', query )


    console.log(params.toString())



    this.http.get<GIFBuscar>(`${this.URL}/search`, {params: params}).subscribe(
      (response)=> {
        console.log(response.data)
        this.resultados=response.data;
        localStorage.setItem("resultados", JSON.stringify(response.data))
      }
    )
  }


}
