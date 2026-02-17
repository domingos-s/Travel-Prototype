# Handoff

## What works
- Screenshot-inspired travel app prototype implemented in Next.js structure.
- Main layout includes hero panel, search CTA, destination cards, and bottom nav.
- Loading, empty, and error states are implemented and switchable.

## What is mocked
- Destination data in `lib/mock/destinations.ts`.
- Async fetch behavior in `lib/api/destinations.ts`.

## What to do next
- Install dependencies and run lint/build in a Node-enabled environment.
- Replace mock API with real endpoints.
- Add route-level navigation for Home/Search/Favorites/Profile.

## Known issues
- Runtime verification (`npm test`, `npm run lint`, `npm run build`) could not be executed here because `node` and `npm` are not available in this environment.
