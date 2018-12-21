import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { CharacterDetails } from '../shared/character-details.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  characterList: CharacterDetails[];

  constructor(private dataStorage: DataStorageService) { }

  ngOnInit() {
    this.dataStorage.getCharacterList()
      .subscribe(
        (data: any[]) => this.characterList = data,
        (error) => console.log("Error occured: " + error)
      );
  }



}
