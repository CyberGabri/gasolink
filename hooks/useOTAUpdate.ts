import { useEffect, useState } from "react";
import * as Updates from "expo-updates";
import { notifyNewUpdate } from "./useNotifications";

export function useOTAUpdate() {
  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          setAvailable(true);
          await notifyNewUpdate();
        }
      } catch {}
    })();
  }, []);

  const updateNow = async () => {
    setLoading(true);
    await Updates.fetchUpdateAsync();
    await Updates.reloadAsync();
  };

  return { available, loading, updateNow };
}
