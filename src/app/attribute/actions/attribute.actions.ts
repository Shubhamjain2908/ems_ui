import { Action } from '@ngrx/store';

export enum AttributeActionTypes {
  GetAttributeList = '[Attribute] get list',
  GetAttribute = '[Attribute] get category',
  UpdateAttribute = '[Attribute] update category',
  CreateAttribute = '[Attribute] create category',
  DeleteAttribute = '[Attribute] delete category',
  GetAttributeChoiceList = '[Attribute] get choice list',
  GetAttributeChoice = '[Attribute] get attribute choice',
  UpdateAttributeChoice = '[Attribute] update attribute choice',
  CreateAttributeChoice = '[Attribute] create attribute choice',
  DeleteAttributeChoice = '[Attribute] delete attribute choice',
  GetAttributeChoiceSuccess = '[Attribute] get attribute choice success',
  GetAttributeListSuccess = '[Attribute] get list success',
  GetAttributeChoiceListSuccess = '[Attribute] get choice list success',
  EmptyState = '[Attribute] empty state',
  SetSelectedAttributeId = '[Attribute] set selected attribute id',
  GetAttributeSuccess = '[Attribute] get attribute success',
}

export class GetAttributeList implements Action {
  readonly type = AttributeActionTypes.GetAttributeList;

  constructor(public payload: any, public options: any = {}) { }
}

export class GetAttribute implements Action {
  readonly type = AttributeActionTypes.GetAttribute;

  constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}

export class CreateAttribute implements Action {
  readonly type = AttributeActionTypes.CreateAttribute;

  constructor(public payload: any, public options: any = {}) { }
}

export class UpdateAttribute implements Action {
  readonly type = AttributeActionTypes.UpdateAttribute;

  constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}

export class DeleteAttribute implements Action {
  readonly type = AttributeActionTypes.DeleteAttribute;

  constructor(public payload: any, public options: any = {}) { }
}

export class GetAttributeChoiceList implements Action {
  readonly type = AttributeActionTypes.GetAttributeChoiceList;

  constructor(public attributeId: any, public data: any, public options: any = {}) { }
}

export class GetAttributeChoice implements Action {
  readonly type = AttributeActionTypes.GetAttributeChoice;

  constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}

export class CreateAttributeChoice implements Action {
  readonly type = AttributeActionTypes.CreateAttributeChoice;

  constructor(public attributeId: any, public data: any, public options: any = {}) { }
}

export class UpdateAttributeChoice implements Action {
  readonly type = AttributeActionTypes.UpdateAttributeChoice;

  constructor(public attributeChoiceId: any, public data: any = {}, public options: any = {}) { }
}

export class DeleteAttributeChoice implements Action {
  readonly type = AttributeActionTypes.DeleteAttributeChoice;

  constructor(public attributeChoiceId: any, public options: any = {}) { }
}

export class GetAttributeListSuccess implements Action {
  readonly type = AttributeActionTypes.GetAttributeListSuccess;

  constructor(public payload: any, public options: any = {}) { }
}

export class EmptyState implements Action {
  readonly type = AttributeActionTypes.EmptyState;

  constructor() { }
}

export class SetSelectedAttributeId implements Action {
  readonly type = AttributeActionTypes.SetSelectedAttributeId;

  constructor(public payload: any) { }
}

export class GetAttributeChoiceSuccess implements Action {
  readonly type = AttributeActionTypes.GetAttributeChoiceSuccess;

  constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}

export class GetAttributeChoiceListSuccess implements Action {
  readonly type = AttributeActionTypes.GetAttributeChoiceListSuccess;

  constructor(public payload: any, public options: any = {}) { }
}

export class GetAttributeSuccess implements Action {
  readonly type = AttributeActionTypes.GetAttributeSuccess;

  constructor(public payload: any, public data: any = {}, public options: any = {}) { }
}
