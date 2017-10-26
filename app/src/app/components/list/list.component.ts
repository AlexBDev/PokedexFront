import { Component, OnInit } from '@angular/core';
import {PokeapiService} from '../../services/pokeapi.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public pokemonList: Array<any> = [];
  public pokemons: Array<any> = [];

  constructor(private pokeapi: PokeapiService) { }

  ngOnInit() {
    this.pokeapi.listPokemons().then(list => {
      this.pokemonList = list;
      for (let i in list) {
        let pokemon = {
          name:  _.find(this.pokemonList[i].names, o => { return o.locale.toLowerCase() === 'fr' }).name,
          picture: this.pokemonList[i].sprites.front_default || this.pokemonList[i].sprites.front_female
        };

        this.pokemons.push(pokemon);
      }
    });
  }

}
