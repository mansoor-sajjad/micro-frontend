type MountEventDetail<T> = {
  id: string;
  mountPoint: HTMLDivElement;
  payload: T;
};

type UnmountEventDetail = {
  id: string;
  mountPoint: HTMLDivElement;
};

export const MOUNT_EVENT_TYPE = '@entur-micro-frontend:mount';
export const UNMOUNT_EVENT_TYPE = '@entur-micro-frontend:unmount';

export interface MountEvent<T> extends CustomEvent<MountEventDetail<T>> {}
export interface UnmountEvent extends CustomEvent<UnmountEventDetail> {}

export function createMountEvent<T>(detail: MountEventDetail<T>) {
  return new CustomEvent<MountEventDetail<T>>(MOUNT_EVENT_TYPE, { detail });
}

export function createUnmountEvent(detail: UnmountEventDetail) {
  return new CustomEvent<UnmountEventDetail>(UNMOUNT_EVENT_TYPE, { detail });
}

export const ROUTE_CHANGE_EVENT_TYPE = '@entur-micro-frontend:after-route-change';

export type RouteAction = 'PUSH' | 'POP' | 'REPLACE';

type RouteChangeEventDetail = {
  location: Location;
  action: RouteAction;
};

export class RouteChangeEvent extends CustomEvent<RouteChangeEventDetail> {}
