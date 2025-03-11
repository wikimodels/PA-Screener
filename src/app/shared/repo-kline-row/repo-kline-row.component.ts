import { Component, Input } from '@angular/core';
import { RepoItem } from 'src/models/repo';

@Component({
  selector: 'app-repo-kline-row',
  templateUrl: './repo-kline-row.component.html',
  styleUrls: ['./repo-kline-row.component.css'],
})
export class RepoKlineRowComponent {
  @Input() item!: RepoItem;
}
