import { useEffect } from "react";
import useDataRef from "./useDataRef";
import { TypedUseQueryHookResult } from "@reduxjs/toolkit/query/react";

function useRtkQueryStatusCallbacks<
  QR extends TypedUseQueryHookResult<any, any, any>,
>(
  queryResult: QR,
  callbacks?: RtkQueryStatusCallbacks<TypedUseQueryHookResult<any, any, any>>
) {
  const dataRef = useDataRef({ queryResult, callbacks });

  useEffect(() => {
    if (queryResult.isUninitialized) {
      dataRef.current.callbacks?.onUninitialized?.(dataRef.current.queryResult);
    }

    if (queryResult.isLoading) {
      dataRef.current.callbacks?.onLoading?.(dataRef.current.queryResult);
    }

    if (queryResult.isFetching) {
      dataRef.current.callbacks?.onFetching?.(dataRef.current.queryResult);
    }

    if (queryResult.isSuccess) {
      dataRef.current.callbacks?.onSuccess?.(dataRef.current.queryResult);
    }

    if (queryResult.isError) {
      dataRef.current.callbacks?.onError?.(dataRef.current.queryResult);
    }

    return () => {};
  }, [
    dataRef,
    queryResult.isError,
    queryResult.isFetching,
    queryResult.isLoading,
    queryResult.isSuccess,
    queryResult.isUninitialized,
  ]);

  return queryResult;
}

export default useRtkQueryStatusCallbacks;

export type RtkQueryStatusCallbacks<QR> = {
  onUninitialized?: (queryResult: QR) => void;
  onLoading?: (queryResult: QR) => void;
  onFetching?: (queryResult: QR) => void;
  onSuccess?: (queryResult: QR) => void;
  onError?: (queryResult: QR) => void;
};
