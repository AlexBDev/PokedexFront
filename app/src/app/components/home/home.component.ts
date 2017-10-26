import { Component, OnInit } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Http} from '@angular/http';
import * as _ from 'lodash';
import { Chart } from 'chart.js';
import { PokeapiService } from '../../services/pokeapi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isLoading: boolean = false;
  public searchInput: string = '';
  public pokemon: any = null;
  public pokemonName: string = '';
  public pokemonPicture: string = '';
  public radarChartLabels: string[] = ['Speed', 'Defense', 'Attack', 'Hp', 'Special-Defense', 'Special-Attack'];
  public radarChartData: any = [{data: [], label: 'Stats'}];
  public radarChartType:string = 'radar';

  constructor(private http: HttpClient, private pokeapi: PokeapiService) {}
  
  private clearPokemon() {
    this.pokemon = null;
    this.pokemonPicture = '';
    this.pokemonName = '';
  }

  searchPokemon() {
    this.clearPokemon();

    if (_.isEmpty(this.searchInput)) {
      return;
    }

    this.isLoading = true;
    this.pokeapi.getPokemon(this.searchInput).then(pokemon => {
      this.pokemon = pokemon;
      this.pokemonPicture = this.pokemon.sprites.front_default || this.pokemon.sprites.front_female;
      this.pokemonName = _.find(this.pokemon.names, o => { return o.locale.toLowerCase() === 'fr' }).name;
    
      this.createChart();
      this.isLoading = false;      
    }).catch(error => {
      this.isLoading = false;            
    });
  }

  private createChart() {
    this.radarChartData[0].data = [];
    
    for (var i in this.radarChartLabels) {
      let label = this.radarChartLabels[i];
      let stat = _.find(this.pokemon.stats, function(o) { return o.name === label.toLowerCase(); });
      
      this.radarChartData[0].data.push(stat.value);
    }
  }

  ngOnInit() {
  }
}
