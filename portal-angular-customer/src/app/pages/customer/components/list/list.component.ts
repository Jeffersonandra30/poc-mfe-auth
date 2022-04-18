import { LocalStorageUtils } from 'src/app/shared/utils/localstorage';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private localStorage: LocalStorageUtils) {
    console.log('listagem de customeres.');


  }

  ngOnInit(): void {
    const user = this.localStorage.obterUsuario();
    console.log('user', user);
    
  }

}
