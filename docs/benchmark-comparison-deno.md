# Benchmark & Feature Comparison

> Tested with deno v2.6.8, cron-fast v2.1.0, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Tested with 1 second per test.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~384k       | baseline     |
| cron-schedule | ~341k       | 1.1x faster  |
| croner        | ~29k        | 13.1x faster |
| cron-parser   | ~23k        | 17.0x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~423k       | baseline     |
| cron-schedule | ~350k       | 1.2x faster  |
| croner        | ~30k        | 14.0x faster |
| cron-parser   | ~26k        | 16.5x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~612k       | baseline     |
| cron-validate | ~506k       | 1.2x faster  |
| cron-schedule | ~395k       | 1.5x faster  |
| cron-parser   | ~63k        | 9.8x faster  |
| croner        | ~33k        | 18.6x faster |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~611k       | baseline     |
| cron-validate | ~506k       | 1.2x faster  |
| cron-schedule | ~396k       | 1.5x faster  |
| cron-parser   | ~62k        | 9.8x faster  |
| croner        | ~33k        | 18.6x faster |

Run benchmarks yourself: `pnpm benchmark:deno`

## Detailed Per-Test Results

### Next Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |     ~333k |       ~126k ✓ | ~29k ✓ |      ~20k ✓ |
| Sparse: First of month      |     ~434k |         ~445k | ~29k ✓ |      ~13k ✓ |
| Sparse: 31st (skips months) |     ~420k |         ~448k | ~28k ✓ |       ~5k ✓ |
| Step: Every 15 minutes      |     ~352k |       ~250k ✓ | ~30k ✓ |      ~35k ✓ |
| Specific: 9 AM daily        |     ~421k |       ~325k ✓ | ~31k ✓ |      ~29k ✓ |
| OR-mode: 15th OR Monday     |     ~333k |       ~487k ✗ | ~29k ✓ |      ~26k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~394k |       ~306k ✓ | ~28k ✓ |      ~30k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |     ~343k |       ~179k ✓ | ~30k ✓ |      ~23k ✓ |
| Sparse: First of month      |     ~475k |         ~452k | ~30k ✓ |       ~6k ✓ |
| Sparse: 31st (skips months) |     ~410k |         ~408k | ~30k ✓ |       ~6k ✓ |
| Step: Every 15 minutes      |     ~346k |       ~243k ✓ | ~31k ✓ |      ~34k ✓ |
| Specific: 9 AM daily        |     ~413k |       ~332k ✓ | ~31k ✓ |      ~33k ✓ |
| OR-mode: 15th OR Monday     |     ~571k |       ~517k ✓ | ~31k ✓ |      ~44k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~404k |       ~321k ✓ | ~29k ✓ |      ~34k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |     ~371k |       ~189k ✓ |      ~28k ✓ | ~33k ✓ |       ~484k ✗ |
| 0 0 1 \* \*     |     ~738k |       ~498k ✓ |      ~82k ✓ | ~33k ✓ |       ~513k ✓ |
| 0 12 31 \* \*   |     ~688k |       ~510k ✓ |      ~82k ✓ | ~33k ✓ |       ~515k ✓ |
| _/15 _ \* \* \* |     ~474k |       ~266k ✓ |      ~42k ✓ | ~33k ✓ |         ~523k |
| 0 9 \* \* \*    |     ~602k |       ~355k ✓ |      ~55k ✓ | ~33k ✓ |       ~500k ✓ |
| 0 9 15 \* 1     |     ~865k |       ~602k ✓ |      ~93k ✓ | ~33k ✓ |       ~522k ✓ |
| 0 9 \* \* 1-5   |     ~546k |       ~348k ✓ |      ~57k ✓ | ~32k ✓ |       ~488k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |     ~387k |       ~188k ✓ |      ~28k ✓ | ~33k ✓ |       ~480k ✗ |
| 0 0 1 \* \*     |     ~710k |       ~508k ✓ |      ~81k ✓ | ~33k ✓ |       ~515k ✓ |
| 0 12 31 \* \*   |     ~682k |       ~510k ✓ |      ~81k ✓ | ~32k ✓ |       ~510k ✓ |
| _/15 _ \* \* \* |     ~475k |       ~267k ✓ |      ~42k ✓ | ~33k ✓ |         ~526k |
| 0 9 \* \* \*    |     ~598k |       ~353k ✓ |      ~55k ✓ | ~33k ✓ |       ~501k ✓ |
| 0 9 15 \* 1     |     ~876k |       ~601k ✓ |      ~93k ✓ | ~33k ✓ |       ~524k ✓ |
| 0 9 \* \* 1-5   |     ~548k |       ~343k ✓ |      ~56k ✓ | ~32k ✓ |       ~490k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)
