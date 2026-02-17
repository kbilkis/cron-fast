# Benchmark & Feature Comparison

> Tested with deno v2.6.8, cron-fast v2.0.1, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Tested with 1 second per test.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~362k       | baseline     |
| cron-schedule | ~399k       | 1.1x slower  |
| croner        | ~31k        | 11.7x faster |
| cron-parser   | ~33k        | 10.8x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~412k       | baseline     |
| cron-schedule | ~419k       | 1.0x slower  |
| croner        | ~31k        | 13.3x faster |
| cron-parser   | ~39k        | 10.6x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~550k       | baseline     |
| cron-validate | ~635k       | 1.2x slower  |
| cron-schedule | ~478k       | 1.2x faster  |
| cron-parser   | ~98k        | 5.6x faster  |
| croner        | ~34k        | 16.4x faster |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~549k       | baseline     |
| cron-validate | ~628k       | 1.1x slower  |
| cron-schedule | ~472k       | 1.2x faster  |
| cron-parser   | ~97k        | 5.7x faster  |
| croner        | ~34k        | 16.4x faster |

**Note**: cron-validate is validation-only (no scheduling), which explains its speed advantage in parsing/validation. It only checks syntax without calculating dates or handling timezones, making it significantly faster for validation-only use cases.

Run benchmarks yourself: `pnpm benchmark:deno`

## Detailed Per-Test Results

### Next Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |     ~217k |       ~145k ✓ | ~32k ✓ |      ~31k ✓ |
| Sparse: First of month      |     ~459k |       ~522k ✗ | ~31k ✓ |      ~18k ✓ |
| Sparse: 31st (skips months) |     ~434k |       ~539k ✗ | ~30k ✓ |       ~7k ✓ |
| Step: Every 15 minutes      |     ~289k |         ~277k | ~33k ✓ |      ~56k ✓ |
| Specific: 9 AM daily        |     ~366k |         ~361k | ~33k ✓ |      ~42k ✓ |
| OR-mode: 15th OR Monday     |     ~403k |       ~590k ✗ | ~29k ✓ |      ~37k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~368k |         ~355k | ~28k ✓ |      ~44k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |     ~221k |       ~187k ✓ | ~31k ✓ |      ~35k ✓ |
| Sparse: First of month      |     ~513k |         ~562k | ~31k ✓ |       ~9k ✓ |
| Sparse: 31st (skips months) |     ~438k |       ~510k ✗ | ~31k ✓ |       ~8k ✓ |
| Step: Every 15 minutes      |     ~288k |         ~271k | ~32k ✓ |      ~57k ✓ |
| Specific: 9 AM daily        |     ~379k |         ~381k | ~31k ✓ |      ~50k ✓ |
| OR-mode: 15th OR Monday     |     ~664k |         ~656k | ~31k ✓ |      ~63k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~382k |         ~366k | ~30k ✓ |      ~49k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |     ~237k |       ~197k ✓ |      ~45k ✓ | ~34k ✓ |       ~600k ✗ |
| 0 0 1 \* \*     |     ~717k |       ~633k ✓ |     ~126k ✓ | ~34k ✓ |       ~642k ✓ |
| 0 12 31 \* \*   |     ~671k |         ~628k |     ~126k ✓ | ~34k ✓ |         ~641k |
| _/15 _ \* \* \* |     ~336k |       ~290k ✓ |      ~68k ✓ | ~34k ✓ |       ~678k ✗ |
| 0 9 \* \* \*    |     ~474k |       ~407k ✓ |      ~88k ✓ | ~34k ✓ |       ~616k ✗ |
| 0 9 15 \* 1     |     ~956k |       ~780k ✓ |     ~140k ✓ | ~32k ✓ |       ~654k ✓ |
| 0 9 \* \* 1-5   |     ~460k |       ~410k ✓ |      ~90k ✓ | ~32k ✓ |       ~616k ✗ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |     ~236k |       ~200k ✓ |      ~46k ✓ | ~34k ✓ |       ~598k ✗ |
| 0 0 1 \* \*     |     ~723k |       ~626k ✓ |     ~127k ✓ | ~34k ✓ |       ~642k ✓ |
| 0 12 31 \* \*   |     ~664k |         ~614k |     ~122k ✓ | ~33k ✓ |         ~628k |
| _/15 _ \* \* \* |     ~328k |       ~288k ✓ |      ~68k ✓ | ~34k ✓ |       ~655k ✗ |
| 0 9 \* \* \*    |     ~470k |       ~407k ✓ |      ~88k ✓ | ~34k ✓ |       ~615k ✗ |
| 0 9 15 \* 1     |     ~968k |       ~761k ✓ |     ~138k ✓ | ~32k ✓ |       ~651k ✓ |
| 0 9 \* \* 1-5   |     ~457k |       ~405k ✓ |      ~88k ✓ | ~33k ✓ |       ~609k ✗ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)
