import {
  RouteAction,
  RouteChangeEvent,
  ROUTE_CHANGE_EVENT_TYPE,
} from "./events";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type UpdateStateArgs = [any, string, string | null];
type UpdateStateFn = (...args: UpdateStateArgs) => void;

function routeChange(action: RouteAction, location: Location) {
  window.dispatchEvent(
    new RouteChangeEvent(ROUTE_CHANGE_EVENT_TYPE, {
      detail: {
        action,
        location,
      },
    })
  );
}

function patchedUpdateState(updateState: UpdateStateFn, action: RouteAction) {
  return function (this: void, ...args: UpdateStateArgs) {
    updateState.apply(this, args);
    routeChange(action, document.location);
  };
}

// When react-router in host app does not track route changes in a
// micro frontend, in order to find stuff like active menu item we have to monitor
// location changes. The browser doesn't provide an API for that, so we need
// to handle it. By monkey patching history.pushState and history.replaceState
// as well as listening to onpopstate we can send a custom event on any location
// change.
export function startRouteChangeEmitter() {
  window.onpopstate = function () {
    routeChange("POP", document.location);
  };

  window.history.pushState = patchedUpdateState(
    window.history.pushState,
    "PUSH"
  );

  window.history.replaceState = patchedUpdateState(
    window.history.replaceState,
    "REPLACE"
  );
}
