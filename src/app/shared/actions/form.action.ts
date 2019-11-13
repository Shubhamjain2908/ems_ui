import { Action } from '@ngrx/store';

export enum FormActionType {
  InitializeState = '[Form/Auth] initialize state',
  SetSuccessTrue = '[Form/Auth] set success true',
  SetSuccessFalse = '[Form/Auth] set success false',
  SetFailureTrue = '[Form/Auth] set failure true',
  SetLoadingTrue = '[Form/Auth] set loading true',
  SetLoadingFalse = '[Form/Auth] set loading false',
}


export class SetFailureTrue implements Action {
  readonly type = FormActionType.SetFailureTrue;

  constructor() { }
}

export class SetSuccessTrue implements Action {
  readonly type = FormActionType.SetSuccessTrue;

  constructor() { }
}

export class SetLoadingTrue implements Action {
  readonly type = FormActionType.SetLoadingTrue;

  constructor() { }
}

export class SetLoadingFalse implements Action {
  readonly type = FormActionType.SetLoadingFalse;

  constructor() { }
}

export class InitializeState implements Action {
  readonly type = FormActionType.InitializeState;

  constructor() { }
}
