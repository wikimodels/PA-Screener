import { Component, Input } from '@angular/core';
import { RepoKline } from 'src/models/repo';
import { CoinLinksService } from 'src/services/coin-links.service';
import { WorkSelectionService } from 'src/services/work.selection.service';

@Component({
  selector: 'app-repo-kline-item',
  templateUrl: './repo-kline-item.component.html',
  styleUrls: ['./repo-kline-item.component.css'],
})
export class RepoKlineItemComponent {
  @Input() item!: RepoKline;
  selectedItems$ = this.selectionService.selectionChanges$;
  constructor(
    public selectionService: WorkSelectionService<any>,
    public coinsLinksService: CoinLinksService
  ) {}

  ngOnInit(): void {}

  isSelected(item: RepoKline) {
    return this.selectionService.isSelected(item);
  }

  toggleItem(item: RepoKline): void {
    this.selectionService.toggle(item);
    console.log(this.selectionService.selectedValues());
  }
}
