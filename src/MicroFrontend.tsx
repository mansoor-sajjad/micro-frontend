import { useEffect, useState, useRef, FC } from "react";

import {
  mountMicroFrontend,
  unmountMicroFrontend,
  removeCSS,
  getContainerId,
  loadScripts,
  loadCss,
  getCssIds,
} from "./microFrontendHelpers";
import { fetchAssets, Assets } from "./fetchAssets";

declare global {
  interface Window {
    __react_router_build__?: string;
  }
}

type MicroFrontendProps<T> = {
  id: string;
  host: string;
  staticPath: string;
  name: string;
  payload: T;
  FetchStatus: FC<{ status: FetchAssetsStatus; name: string }>;
  handleError: (error: Error | unknown, extra?: any) => void;
};

type FetchAssetsStatus = "IDLE" | "SUCCESS" | "LOADING" | "ERROR";

export const MicroFrontend = <T extends unknown>({
  id,
  host,
  name,
  staticPath,
  payload,
  FetchStatus,
  handleError,
}: MicroFrontendProps<T>) => {
  const [status, setStatus] = useState<FetchAssetsStatus>("IDLE");
  const node = useRef<HTMLDivElement>(null);

  const mount = () => {
    setStatus("SUCCESS");
    mountMicroFrontend(id, payload, node.current!);
    return node.current;
  };

  useEffect(() => {
    // Fixes warning when loading different builds of react-router,
    // this is only a issue if you load different builds in the same
    // frontend. Since the router in the shell is isolated from the
    // micro-frontend it should not be a issue.
    // https://github.com/ReactTraining/react-router/blob/master/packages/react-router/modules/index.js
    delete window.__react_router_build__;

    let cssIds: string[] = [];
    let mountPoint: HTMLDivElement | null = null;
    setStatus("LOADING");

    const handleLoadingError = (e: Error) => {
      handleError(e);
      setStatus("ERROR");
    };

    fetchAssets<Assets>(host + staticPath)
      .then((manifest) => {
        cssIds = getCssIds(manifest, host);
        const root = document.head;
        loadCss(cssIds, root)
          .then(() => {
            const scriptIds = Object.values(manifest.files)
              .filter((entry) => entry.endsWith(".js"))
              .map((entry) => host + entry);
            const alreadyLoaded = scriptIds.every(
              (scriptId) => document.getElementById(scriptId) !== null
            );

            if (alreadyLoaded) {
              mountPoint = mount();
            } else {
              loadScripts(scriptIds)
                .then(() => {
                  mountPoint = mount();
                })
                .catch((e) => {
                  handleLoadingError(e);
                });
            }
          })
          .catch((e) => {
            handleLoadingError(e);
          });
      })
      .catch((e) => {
        handleLoadingError(e);
      });

    return () => {
      if (mountPoint) {
        unmountMicroFrontend(id, mountPoint);
      }
      removeCSS(cssIds);
    };
    // eslint-disable-next-line
  }, [name, host]);

  return (
    <>
      <FetchStatus status={status} name={name} />
      <main
        data-testid={getContainerId(id)}
        id={getContainerId(id)}
        ref={node}
      />
    </>
  );
};
