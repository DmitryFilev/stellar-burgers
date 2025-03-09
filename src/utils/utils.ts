import { TIngredient, TTabMode } from '@utils-types';

export const isType = (state: TIngredient, typeIngredient: TTabMode) => {
  if (!state) {
    return false;
  }
  if (state.type === typeIngredient) return true;
  return false;
};

export const moveElement = (
  arr: any[],
  key: string,
  val: any,
  shift: number
) => {
  const arrTarget = arr;
  const ind = arr.findIndex((el) => el[key] === val);
  return arrTarget.toSpliced(ind + shift, 0, arrTarget.splice(ind, 1)[0]);
};
