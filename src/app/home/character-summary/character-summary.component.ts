import { Component, OnInit, Input } from '@angular/core';
import { CharacterDetails } from '../../shared/character-details.model';
import { CharacterIdService } from '../../shared/character-id.service';


@Component({
  selector: 'app-character-summary',
  templateUrl: './character-summary.component.html'
})
export class CharacterSummaryComponent {
  @Input() characterSummary: CharacterDetails;
  @Input() index: number;

  constructor(private characterIdService: CharacterIdService) {}

  setAppCharacterId() {
    this.characterIdService.setId(this.index);
  }
}
