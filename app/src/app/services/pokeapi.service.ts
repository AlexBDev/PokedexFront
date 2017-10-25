import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class PokeapiService {

  constructor(private request: Http) { }

  getPokemon(id: string | number) {
      return new Promise((resolve, reject) => {
        this.request.get('http://localhost:3000/pokemon/'+id).subscribe(data => {
            if (data === null) {
              reject(data);
            }

            resolve(data.json());
        })
      });
  }
}
