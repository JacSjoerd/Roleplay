import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

@Injectable()
export class CharacterIdService {
  characterId = new Subject<any>();

  setId(id: number) {
    this.characterId.next({id: id});
  }

  clearId() {
    this.characterId.next();
  }

  getId(): Observable<any> {
    return this.characterId.asObservable();
  }
}
