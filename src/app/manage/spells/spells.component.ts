import { Component, OnInit } from '@angular/core';

import { DataStorageService } from '../../shared/data-storage.service';
import { SpellService } from './spell.service';
import { SpellDetailsComponent } from './spell-details/spell-details.component';
import { SpellListComponent } from './spell-list/spell-list.component';
import { SpellSummaryComponent } from './spell-list/spell-summary/spell-summary.component';

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  providers: [
    SpellDetailsComponent,
    SpellListComponent,
    SpellSummaryComponent
  ]
})
export class SpellsComponent implements OnInit {


  constructor(private dataStorage: DataStorageService,
              private spellService: SpellService) {}

  ngOnInit() {
    this.dataStorage.getSpellList()
      .subscribe(
        (data: any[]) => {
          if (data !== null) {
            this.spellService.loadList(data);
          }
        },
        (error) => console.log("Error occured: " + error)
      );

  }

  ngOnDestroy() {
    this.dataStorage.storeSpellList(this.spellService.getSpells())
      .subscribe(
        (data) => console.log("Stored data in database"),
        (error) => console.log("Error occured saving spells in datbase: " + error)
      )
  }
}
