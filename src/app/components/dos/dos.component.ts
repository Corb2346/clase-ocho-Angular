import { Component, OnInit } from '@angular/core';
import { ApiAervicesService } from '../../libs/interceptors/services/api-aervices.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-dos',
  templateUrl: './dos.component.html',
  styleUrls: ['./dos.component.scss']
})
export class DosComponent implements OnInit {

  public pokemonName:string ='pikachu';

  public pokemon$!: Observable<any>

  constructor(private ApiAervicesService:ApiAervicesService) {
    this.pokemon$ = this.ApiAervicesService.searchPokemon("pikachu").pipe(
      tap(console.log)
    )
   }

  ngOnInit(): void {

  }

  onChange(){
    console.log(this.pokemonName);
    this.pokemon$ = this.ApiAervicesService.searchPokemon(this.pokemonName).pipe(
      tap(console.log)
    )
  }

}
