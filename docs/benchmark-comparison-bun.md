# Benchmark

> Tested with bun v1.3.14, cron-fast v3.1.2, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by mitata.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~688k       | baseline     |
| croner        | ~59k        | 11.6x faster |
| cron-parser   | ~37k        | 18.5x faster |
| cron-schedule | ~315k       | 2.2x faster  |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~933k       | baseline     |
| croner        | ~60k        | 15.5x faster |
| cron-parser   | ~39k        | 23.9x faster |
| cron-schedule | ~317k       | 2.9x faster  |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1463k      | baseline     |
| cron-validate | ~863k       | 1.7x faster  |
| cron-schedule | ~347k       | 4.2x faster  |
| cron-parser   | ~121k       | 12.1x faster |
| croner        | ~64k        | 22.8x faster |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1416k      | baseline     |
| cron-validate | ~898k       | 1.6x faster  |
| cron-schedule | ~352k       | 4.0x faster  |
| cron-parser   | ~124k       | 11.4x faster |
| croner        | ~65k        | 21.9x faster |

Run benchmarks yourself: `pnpm bench:bun`

## Detailed Per-Test Results

### Next Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |     ~958k |       ~144k ✓ | ~61k ✓ |      ~35k ✓ |
| Sparse: First of month      |     ~671k |       ~415k ✓ | ~61k ✓ |      ~21k ✓ |
| Sparse: 31st (skips months) |     ~585k |       ~417k ✓ | ~59k ✓ |       ~9k ✓ |
| Step: Every 15 minutes      |     ~657k |       ~209k ✓ | ~62k ✓ |      ~64k ✓ |
| Specific: 9 AM daily        |     ~673k |       ~282k ✓ | ~64k ✓ |      ~47k ✓ |
| OR-mode: 15th OR Monday     |     ~526k |       ~476k ✓ | ~54k ✓ |      ~41k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~742k |       ~262k ✓ | ~53k ✓ |      ~45k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |     ~993k |       ~148k ✓ | ~62k ✓ |      ~38k ✓ |
| Sparse: First of month      |    ~1125k |       ~426k ✓ | ~60k ✓ |      ~10k ✓ |
| Sparse: 31st (skips months) |     ~927k |       ~422k ✓ | ~62k ✓ |      ~10k ✓ |
| Step: Every 15 minutes      |     ~673k |       ~208k ✓ | ~63k ✓ |      ~61k ✓ |
| Specific: 9 AM daily        |     ~984k |       ~281k ✓ | ~60k ✓ |      ~46k ✓ |
| OR-mode: 15th OR Monday     |    ~1113k |       ~479k ✓ | ~62k ✓ |      ~59k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~720k |       ~259k ✓ | ~53k ✓ |      ~49k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~1348k |       ~155k ✓ |      ~51k ✓ | ~66k ✓ |       ~729k ✓ |
| 0 0 1 \* \*     |    ~1924k |       ~463k ✓ |     ~158k ✓ | ~66k ✓ |       ~924k ✓ |
| 0 12 31 \* \*   |    ~1855k |       ~455k ✓ |     ~157k ✓ | ~65k ✓ |       ~819k ✓ |
| _/15 _ \* \* \* |     ~959k |       ~213k ✓ |      ~87k ✓ | ~65k ✓ |         ~945k |
| 0 9 \* \* \*    |    ~1629k |       ~292k ✓ |     ~107k ✓ | ~64k ✓ |       ~882k ✓ |
| 0 9 15 \* 1     |    ~1576k |       ~563k ✓ |     ~173k ✓ | ~62k ✓ |       ~844k ✓ |
| 0 9 \* \* 1-5   |     ~954k |       ~287k ✓ |     ~111k ✓ | ~64k ✓ |         ~900k |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~1356k |       ~156k ✓ |      ~53k ✓ | ~67k ✓ |       ~908k ✓ |
| 0 0 1 \* \*     |    ~1684k |       ~465k ✓ |     ~166k ✓ | ~66k ✓ |       ~939k ✓ |
| 0 12 31 \* \*   |    ~1874k |       ~457k ✓ |     ~160k ✓ | ~63k ✓ |       ~839k ✓ |
| _/15 _ \* \* \* |     ~811k |       ~220k ✓ |      ~88k ✓ | ~63k ✓ |       ~964k ✗ |
| 0 9 \* \* \*    |    ~1609k |       ~300k ✓ |     ~111k ✓ | ~66k ✓ |       ~896k ✓ |
| 0 9 15 \* 1     |    ~1592k |       ~573k ✓ |     ~177k ✓ | ~65k ✓ |       ~843k ✓ |
| 0 9 \* \* 1-5   |     ~986k |       ~294k ✓ |     ~113k ✓ | ~64k ✓ |       ~896k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)
