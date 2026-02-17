# Benchmark & Feature Comparison

> Tested with bun v1.3.9, cron-fast v2.0.1, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Tested with 1 second per test.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~275k       | baseline     |
| cron-schedule | ~296k       | 1.1x slower  |
| croner        | ~47k        | 5.8x faster  |
| cron-parser   | ~34k        | 8.0x faster  |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~313k       | baseline     |
| cron-schedule | ~323k       | 1.0x slower  |
| croner        | ~56k        | 5.5x faster  |
| cron-parser   | ~40k        | 7.8x faster  |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~360k       | baseline     |
| cron-validate | ~952k       | 2.6x slower  |
| cron-schedule | ~357k       | 1.0x faster  |
| cron-parser   | ~120k       | 3.0x faster  |
| croner        | ~60k        | 6.0x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~361k       | baseline     |
| cron-validate | ~925k       | 2.6x slower  |
| cron-schedule | ~341k       | 1.1x faster  |
| cron-parser   | ~118k       | 3.1x faster  |
| croner        | ~58k        | 6.3x faster  |

**Note**: cron-validate is validation-only (no scheduling), which explains its speed advantage in parsing/validation. It only checks syntax without calculating dates or handling timezones, making it significantly faster for validation-only use cases.

Run benchmarks yourself: `pnpm benchmark:bun`

## Detailed Per-Test Results

### Next Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |     ~193k |       ~142k ✓ | ~52k ✓ |      ~35k ✓ |
| Sparse: First of month      |     ~351k |       ~391k ✗ | ~52k ✓ |      ~21k ✓ |
| Sparse: 31st (skips months) |     ~340k |       ~385k ✗ | ~31k ✓ |       ~7k ✓ |
| Step: Every 15 minutes      |     ~196k |         ~189k | ~51k ✓ |      ~56k ✓ |
| Specific: 9 AM daily        |     ~261k |         ~263k | ~52k ✓ |      ~42k ✓ |
| OR-mode: 15th OR Monday     |     ~343k |       ~445k ✗ | ~46k ✓ |      ~37k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~238k |         ~256k | ~44k ✓ |      ~42k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |     ~160k |         ~155k | ~54k ✓ |      ~37k ✓ |
| Sparse: First of month      |     ~393k |         ~423k | ~57k ✓ |      ~11k ✓ |
| Sparse: 31st (skips months) |     ~380k |         ~409k | ~57k ✓ |      ~11k ✓ |
| Step: Every 15 minutes      |     ~186k |       ~217k ✗ | ~58k ✓ |      ~61k ✓ |
| Specific: 9 AM daily        |     ~287k |         ~290k | ~59k ✓ |      ~49k ✓ |
| OR-mode: 15th OR Monday     |     ~500k |         ~489k | ~58k ✓ |      ~62k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~283k |         ~278k | ~53k ✓ |      ~51k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |     ~148k |       ~165k ✗ |      ~52k ✓ | ~61k ✓ |       ~943k ✗ |
| 0 0 1 \* \*     |     ~512k |         ~470k |     ~159k ✓ | ~61k ✓ |       ~981k ✗ |
| 0 12 31 \* \*   |     ~467k |         ~461k |     ~155k ✓ | ~56k ✓ |       ~931k ✗ |
| _/15 _ \* \* \* |     ~207k |         ~228k |      ~85k ✓ | ~60k ✓ |       ~967k ✗ |
| 0 9 \* \* \*    |     ~315k |         ~305k |     ~109k ✓ | ~62k ✓ |       ~950k ✗ |
| 0 9 15 \* 1     |     ~610k |         ~571k |     ~177k ✓ | ~61k ✓ |       ~936k ✗ |
| 0 9 \* \* 1-5   |     ~259k |       ~297k ✗ |     ~106k ✓ | ~57k ✓ |       ~955k ✗ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |     ~195k |       ~164k ✓ |      ~52k ✓ | ~63k ✓ |       ~945k ✗ |
| 0 0 1 \* \*     |     ~490k |         ~461k |     ~160k ✓ | ~62k ✓ |       ~966k ✗ |
| 0 12 31 \* \*   |     ~474k |       ~429k ✓ |     ~156k ✓ | ~60k ✓ |       ~901k ✗ |
| _/15 _ \* \* \* |     ~221k |         ~207k |      ~81k ✓ | ~54k ✓ |       ~945k ✗ |
| 0 9 \* \* \*    |     ~304k |         ~287k |     ~104k ✓ | ~56k ✓ |       ~896k ✗ |
| 0 9 15 \* 1     |     ~570k |         ~543k |     ~166k ✓ | ~54k ✓ |       ~901k ✗ |
| 0 9 \* \* 1-5   |     ~275k |         ~295k |     ~107k ✓ | ~54k ✓ |       ~920k ✗ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)
