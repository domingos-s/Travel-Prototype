"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchDestinations, type DestinationFetchMode } from "@/lib/api/destinations";
import type { Destination } from "@/lib/mock/destinations";

type UiState = "loading" | "ready" | "empty" | "error";
type Tab = "Home" | "Search" | "Favorites" | "Profile";

const TABS: Tab[] = ["Home", "Search", "Favorites", "Profile"];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(price);
}

export function TravelApp() {
  const [tab, setTab] = useState<Tab>("Search");
  const [uiState, setUiState] = useState<UiState>("loading");
  const [items, setItems] = useState<Destination[]>([]);
  const [scenario, setScenario] = useState<DestinationFetchMode>("ok");

  useEffect(() => {
    let active = true;
    setUiState("loading");

    fetchDestinations(scenario)
      .then((data) => {
        if (!active) return;
        setItems(data);
        setUiState(data.length === 0 ? "empty" : "ready");
      })
      .catch(() => {
        if (!active) return;
        setUiState("error");
      });

    return () => {
      active = false;
    };
  }, [scenario]);

  const hasCards = useMemo(() => uiState === "ready" && items.length > 0, [uiState, items.length]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-3 py-6 sm:px-8">
      <section className="w-full max-w-sm rounded-[2.75rem] border-4 border-ink bg-paper p-4 shadow-doodle sm:max-w-md sm:p-6" aria-label="Travel app mockup">
        <header className="mb-4 flex items-center justify-between">
          <button className="rounded-lg border-2 border-ink px-2 py-1 text-sm font-semibold" aria-label="Open inbox">✉</button>
          <h1 className="font-display text-4xl leading-none tracking-wide text-ink">Travel App</h1>
          <span aria-hidden className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-green-600 bg-green-100 text-xl">🍃</span>
        </header>

        <div className="mb-4 rounded-2xl border-2 border-ink bg-white p-2">
          <div className="relative h-40 rounded-xl border-2 border-ink bg-gradient-to-b from-sea via-blue-100 to-[#f2d6a1] p-2 sm:h-48">
            <div className="absolute left-4 top-6 text-4xl" aria-hidden>🌴</div>
            <div className="absolute right-6 top-5 text-3xl" aria-hidden>☀️</div>
            <button className="absolute bottom-3 right-3 rounded-xl border-2 border-[#b85e10] bg-accent px-5 py-2 font-display text-3xl text-white transition hover:brightness-95" type="button" aria-label="Search for destinations">
              Search
            </button>
          </div>
        </div>

        <div className="mb-4 border-y border-[#c56f58] py-3">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h2 className="font-display text-[2.1rem] leading-tight">Popular Destinations</h2>
            <label className="text-xs font-semibold" htmlFor="scenario">State</label>
            <select
              id="scenario"
              className="rounded-md border border-ink bg-white px-2 py-1 text-xs"
              value={scenario}
              onChange={(e) => setScenario(e.target.value as DestinationFetchMode)}
              aria-label="Select state"
            >
              <option value="ok">Loaded</option>
              <option value="empty">Empty</option>
              <option value="error">Error</option>
            </select>
          </div>

          {uiState === "loading" && (
            <div className="grid grid-cols-3 gap-2" aria-live="polite" aria-label="Loading destinations">
              {[1, 2, 3].map((s) => (
                <div key={s} className="h-36 animate-pulse rounded-lg border-2 border-dashed border-ink/40 bg-blue-50" />
              ))}
            </div>
          )}

          {uiState === "error" && (
            <div className="rounded-lg border-2 border-red-400 bg-red-50 p-3 text-sm text-red-800" role="alert">
              Destinations failed to load. Switch state to Loaded to recover.
            </div>
          )}

          {uiState === "empty" && (
            <div className="rounded-lg border-2 border-ink/50 bg-white p-3 text-sm">
              No destinations available yet.
            </div>
          )}

          {hasCards && (
            <div className="grid grid-cols-3 gap-2">
              {items.map((item) => (
                <article key={item.id} className="rounded-lg border-2 border-ink bg-white p-1.5">
                  <div className="mb-1 h-16 rounded border border-ink bg-gradient-to-br from-sky-100 to-[#f8e8c6]" style={{ backgroundColor: item.accent }} aria-hidden />
                  <h3 className="font-display text-3xl leading-none">{item.name}</h3>
                  <p className="mt-1 text-xl font-bold text-money">{formatPrice(item.price)}</p>
                </article>
              ))}
            </div>
          )}
        </div>

        <nav aria-label="Bottom navigation" className="grid grid-cols-4 gap-2 border-t border-[#c56f58] pt-3">
          {TABS.map((item) => {
            const active = item === tab;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setTab(item)}
                className={`rounded-lg border px-2 py-1 text-sm font-semibold transition ${
                  active ? "border-accent bg-orange-100 text-ink" : "border-transparent hover:border-ink/30"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item}
              </button>
            );
          })}
        </nav>
      </section>
    </main>
  );
}
