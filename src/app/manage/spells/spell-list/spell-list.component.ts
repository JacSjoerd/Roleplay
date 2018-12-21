import { Component, OnInit } from '@angular/core';
import { SpellService } from '../spell.service';
import { Spell } from '../../../shared/spell.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spell-list',
  templateUrl: './spell-list.component.html',
  styleUrls: ['./spell-list.component.css']
})
export class SpellListComponent implements OnInit {
  spellListSubscription: Subscription;
  spellList: Spell[] = [];
  constructor(private spellService: SpellService) { }

  ngOnInit() {
    this.spellListSubscription = this.spellService.spellsChanged
      .subscribe(
        (spells: Spell[]) => {
          this.spellList = spells;
        }
      )
    this.spellList = this.spellService.getSpells();
  }


}
