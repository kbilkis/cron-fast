# Benchmark & Feature Comparison

> Tested with deno v2.6.8, cron-fast v2.2.0, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Tested with 1 second per test.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~478k       | baseline     |
| cron-schedule | ~405k       | 1.2x faster  |
| croner        | ~32k        | 15.1x faster |
| cron-parser   | ~34k        | 14.1x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~545k       | baseline     |
| cron-schedule | ~426k       | 1.3x faster  |
| croner        | ~32k        | 17.0x faster |
| cron-parser   | ~39k        | 13.8x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~775k       | baseline     |
| cron-validate | ~638k       | 1.2x faster  |
| cron-schedule | ~479k       | 1.6x faster  |
| cron-parser   | ~99k        | 7.9x faster  |
| croner        | ~34k        | 22.8x faster |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~776k       | baseline     |
| cron-validate | ~629k       | 1.2x faster  |
| cron-schedule | ~473k       | 1.6x faster  |
| cron-parser   | ~97k        | 8.0x faster  |
| croner        | ~34k        | 23.0x faster |

Run benchmarks yourself: `pnpm benchmark:deno`

## Detailed Per-Test Results

### Next Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |     ~355k |       ~149k ✓ | ~33k ✓ |      ~31k ✓ |
| Sparse: First of month      |     ~576k |         ~540k | ~33k ✓ |      ~18k ✓ |
| Sparse: 31st (skips months) |     ~517k |         ~542k | ~30k ✓ |       ~7k ✓ |
| Step: Every 15 minutes      |     ~444k |       ~275k ✓ | ~33k ✓ |      ~55k ✓ |
| Specific: 9 AM daily        |     ~521k |       ~375k ✓ | ~32k ✓ |      ~44k ✓ |
| OR-mode: 15th OR Monday     |     ~444k |       ~593k ✗ | ~30k ✓ |      ~37k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~488k |       ~358k ✓ | ~30k ✓ |      ~45k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |     ~394k |       ~190k ✓ | ~33k ✓ |      ~36k ✓ |
| Sparse: First of month      |     ~641k |       ~577k ✓ | ~31k ✓ |       ~9k ✓ |
| Sparse: 31st (skips months) |     ~524k |         ~519k | ~32k ✓ |       ~8k ✓ |
| Step: Every 15 minutes      |     ~441k |       ~278k ✓ | ~33k ✓ |      ~57k ✓ |
| Specific: 9 AM daily        |     ~541k |       ~382k ✓ | ~32k ✓ |      ~50k ✓ |
| OR-mode: 15th OR Monday     |     ~764k |       ~668k ✓ | ~32k ✓ |      ~66k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~511k |       ~372k ✓ | ~31k ✓ |      ~50k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |     ~440k |       ~202k ✓ |      ~46k ✓ | ~34k ✓ |       ~606k ✗ |
| 0 0 1 \* \*     |     ~977k |       ~630k ✓ |     ~128k ✓ | ~34k ✓ |       ~649k ✓ |
| 0 12 31 \* \*   |     ~897k |       ~627k ✓ |     ~127k ✓ | ~34k ✓ |       ~643k ✓ |
| _/15 _ \* \* \* |     ~546k |       ~291k ✓ |      ~69k ✓ | ~34k ✓ |       ~676k ✗ |
| 0 9 \* \* \*    |     ~725k |       ~403k ✓ |      ~89k ✓ | ~34k ✓ |       ~618k ✓ |
| 0 9 15 \* 1     |    ~1168k |       ~785k ✓ |     ~140k ✓ | ~33k ✓ |       ~655k ✓ |
| 0 9 \* \* 1-5   |     ~669k |       ~412k ✓ |      ~91k ✓ | ~34k ✓ |         ~620k |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |     ~437k |       ~201k ✓ |      ~46k ✓ | ~35k ✓ |       ~598k ✗ |
| 0 0 1 \* \*     |     ~982k |       ~631k ✓ |     ~126k ✓ | ~33k ✓ |       ~649k ✓ |
| 0 12 31 \* \*   |     ~895k |       ~633k ✓ |     ~127k ✓ | ~34k ✓ |       ~636k ✓ |
| _/15 _ \* \* \* |     ~550k |       ~294k ✓ |      ~68k ✓ | ~33k ✓ |       ~678k ✗ |
| 0 9 \* \* \*    |     ~748k |       ~367k ✓ |      ~88k ✓ | ~35k ✓ |       ~615k ✓ |
| 0 9 15 \* 1     |    ~1175k |       ~793k ✓ |     ~140k ✓ | ~34k ✓ |       ~625k ✓ |
| 0 9 \* \* 1-5   |     ~642k |       ~395k ✓ |      ~84k ✓ | ~32k ✓ |         ~598k |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)
