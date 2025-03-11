export enum ReportType {
  RollingVwapRising = 'rollingVwapRising',
  RollingVwapFalling = 'rollingVwapFalling',
  RollingVwapFluctuate = 'rollingVwapFluctuate',
  RollingVwapTurnsUp = 'rollingVwapTurnsUp',
  RollingVwapTurnsDown = 'rollingVwapTurnsDown',
  RollingVwapAboveUpperBand = 'rollingVwapAboveUpperBand',
  RollingVwapBelowLowerBand = 'rollingVwapBelowLowerBand',
  RollingVwapInsideBands = 'rollingVwapInsideBands',
  RollingVwapCrossDownLowerBand = 'rollingVwapCrossDownLowerBand',
  RollingVwapCrossDownUpperBand = 'rollingVwapCrossDownUpperBand',
  RollingVwapCrossUpLowerBand = 'rollingVwapCrossUpLowerBand',
  RollingVwapCrossUpUpperBand = 'rollingVwapCrossUpUpperBand',

  Ma1Rising = 'ma1Rising',
  Ma1Falling = 'ma1Falling',
  Ma1Fluctuate = 'ma1Fluctuate',
  Ma1TurnsUp = 'ma1TurnsUp',
  Ma1TurnsDown = 'ma1TurnsDown',
  Ma1CrossDown = 'ma1CrossDown',
  Ma1CrossUp = 'ma1CrossUp',

  IsBullishFan = 'isBullishFan',
  IsBearishFan = 'isBearishFan',
  IsMessFan = 'isMessFan',
  IsBearishPunch = 'isBearishPunch',
  IsBullishPunch = 'isBullishPunch',

  VwapDailyRising = 'vwapDailyRising',
  VwapDailyFalling = 'vwapDailyFalling',
  VwapDailyFluctuate = 'vwapDailyFluctuate',
  VwapDailyTurnsUp = 'vwapDailyTurnsUp',
  VwapDailyTurnsDown = 'vwapDailyTurnsDown',
  VwapDailyCrossUp = 'vwapDailyCrossUp',
  VwapDailyCrossDown = 'vwapDailyCrossDown',

  VzoOverbought = 'vzoOverbought',
  VzoOversold = 'vzoOversold',

  CciOverbought = 'cciOverbought',
  CciOversold = 'cciOversold',

  ChoNegative = 'choNegative',
  ChoPositive = 'choPositive',

  IsBearishCandle = 'isBearishCandle',
  IsBullishCandle = 'isBullishCandle',

  IsVolumeAnomaly = 'IsVolumeAnomaly',

  IsBearishEng = 'isBearishEng',
  IsBullishEng = 'isBullishEng',
  IsDoji = 'isDoji',
  IsHammer = 'isHammer',
  IsPinbar = 'isPinbar',

  IsFractalChaosCrossedUp = 'isFractalChaosCrossedUp',
  IsFractalChaosCrossedDown = 'isFractalChaosCrossedDown',
}
