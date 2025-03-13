import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-kline-summary-table',
  templateUrl: './kline-summary-table.component.html',
  styleUrls: ['./kline-summary-table.component.css'],
})
export class KlineSummaryTableComponent implements OnChanges {
  @Input() data: { openTime: number; count: number }[] | undefined; // Get JSON Data as Input

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data) {
      this.processData(this.data);
    }
  }

  processData(data: { openTime: number; count: number }[]) {
    const formattedTimestamps = new Map<string, number>();

    this.displayedColumns = data.map((d) => {
      let formatted = this.formatTime(d.openTime);

      // Ensure uniqueness by appending a counter if duplicates exist
      if (formattedTimestamps.has(formatted)) {
        let count = formattedTimestamps.get(formatted)! + 1;
        formattedTimestamps.set(formatted, count);
        formatted = `${formatted} (${count})`; // Add counter to duplicate timestamp
      } else {
        formattedTimestamps.set(formatted, 1);
      }

      return formatted;
    });

    this.dataSource.data = [{ ...data.map((d) => d.count) }];
  }

  formatTime(timestamp: number): string {
    const date = new Date(timestamp);
    return (
      date.toISOString().slice(2, 10) + ' ' + date.toISOString().slice(11, 16)
    ); // YY-MM-DD hh-mm
  }
}
