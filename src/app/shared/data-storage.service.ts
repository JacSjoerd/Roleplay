import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

import { CharacterDetails } from "./character-details.model";
import { Abilities } from "./abilities.model";
import { Spell } from "./spell.model";
import { Note } from "./note.model";


@Injectable()
export class DataStorageService {
  database = 'https://roleplay-c4d12.firebaseio.com/';

  constructor(private http: HttpClient) {}

  storeCharacter(id: number, characterDetails: CharacterDetails): Observable<any> {
    return this.http.put(this.database + 'characters/' + id + '.json', characterDetails);
  }

  getCharacter(id: number): Observable<CharacterDetails> {
    return this.http.get<CharacterDetails>(this.database + 'characters/' + id + '.json');
  }

  getCharacterList(): Observable<CharacterDetails[]>  {
    return this.http.get<CharacterDetails[]>(this.database + 'characters.json');
  }

  storeAbilities(id: number, abilities: Abilities): Observable<any> {
    return this.http.put(this.database + 'abilities/' + id + '.json', abilities);
  }

  getAbilities(id: number): Observable<Abilities> {
    return this.http.get<Abilities>(this.database + 'abilities/' + id + '.json');
  }

  getSpellList(): Observable<Spell[]> {
    return this.http.get<Spell[]>(this.database + 'spells.json');
  }

  storeSpellList(spellList: Spell[]): Observable<any> {
    return this.http.put(this.database + 'spells.json', spellList);
  }

  storeNote(note: Note): Observable<any> {
    return this.http.put<Note>(this.database + 'notes/' + note.characterId +'.json', note)
  }

  getNote() {

  }

  getNoteList() {

  }
}
