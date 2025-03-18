// This interface defines the structure of processed data
// before it's transformed into final chart options
export interface ProcessedData {
  /**
   * Formatted category labels for the X-axis
   * Example: ["Nov 12 14:30", "Nov 12 15:00", ...]
   */
  categories: string[];

  /**
   * Array of data series configurations containing:
   * - name: Series display name
   * - data: Numerical values for the series
   * - color: Color for this series
   */
  seriesData: Array<{
    name: string;
    data: number[];
    color: string;
  }>;
}
