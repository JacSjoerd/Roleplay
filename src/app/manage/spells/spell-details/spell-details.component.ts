import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { DataStorageService } from '../../../shared/data-storage.service';
import { Spell } from '../../../shared/spell.model';
import { SpellService } from '../spell.service';

@Component({
  selector: 'app-spell-details',
  templateUrl: './spell-details.component.html',
  styleUrls: ['./spell-details.component.css']
})
export class SpellDetailsComponent implements OnInit {
  spellDetailFrom: FormGroup;
  spellId: number;
  editMode: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataStorage: DataStorageService,
              private spellService: SpellService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.spellId = +params['id'];
          this.editMode = params['id'] != null;
          this.initSpellForm();
        }
      );
  }

  onSubmit() {
    if (this.editMode) {
      this.spellService.updateSpell(this.spellId, this.spellDetailFrom.value);
    } else {
      this.spellService.addSpell(this.spellDetailFrom.value);
    }

    this.onReset();
  }

  onReset() {
    if (this.editMode) {
      this.router.navigate(['../'], {relativeTo: this.route});
    } else {
      this.clearSpellForm();
    }
  }

  initSpellForm() {
    let name = "";
    let level = 0;
    let school = "";
    let reversible = false;
    let profession = "";
    let sphere = "";
    let range = "";
    let duration = "";
    let area = "";
    let castingTime = "";
    let savingThrow = "";
    let description = "";

    if (this.editMode) {
        let spellDetails = this.spellService.getSpell(this.spellId);
        if (spellDetails === null) {
          // Move up 1 level when the spellList is not yet loaded in the service
          this.router.navigate(['../'], {relativeTo: this.route});
        } else {
          name = spellDetails.name;
          level = spellDetails.level;
          school = spellDetails.school;
          reversible = spellDetails.reversible;
          profession = spellDetails.profession;
          sphere = spellDetails.sphere;
          range = spellDetails.range;
          duration = spellDetails.duration;
          area = spellDetails.area;
          castingTime = spellDetails.castingTime;
          savingThrow = spellDetails.savingThrow;
          description = spellDetails.description;
        }
    }

    this.spellDetailFrom = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'level': new FormControl(level, Validators.required),
      'school': new FormControl(school),
      'reversible': new FormControl(reversible),
      'profession': new FormControl(profession),
      'sphere': new FormControl(sphere),
      'range': new FormControl(range),
      'duration': new FormControl(duration),
      'area': new FormControl(area, Validators.required),
      'castingTime': new FormControl(castingTime, Validators.required),
      'savingThrow': new FormControl(savingThrow, Validators.required),
      'description': new FormControl(description)
    })

  }

  clearSpellForm() {
    this.spellDetailFrom.reset();
    this.spellDetailFrom.patchValue({
      level: 0,
      reversible: false
    });
  }
}
