import { Component, OnInit } from '@angular/core';
import {PokeapiService} from '../../services/pokeapi.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public pokemons: Array<any> = [];
  public currentOffset = 0;

  constructor(private pokeapi: PokeapiService) { }

  ngOnInit() {
    this.pokeapi.listPokemons(this.currentOffset).then(list => {
      this.pokemons = list;
    });
  }

  viewMore() {
    this.currentOffset += 20;
    this.pokeapi.listPokemons(this.currentOffset).then(list => {
      this.pokemons = this.pokemons.concat(list);
    });
  }
}
