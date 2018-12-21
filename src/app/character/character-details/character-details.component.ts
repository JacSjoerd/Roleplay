import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { DataStorageService } from '../../shared/data-storage.service';
import { CharacterDetails } from '../../shared/character-details.model';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {
  characterId: number;
  characterDetails: CharacterDetails;
  characterForm: FormGroup;


  constructor(private route: ActivatedRoute,
              private dataStorage: DataStorageService,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params) => {
          this.characterId = +params['id'];
        }
      );


    this.characterForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'alias': new FormControl(null),
      'race': new FormControl(null),
      'profession': new FormControl(null),
      'level': new FormControl(null, Validators.required),
      'gender': new FormControl(null),
      'alignment': new FormControl(null),
      'maxHitpoints': new FormControl(null, Validators.required),
      'actualHitpoints': new FormControl(null, Validators.required)
    })

    this.dataStorage.getCharacter(this.characterId)
      .subscribe(
        (data: any) => {
          this.characterDetails = data;
          this.initCharacterForm(this.characterDetails);
        },
        (error: any) => console.log("Error on CharacterDetailComponent: ")
      )
  }

  private initCharacterForm(characterDetails: CharacterDetails) {
    this.characterForm.setValue({
      name: characterDetails.name || null,
      alias: characterDetails.alias || null,
      race: characterDetails.race || null,
      profession: characterDetails.profession || null,
      level: characterDetails.level || null,
      gender: characterDetails.gender || null,
      alignment: characterDetails.alignment || null,
      maxHitpoints: characterDetails.maxHitpoints || null,
      actualHitpoints: characterDetails.actualHitpoints || null
    });
  }

  saveCharacter() {
    this.characterDetails = this.characterForm.value;
    this.dataStorage.storeCharacter(this.characterId, this.characterDetails)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log("Error on storeCharacter: " + error)
      );
    console.log("Character saved...")
  }
}
