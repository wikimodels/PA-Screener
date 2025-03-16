import { Injectable } from '@angular/core';
import { RepoTypes } from 'src/models/repo-types';
import { TF } from 'src/models/shared/timeframes';

@Injectable({
  providedIn: 'root',
})
export class RepoTypesService {
  private readonly repoTypesMap: Partial<Record<TF, RepoTypes[]>> = {
    [TF.m15]: [
      RepoTypes.IsBearishPunch,
      RepoTypes.IsBullishPunch,
      RepoTypes.Ma1CrossDown,
      RepoTypes.Ma1CrossUp,
      RepoTypes.Ma1TurnsDown,
      RepoTypes.Ma1TurnsUp,
      RepoTypes.VwapDailyCrossDown,
      RepoTypes.VwapDailyCrossUp,
      RepoTypes.VwapDailyTurnsUp,
      RepoTypes.VwapDailyTurnsDown,
    ],
    [TF.h1]: [
      RepoTypes.RollingVwapCrossDownLowerBand,
      RepoTypes.RollingVwapCrossDownUpperBand,
      RepoTypes.RollingVwapCrossUpLowerBand,
      RepoTypes.RollingVwapCrossUpUpperBand,
      RepoTypes.Ma1CrossDown,
      RepoTypes.Ma1CrossUp,
      RepoTypes.Ma1TurnsDown,
      RepoTypes.Ma1TurnsUp,
      RepoTypes.IsBearishPunch,
      RepoTypes.IsBullishPunch,
      RepoTypes.IsFractalChaosCrossedUp,
      RepoTypes.IsFractalChaosCrossedDown,
    ],
    [TF.h4]: [
      RepoTypes.CciOverbought,
      RepoTypes.CciOversold,
      RepoTypes.VzoOverbought,
      RepoTypes.VzoOversold,
      RepoTypes.IsHammer,
      RepoTypes.IsDoji,
      RepoTypes.IsPinbar,
      RepoTypes.IsBearishEng,
      RepoTypes.IsBullishEng,
      RepoTypes.IsFractalChaosCrossedUp,
      RepoTypes.IsFractalChaosCrossedDown,
      RepoTypes.IsVolumeAnomaly,
    ],
  };

  constructor() {}

  /**
   * Get the set of repo types for a given timeframe.
   * @param timeframe Timeframe (TF.m15, TF.h1, TF.h4)
   * @returns Array of RepoTypes
   */
  getRepoTypesForTimeframe(timeframe: TF): RepoTypes[] {
    return this.repoTypesMap[timeframe] || [];
  }
}
