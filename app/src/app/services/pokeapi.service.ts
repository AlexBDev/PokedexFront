import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class PokeapiService {
  private API_URL: string = 'http://localhost:3000';

  constructor(private request: Http) { }

  getPokemon(id: string | number): Promise<any> {
      return new Promise((resolve, reject) => {
        this.request.get(this.API_URL+'/pokemon/'+id).subscribe(data => {
            if (data === null) {
              reject(data);
            }

            resolve(data.json());
        })
      });
  }

  listPokemons(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.request.get(this.API_URL+'/pokemon/list').subscribe(data => {
          if (data === null) {
            reject(data);
          }

          resolve(data.json());
      })
    });
  }
}
