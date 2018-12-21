import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from '../../shared/data-storage.service';
import { Abilities } from '../../shared/abilities.model';

@Component({
  selector: 'app-character-abilities',
  templateUrl: './character-abilities.component.html',
  styleUrls: ['./character-abilities.component.css']
})
export class CharacterAbilitiesComponent implements OnInit {
  abilities: Abilities;
  abilityForm: FormGroup;
  characterId: number;

  strengthTotal: number;
  dexterityTotal: number;
  constitutionTotal: number;
  intelligenceTotal: number;
  wisdomTotal: number;
  charismaTotal: number;

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

    this.abilityForm = new FormGroup({
      'strengthBase': new FormControl(null, Validators.required),
      'strengthTemp': new FormControl(null),
      'dexterityBase': new FormControl(null, Validators.required),
      'dexterityTemp': new FormControl(null),
      'constitutionBase': new FormControl(null, Validators.required),
      'constitutionTemp': new FormControl(null),
      'intelligenceBase': new FormControl(null, Validators.required),
      'intelligenceTemp': new FormControl(null),
      'wisdomBase': new FormControl(null, Validators.required),
      'wisdomTemp': new FormControl(null),
      'charismaBase': new FormControl(null, Validators.required),
      'charismaTemp': new FormControl(null)
    });

    this.dataStorage.getAbilities(this.characterId)
      .subscribe(
        (data: any) => {
          this.abilities = data;
          this.initAbilitiesForm(this.abilities);
          this.updateAbilities();
        },
        (error: any) => console.log("Error on CharacterDetailComponent: ")
      )

  }

  private initAbilitiesForm(abilities: Abilities) {
    this.abilityForm.setValue({
      strengthBase: abilities.strengthBase || null,
      strengthTemp: abilities.strengthTemp || null,
      dexterityBase: abilities.dexterityBase || null,
      dexterityTemp: abilities.dexterityTemp || null,
      constitutionBase: abilities.constitutionBase || null,
      constitutionTemp: abilities.constitutionTemp || null,
      intelligenceBase: abilities.intelligenceBase || null,
      intelligenceTemp: abilities.intelligenceTemp || null,
      wisdomBase: abilities.wisdomBase || null,
      wisdomTemp: abilities.wisdomTemp || null,
      charismaBase: abilities.charismaBase || null,
      charismaTemp: abilities.charismaTemp || null
    });
  }

  private updateAbilities() {
    this.strengthTotal = (parseInt(this.abilityForm.value.strengthBase) || 0) + (parseInt(this.abilityForm.value.strengthTemp) || 0);
    this.dexterityTotal = (parseInt(this.abilityForm.value.dexterityBase) || 0) + (parseInt(this.abilityForm.value.dexterityTemp) || 0);
    this.constitutionTotal = (parseInt(this.abilityForm.value.constitutionBase) || 0) + (parseInt(this.abilityForm.value.constitutionTemp) || 0);
    this.intelligenceTotal = (parseInt(this.abilityForm.value.intelligenceBase) || 0) + (parseInt(this.abilityForm.value.intelligenceTemp) || 0);
    this.wisdomTotal = (parseInt(this.abilityForm.value.wisdomBase) || 0) + (parseInt(this.abilityForm.value.wisdomTemp) || 0);
    this.charismaTotal = (parseInt(this.abilityForm.value.charismaBase) || 0) + (parseInt(this.abilityForm.value.charismaTemp) || 0);
    this.abilities = this.abilityForm.value;
    this.dataStorage.storeAbilities(this.characterId, this.abilities)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log("Error on storeCharacter: " + error)
      );
    console.log("Abilities saved...")
  }

}
