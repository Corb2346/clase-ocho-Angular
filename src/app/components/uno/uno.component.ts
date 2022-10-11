import { Component, OnInit } from '@angular/core';
import { ApiAervicesService } from 'src/app/libs/interceptors/services/api-aervices.service';
import { DataService } from '../../libs/interceptors/services/data.service';
import { Router } from '@angular/router';
import StorageHelper from 'src/app/libs/interceptors/helpers/storege.helper';

@Component({
  selector: 'app-uno',
  templateUrl: './uno.component.html',
  styleUrls: ['./uno.component.scss']
})
export class UnoComponent implements OnInit {

  public username: string ='';
  public password: string = '';

  constructor(public ApiAervicesService:ApiAervicesService,private dataservice:DataService,private router:Router) { }

  ngOnInit(): void {
  }

  onClick(){
    console.log("username",this.username, "password",this.password);
    
    this.ApiAervicesService.login(this.username,this.password).subscribe(
      {next : response => {
        StorageHelper.setItem('session',response)
        this.router.navigate(['search'])
      }}
    );
  }
  
}
