# Benchmark & Feature Comparison

> Tested with node v22.18.0, cron-fast v2.0.1, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Tested with 1 second per test.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~367k       | baseline     |
| cron-schedule | ~375k       | 1.0x slower  |
| croner        | ~30k        | 12.2x faster |
| cron-parser   | ~33k        | 11.1x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~409k       | baseline     |
| cron-schedule | ~386k       | 1.1x faster  |
| croner        | ~31k        | 13.4x faster |
| cron-parser   | ~37k        | 11.0x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~555k       | baseline     |
| cron-validate | ~664k       | 1.2x slower  |
| cron-schedule | ~436k       | 1.3x faster  |
| cron-parser   | ~94k        | 5.9x faster  |
| croner        | ~32k        | 17.2x faster |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~543k       | baseline     |
| cron-validate | ~659k       | 1.2x slower  |
| cron-schedule | ~446k       | 1.2x faster  |
| cron-parser   | ~92k        | 5.9x faster  |
| croner        | ~32k        | 17.2x faster |

**Note**: cron-validate is validation-only (no scheduling), which explains its speed advantage in parsing/validation. It only checks syntax without calculating dates or handling timezones, making it significantly faster for validation-only use cases.

Run benchmarks yourself: `pnpm benchmark`

## Detailed Per-Test Results

### Next Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |     ~210k |       ~172k ✓ | ~30k ✓ |      ~30k ✓ |
| Sparse: First of month      |     ~463k |         ~482k | ~29k ✓ |      ~18k ✓ |
| Sparse: 31st (skips months) |     ~461k |         ~509k | ~28k ✓ |       ~7k ✓ |
| Step: Every 15 minutes      |     ~284k |         ~262k | ~33k ✓ |      ~55k ✓ |
| Specific: 9 AM daily        |     ~378k |       ~343k ✓ | ~33k ✓ |      ~43k ✓ |
| OR-mode: 15th OR Monday     |     ~402k |       ~536k ✗ | ~29k ✓ |      ~36k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~369k |       ~321k ✓ | ~29k ✓ |      ~43k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |     ~216k |       ~175k ✓ | ~31k ✓ |      ~34k ✓ |
| Sparse: First of month      |     ~522k |         ~519k | ~30k ✓ |       ~8k ✓ |
| Sparse: 31st (skips months) |     ~448k |         ~470k | ~30k ✓ |       ~8k ✓ |
| Step: Every 15 minutes      |     ~286k |         ~260k | ~32k ✓ |      ~55k ✓ |
| Specific: 9 AM daily        |     ~356k |         ~347k | ~31k ✓ |      ~48k ✓ |
| OR-mode: 15th OR Monday     |     ~663k |       ~592k ✓ | ~30k ✓ |      ~59k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~371k |         ~339k | ~30k ✓ |      ~48k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |     ~233k |       ~190k ✓ |      ~45k ✓ | ~33k ✓ |       ~648k ✗ |
| 0 0 1 \* \*     |     ~759k |       ~588k ✓ |     ~124k ✓ | ~33k ✓ |       ~674k ✓ |
| 0 12 31 \* \*   |     ~689k |       ~582k ✓ |     ~124k ✓ | ~33k ✓ |         ~659k |
| _/15 _ \* \* \* |     ~316k |       ~265k ✓ |      ~65k ✓ | ~32k ✓ |       ~700k ✗ |
| 0 9 \* \* \*    |     ~461k |       ~369k ✓ |      ~84k ✓ | ~32k ✓ |       ~635k ✗ |
| 0 9 15 \* 1     |     ~979k |       ~690k ✓ |     ~131k ✓ | ~32k ✓ |       ~686k ✓ |
| 0 9 \* \* 1-5   |     ~445k |       ~368k ✓ |      ~84k ✓ | ~30k ✓ |       ~649k ✗ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |     ~223k |       ~184k ✓ |      ~45k ✓ | ~32k ✓ |       ~606k ✗ |
| 0 0 1 \* \*     |     ~721k |       ~586k ✓ |     ~119k ✓ | ~32k ✓ |         ~673k |
| 0 12 31 \* \*   |     ~668k |       ~592k ✓ |     ~118k ✓ | ~31k ✓ |         ~655k |
| _/15 _ \* \* \* |     ~319k |       ~271k ✓ |      ~65k ✓ | ~32k ✓ |       ~708k ✗ |
| 0 9 \* \* \*    |     ~458k |       ~372k ✓ |      ~83k ✓ | ~32k ✓ |       ~639k ✗ |
| 0 9 15 \* 1     |     ~966k |       ~748k ✓ |     ~126k ✓ | ~31k ✓ |       ~694k ✓ |
| 0 9 \* \* 1-5   |     ~448k |       ~371k ✓ |      ~86k ✓ | ~31k ✓ |       ~637k ✗ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)
