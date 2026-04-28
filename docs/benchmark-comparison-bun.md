# Benchmark

> Tested with bun v1.3.9, cron-fast v3.1.2, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Tested with 1 second per test.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~636k       | baseline     |
| cron-schedule | ~298k       | 2.1x faster  |
| croner        | ~51k        | 12.5x faster |
| cron-parser   | ~35k        | 18.0x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~588k       | baseline     |
| cron-schedule | ~302k       | 1.9x faster  |
| croner        | ~52k        | 11.3x faster |
| cron-parser   | ~38k        | 15.3x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~736k       | baseline     |
| cron-validate | ~923k       | 1.3x slower  |
| cron-schedule | ~336k       | 2.2x faster  |
| cron-parser   | ~114k       | 6.5x faster  |
| croner        | ~55k        | 13.4x faster |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~841k       | baseline     |
| cron-validate | ~875k       | 1.0x slower  |
| cron-schedule | ~331k       | 2.5x faster  |
| cron-parser   | ~113k       | 7.4x faster  |
| croner        | ~53k        | 15.7x faster |

Run benchmarks yourself: `pnpm benchmark:bun`

## Detailed Per-Test Results

### Next Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |    ~1168k |       ~149k ✓ | ~52k ✓ |      ~35k ✓ |
| Sparse: First of month      |     ~595k |       ~399k ✓ | ~50k ✓ |      ~21k ✓ |
| Sparse: 31st (skips months) |     ~533k |       ~390k ✓ | ~49k ✓ |       ~7k ✓ |
| Step: Every 15 minutes      |     ~511k |       ~203k ✓ | ~54k ✓ |      ~61k ✓ |
| Specific: 9 AM daily        |     ~722k |       ~243k ✓ | ~55k ✓ |      ~41k ✓ |
| OR-mode: 15th OR Monday     |     ~450k |         ~454k | ~50k ✓ |      ~39k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~474k |       ~246k ✓ | ~45k ✓ |      ~42k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |     ~495k |       ~145k ✓ | ~53k ✓ |      ~36k ✓ |
| Sparse: First of month      |     ~724k |       ~412k ✓ | ~52k ✓ |      ~10k ✓ |
| Sparse: 31st (skips months) |     ~541k |       ~398k ✓ | ~52k ✓ |      ~10k ✓ |
| Step: Every 15 minutes      |     ~534k |       ~205k ✓ | ~55k ✓ |      ~62k ✓ |
| Specific: 9 AM daily        |     ~631k |       ~251k ✓ | ~52k ✓ |      ~45k ✓ |
| OR-mode: 15th OR Monday     |     ~658k |       ~451k ✓ | ~53k ✓ |      ~57k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~529k |       ~254k ✓ | ~46k ✓ |      ~48k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |     ~384k |       ~154k ✓ |      ~52k ✓ | ~58k ✓ |       ~915k ✗ |
| 0 0 1 \* \*     |     ~961k |       ~441k ✓ |     ~148k ✓ | ~53k ✓ |         ~927k |
| 0 12 31 \* \*   |     ~958k |       ~446k ✓ |     ~152k ✓ | ~55k ✓ |         ~898k |
| _/15 _ \* \* \* |     ~571k |       ~209k ✓ |      ~77k ✓ | ~55k ✓ |       ~963k ✗ |
| 0 9 \* \* \*    |     ~818k |       ~288k ✓ |     ~105k ✓ | ~56k ✓ |       ~919k ✗ |
| 0 9 15 \* 1     |     ~935k |       ~536k ✓ |     ~155k ✓ | ~52k ✓ |         ~915k |
| 0 9 \* \* 1-5   |     ~522k |       ~277k ✓ |     ~107k ✓ | ~55k ✓ |       ~926k ✗ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~1087k |       ~157k ✓ |      ~52k ✓ | ~57k ✓ |       ~914k ✓ |
| 0 0 1 \* \*     |     ~960k |       ~434k ✓ |     ~155k ✓ | ~57k ✓ |         ~948k |
| 0 12 31 \* \*   |     ~932k |       ~434k ✓ |     ~154k ✓ | ~55k ✓ |       ~831k ✓ |
| _/15 _ \* \* \* |     ~639k |       ~202k ✓ |      ~80k ✓ | ~56k ✓ |       ~929k ✗ |
| 0 9 \* \* \*    |     ~804k |       ~280k ✓ |     ~101k ✓ | ~55k ✓ |         ~885k |
| 0 9 15 \* 1     |     ~879k |       ~531k ✓ |     ~156k ✓ | ~56k ✓ |       ~699k ✓ |
| 0 9 \* \* 1-5   |     ~582k |       ~281k ✓ |      ~94k ✓ | ~39k ✓ |       ~920k ✗ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)
