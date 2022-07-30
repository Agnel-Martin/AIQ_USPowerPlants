import { Component, OnInit } from '@angular/core';

import { Plant, State } from './interface/IPlants';
import { PlantServices } from './service/plantServices';

import { buildMap } from './components/mymap';

@Component({
selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'US Power Plant';
  readonly ROOT_URL = 'http://localhost:4300';

  allPlants !: Plant[];
  topNPlants !: Plant[];
  private addMarkers: any;
  States !: State[];

  constructor(public plantServices: PlantServices) { }
  
  // On Initialization
  ngOnInit(): void {
    this.onGetStates();
  }
  ngAfterViewInit() {
    this.addMarkers = buildMap();
  }

  // To GET all the Power Plants in USA
  onGetPlants(): void {
    this.plantServices.getPlants().subscribe(
      (response) => {
        //console.table(response);
        this.allPlants = response;
      },
      (error : any) => console.log(error),
      () => console.log("Received all Power Plants")
    )
  }

  onGetStates(): void {
    this.plantServices.getStates().subscribe(
      (response: State[]) => {
        //console.table(response);
        this.States = response;
      },
      (error : any) => console.log(error),
      () => console.log("Received all Power Plants")
    )
  }

  // To GET all the Power Plants in USA as per the User input for Top(N) -- Ordered as per Net Annual Generation
  onGetTopNPlants(Num : string): void {
    this.plantServices.getTopNPlants(Num).subscribe(
      (response) => {
        //console.table(response)
        this.topNPlants = response;
        this.addMarkers(this.topNPlants);
      },
      (error : any) => console.log(error),
      () => console.log("Received all Top(N) Power Plants")
    )
  }

  // To GET all the Power Plants in User selected State and Top(N) -- Ordered as per Net Annual Generation
  onGetStateTopNPlants(State: string, Num: string): void {
    this.plantServices.getStateTopNPlants(State, Num).subscribe(
      (response) => {
        //console.table(response)
        this.topNPlants = response;
        this.addMarkers(this.topNPlants);
      },
      (error : any) => console.log(error),
      () => console.log("Received all State Top(N) Power Plants")
    )
  }
}
