import { Colors, Status } from "../types";

export const emptyCallback = (): void => {};

export const getColorOfStatus = (status: Status): Colors => {
  switch (status) {
    case Status.Completed:
      return 'success';
    case Status.New:
    default:
      return 'primary';
  }
};

export const getLabelOfStatus = (status: Status): string => {
  switch (status) {
    case Status.Completed:
      return 'Completed';
    case Status.New:
    default:
      return 'New';
  }
}