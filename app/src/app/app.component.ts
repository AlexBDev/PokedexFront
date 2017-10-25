import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Http} from '@angular/http';
import * as _ from 'lodash';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchInput: string = '';
  pokemon = null;
  pokemonPicture = '';

  public radarChartLabels:string[] = ['Speed', 'Defense', 'Attack', 'Hp', 'Special-Defense', 'Special-Attack'];
  
  public radarChartData:any = [
     {data: [], label: 'Stats'}
  ];

  public radarChartType:string = 'radar';
  
  constructor(private http: HttpClient, private request: Http) {}

  private clearPokemon() {
    this.pokemon = null;
    this.pokemonPicture = '';
  }

  searchPokemon() {
    this.clearPokemon();

    if (_.isEmpty(this.searchInput)) {
      return;
    }

    this.request.get('http://localhost:3000/pokemon/'+this.searchInput).subscribe(data => {
      console.log(data.json());

      this.pokemon = data.json();
      this.pokemonPicture = this.pokemon.sprites.front_default || this.pokemon.sprites.front_female;
      this.radarChartData[0].data = [];
      for (var i in this.radarChartLabels) {
        let label = this.radarChartLabels[i];
        let el = _.find(this.pokemon.stats, function(o) { return o.name === label.toLowerCase(); });
        
        console.log(el);
        this.radarChartData[0].data.push(el.value);
        console.log(this.radarChartData[0]);
        
     }

    });
  }

  changeGender(type) {
    if (this.pokemon === null) {
      return;
    }

    this.pokemonPicture = this.pokemon.sprites['front_'+type];
  }
}
