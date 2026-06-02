# Bathroom Pass

Bathroom Pass is a classroom bathroom sign-out/sign-in command center. It now has two launch modes:

- `npm run dev` starts the normal live workspace with no sample students and no no-hardware presentation tools.
- `npm run demo` starts the demo workspace with a virtual reader, sample cards, synthetic scenarios, and a guided walkthrough.

## Install

```bash
npm install
```

## Run live mode

```bash
npm run dev
```

Use live mode for regular bathroom sign-out/sign-in tracking. It starts with an empty session board, keeps sample students hidden, and lets you use manual ID entry until a roster or physical reader is connected.

## Run demo mode

```bash
npm run demo
```

Use demo mode when you do not have badge, Bluetooth, NFC, or scanner hardware. Demo mode unlocks the virtual reader, sample roster buttons, timer jumping, reset controls, and Demo Lab scenarios.

## How to use live mode

1. Run `npm run dev`.
2. Open the Dashboard.
3. Use **Sign out / sign in by ID** and type a student ID.
4. The student appears under **Currently Out** with a live timer.
5. Type the same ID again when the student returns.
6. Review **Recent History** for the completed bathroom pass.

## How to demo without hardware

1. Run `npm run demo`.
2. Click **Connect virtual reader**.
3. Click a sample card such as Avery Johnson / `STU-1001`.
4. Point to **Currently Out**, the live timer, and the top metric cards.
5. Click **Jump timers +5m** twice to show the long-pass alert state.
6. Click the same sample card again to complete the pass and show the audit row.
7. Open **Demo Lab**, run an **unknown-card** scenario, and show how the app handles an invalid card safely.
8. Open **Students** to show that sample names only appear in demo mode.
9. Open **Settings** to show thresholds, mode separation, and integration notes.

## Demo IDs

These IDs only appear when you run `npm run demo`:

- `STU-1001` Avery Johnson
- `STU-1002` Mia Chen
- `STU-1003` Noah Patel
- `STU-1004` Sophia Garcia
- `STU-1005` Liam Brooks
- `STU-1006` Olivia Smith
- `STU-1007` Ethan Davis
- `STU-1008` Isabella Lee

## Production notes

The scanner flow is centralized around one student-ID handler. Manual entry, demo cards, demo scenarios, and future physical readers can all call the same path. Live mode intentionally avoids sample data so your regular workflow is focused on real bathroom sign-out/sign-in activity.

## Checks

```bash
npm run build
npm run build:demo
npm run lint
npm run typecheck
```
