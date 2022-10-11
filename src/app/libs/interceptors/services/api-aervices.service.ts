import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import StorageHelper from '../helpers/storege.helper';

@Injectable({
  providedIn: 'root'
})
export class ApiAervicesService {

  constructor( private http : HttpClient) { }

  login(username:string,password:string):Observable<any>{
    return this.http.post('http://ec2-18-116-97-69.us-east-2.compute.amazonaws.com:4001/api/login',
    {
        username, //solo aplica si el parametro se llama igual a la key si no se pone completo
        password
    })
  }
  
  /*searchPokemon(namePokemon: string){
    return this.http.post('http://ec2-18-116-97-69.us-east-2.compute.amazonaws.com:4001/mirror/pokemon',
    {
      "endpoint": `pokemon/${namePokemon}`
    })
  }*/

  /*searchPokemon(namePokemon: string){
    return this.http.get('https://pokeapi.co/api/v2/pokemon/'+ namePokemon,{
      headers: {
        Authorization : "Bearer" + this.getToken()
      }
    })
  }*/

  searchPokemon(namePokemon: string){
    /*return this.http.post('http://ec2-18-116-97-69.us-east-2.compute.amazonaws.com:4001/mirror/pokemon',{
      headers: {
        Authorization : "Bearer" + this.getToken()
      }
    })*/

    return this.http.post('http://ec2-18-116-97-69.us-east-2.compute.amazonaws.com:4001/mirror/pokemon',
    {
      "endpoint": "pokemon/" + namePokemon
    })
  }

  /*getSession(option: string){
    let session = JSON.parse(localStorage.getItem("Session")!)
    if(option === 'username'){
      return session.username
    }
    return session.token
  }  */

  /*checkStatus() :Observable <any>{
    return this.http.get("http://ec2-18-116-97-69.us-east-2.compute.amazonaws.com:4001/api/check",{
      headers: {
        Authorization : "Bearer " + this.getSession('token')
      }
    })
  }*/

  refreshToken(){
    return this.http.post('http://ec2-18-116-97-69.us-east-2.compute.amazonaws.com:4001/api/refresh',{
      session: StorageHelper.getItem('session')
    })
  }

  
}
