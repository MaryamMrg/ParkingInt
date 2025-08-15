import { Injectable } from '@angular/core';

export interface Place{
  placeId : number;
    number: number;
  availablty: boolean;
  status: "AVAILABLE"
}
@Injectable({
  providedIn: 'root'
})
export class Placeservice {

  constructor() { }
}
