/*global EventListener*/

import {
  MountEvent,
  UnmountEvent,
  MOUNT_EVENT_TYPE,
  UNMOUNT_EVENT_TYPE,
} from "./events";

interface Config<T> {
  microFrontendId: string;
  mount: (
    mountPoint: HTMLDivElement,
    payload: T,
    deprecatedMountPoint: HTMLDivElement
  ) => void;
  unmount: (mountPoint: HTMLDivElement) => void;
}

export function registerMicroFrontend<T>(config: Config<T>): void {
  const { unmount, microFrontendId, mount } = config;

  window.addEventListener(MOUNT_EVENT_TYPE, ((event: MountEvent<T>) => {
    if (!event.detail.id.startsWith(microFrontendId)) {
      return;
    }
    mount(
      event.detail.mountPoint,
      event.detail.payload,
      event.detail.mountPoint
    );
  }) as EventListener);

  window.addEventListener(UNMOUNT_EVENT_TYPE, ((event: UnmountEvent) => {
    if (!event.detail.id.startsWith(microFrontendId)) {
      return;
    }
    unmount(event.detail.mountPoint);
  }) as EventListener);
}
