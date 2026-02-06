type Entry<T> = {
  value: T;
  expires: number;
};

class TTLCache {
  private map = new Map<string, Entry<any>>();

  get<T>(key: string): T | undefined {
    const hit = this.map.get(key);
    if (!hit) return;

    if (Date.now() > hit.expires) {
      this.map.delete(key);
      return;
    }

    return hit.value;
  }

  set(key: string, value: any, ttlMs: number) {
    this.map.set(key, {
      value,
      expires: Date.now() + ttlMs,
    });
  }
}

export const cache = new TTLCache();
export const inflight = new Map<string, Promise<any>>();