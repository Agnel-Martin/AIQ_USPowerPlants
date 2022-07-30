import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Plant, State } from '../interface/IPlants'
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class PlantServices {
    readonly ROOT_URL = "http://localhost:4300";

    constructor(private http: HttpClient) { }
    getPlants(): Observable<Plant[]>{
        //this.posts = this.http.get(this.ROOT_URL+"/todos");
        return this.http.get<Plant[]>(this.ROOT_URL + '/todos');
    }

    getStates(): Observable<State[]>{
        return this.http.get<State[]>(this.ROOT_URL + '/todos/states');
    }

    getTopNPlants(Num : string): Observable<Plant[]>{
        let N = Num;
        return this.http.get<Plant[]>(this.ROOT_URL+`/todos/${N}`);
    }

    getStateTopNPlants(state : string, Num : string): Observable<Plant[]>{
        let abb = state;
        let N = Num;
        return this.http.get<Plant[]>(this.ROOT_URL+`/todos/${abb}/${N}`);
    }
}