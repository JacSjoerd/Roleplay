import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

import { Spell } from '../../../../shared/spell.model';
import { SpellService } from '../../spell.service';
import { DataStorageService } from '../../../../shared/data-storage.service';

@Component({
  selector: 'app-spell-summary',
  templateUrl: './spell-summary.component.html'
})
export class SpellSummaryComponent {
  @Input() index: number;
  @Input() spell: Spell;

  constructor(private spellService: SpellService,
              private dataStorage: DataStorageService) {}

    
  onDelete(){
      this.spellService.deleteSpell(this.index);

      this.dataStorage.storeSpellList(this.spellService.getSpells())
        .subscribe(
          (data) => console.log("Stored data in database"),
          (error) => console.log("Error occured saving spells in datbase: " + error)
        )

  }
}
