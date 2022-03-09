import { createMountEvent, createUnmountEvent } from "./events";

import { Assets } from "./fetchAssets";

export function getContainerId(name: string) {
  return `${name}-container`;
}

export function mountMicroFrontend<T>(
  name: string,
  payload: T,
  mountPoint: HTMLDivElement
) {
  const event = createMountEvent({
    id: getContainerId(name),
    mountPoint,
    payload,
  });
  window.dispatchEvent(event);
}

export function unmountMicroFrontend(name: string, mountPoint: HTMLDivElement) {
  const event = createUnmountEvent({
    id: getContainerId(name),
    mountPoint,
  });
  window.dispatchEvent(event);
}

export async function loadScripts(scriptSources: string[]) {
  return Promise.all(
    scriptSources.map((src) => {
      const script = document.createElement("script");
      script.id = src;
      script.src = src;
      const onLoadPromise = new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
      });

      document.head.appendChild(script);

      return onLoadPromise;
    })
  );
}

export async function loadCss(cssIds: string[], root: HTMLHeadElement) {
  return Promise.all(
    cssIds.map((cssId) => {
      const css = document.createElement("link");

      css.id = cssId;
      css.href = cssId;
      css.rel = "stylesheet";

      const onLoadPromise = new Promise((resolve, reject) => {
        css.onload = resolve;
        css.onerror = reject;
      });

      root.appendChild(css);

      return onLoadPromise;
    })
  );
}

export function removeCSS(cssIds: string[]) {
  cssIds.forEach((cssId) => {
    const cssEl = document.getElementById(cssId);
    if (cssEl && cssEl.parentNode) {
      cssEl.parentNode.removeChild(cssEl);
    }
  });
}

export const getCssIds = (manifest: Assets, host: string) => {
  // Make sure main.css is the last element (for overriding styles correctly)
  const cssAssets = [
    ...Object.values(manifest.files)
      .filter((entry) => entry.endsWith(".css"))
      .filter((entry) => !entry.includes("main")),
  ];

  const mainCss = manifest.entrypoints.find((file) => file.endsWith(".css"));

  if (mainCss !== undefined) {
    cssAssets.push(mainCss);
  }

  return cssAssets.map((entry) => host + "/" + entry);
};
