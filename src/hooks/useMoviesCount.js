import { useState, useEffect, useCallback } from "react";

export function useMoviesCount() {
  const [items, setItems] = useState(3);

  useEffect(() => {
    let timeout = null;
    const resize = (e) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (window.innerWidth >= 1024) {
          setItems(12);
        } else if (window.innerWidth >= 768) {
          setItems(8);
        } else {
          setItems(5);
        }
      }, 100);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const loadMore = useCallback(() => {
    if (window.innerWidth >= 1024) {
      setItems(items + 3);
    } else {
      setItems(items + 2);
    }
  }, [items]);

  const reset = useCallback(() => {
    setItems(items);
  }, [items]);

  return { items, reset, loadMore};
}