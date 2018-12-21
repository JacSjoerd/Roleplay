import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Spell } from "../../shared/spell.model";
import { DataStorageService } from "../../shared/data-storage.service";


@Injectable()
export class SpellService {
  spellsChanged = new Subject<Spell[]>();
  spellList: Spell[] = [];

  constructor(private dataStorage: DataStorageService) {}

  loadList(spellList: Spell[]) {
    console.log("Loading spell list into service");
    this.spellList = spellList;
    this.sortSpells();
    this.spellsChanged.next(this.spellList.slice())
  }

  getSpells(): Spell[] {
    return this.spellList.slice();
  }

  getSpell(id: number): Spell {
      if (this.spellList.length > 0) {
        return this.spellList[id];
      }
      return null;
  }

  addSpell(spell: Spell) {
    console.log("Adding spell to the service.");
    this.spellList.push(spell);
    this.sortSpells();
    this.spellsChanged.next(this.spellList.slice());
  }

  updateSpell(id: number, spell: Spell) {
    console.log("Updating spell in the service.");
    this.spellList[id] = spell;
    this.sortSpells();
    this.spellsChanged.next(this.spellList.slice())
  }

  deleteSpell(id: number) {
    this.spellList.splice(id, 1);
    this.spellsChanged.next(this.spellList.slice())
  }

  sortSpells() {
    this.spellList.sort(
      (a,b) => {
        if ( a.level > b.level) {
          return 1;
        }
        if (a.level === b.level) {
          if (a.name > b.name) {
            return 1;
          } else {
            return -1;
          }
        }
        if (a.level < b.level) {
          return -1
        }
      }
    )
  }
}
