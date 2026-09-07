# Benchmark

> Tested with deno v2.9.6, cron-fast v3.11.0, croner v10.0.1, cron-parser v5.10.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by Deno.bench().

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2700k      | baseline     |
| cron-schedule | ~399k       | 6.8x faster  |
| cron-parser   | ~35k        | 77.8x faster |
| croner        | ~31k        | 88.4x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~41k        | baseline     |
| cron-schedule | ~18k        | 2.3x faster  |
| cron-parser   | ~1k         | 44.6x faster |
| croner        | ~2k         | 18.8x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2678k      | baseline     |
| cron-schedule | ~431k       | 6.2x faster  |
| cron-parser   | ~41k        | 65.8x faster |
| croner        | ~31k        | 85.9x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~11206k     | baseline      |
| cron-schedule | ~559k       | 20.0x faster  |
| cron-parser   | ~105k       | 106.5x faster |
| croner        | ~34k        | 329.9x faster |
| cron-validate | ~1656k      | 6.8x faster   |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~9654k      | baseline      |
| cron-schedule | ~660k       | 14.6x faster  |
| cron-parser   | ~130k       | 74.0x faster  |
| croner        | ~34k        | 280.7x faster |
| cron-validate | ~1383k      | 7.0x faster   |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~11187k     | baseline      |
| cron-schedule | ~557k       | 20.1x faster  |
| cron-parser   | ~106k       | 106.0x faster |
| croner        | ~33k        | 334.1x faster |
| cron-validate | ~1626k      | 6.9x faster   |

Run benchmarks yourself: `pnpm bench:deno`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~4467k |       ~158k ✓ |      ~32k ✓ | ~31k ✓ |
| 0 0 1 * *    |    ~2611k |       ~559k ✓ |      ~19k ✓ | ~30k ✓ |
| 0 12 31 * *  |    ~2378k |       ~552k ✓ |       ~8k ✓ | ~31k ✓ |
| */15 * * * * |    ~2755k |       ~294k ✓ |      ~55k ✓ | ~31k ✓ |
| 0 9 * * *    |    ~2754k |       ~384k ✓ |      ~46k ✓ | ~32k ✓ |
| 0 9 15 * 1   |    ~1682k |       ~513k ✓ |      ~38k ✓ | ~30k ✓ |
| 0 9 * * 1-5  |    ~2256k |       ~335k ✓ |      ~46k ✓ | ~29k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 224 ns / 237 ns | 6,331 ns / 7,234 ns |   31,476 ns / 65,708 ns | 32,281 ns / 88,416 ns |
| 0 0 1 * *    | 383 ns / 409 ns | 1,788 ns / 1,975 ns |   53,261 ns / 84,375 ns | 33,644 ns / 71,958 ns |
| 0 12 31 * *  | 421 ns / 458 ns | 1,810 ns / 1,863 ns | 132,513 ns / 239,375 ns | 32,697 ns / 40,834 ns |
| */15 * * * * | 363 ns / 379 ns | 3,404 ns / 3,575 ns |   18,347 ns / 25,417 ns | 31,758 ns / 46,084 ns |
| 0 9 * * *    | 363 ns / 382 ns | 2,605 ns / 2,654 ns |   21,879 ns / 28,625 ns | 30,975 ns / 39,083 ns |
| 0 9 15 * 1   | 595 ns / 634 ns | 1,950 ns / 2,083 ns |   26,159 ns / 42,208 ns | 33,495 ns / 47,916 ns |
| 0 9 * * 1-5  | 443 ns / 483 ns | 2,989 ns / 3,056 ns |   21,608 ns / 30,625 ns | 34,654 ns / 61,250 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   | cron-fast | cron-schedule | cron-parser | croner |
| ----------- | --------: | ------------: | ----------: | -----: |
| * * * * *   |      ~57k |        ~24k ✓ |       ~1k ✓ |  ~3k ✓ |
| 0 9 * * 1-5 |      ~26k |        ~12k ✓ |       ~0k ✓ |  ~1k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |             cron-fast |         cron-schedule |                 cron-parser |                      croner |
| ----------- | --------------------: | --------------------: | --------------------------: | --------------------------: |
| * * * * *   | 17,674 ns / 19,625 ns | 40,842 ns / 72,500 ns |     723,358 ns / 879,875 ns |     286,991 ns / 382,750 ns |
| 0 9 * * 1-5 | 37,874 ns / 42,083 ns | 83,289 ns / 98,625 ns | 2,097,939 ns / 2,421,958 ns | 1,064,637 ns / 1,197,334 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~3944k |       ~193k ✓ |      ~36k ✓ | ~32k ✓ |
| 0 0 1 * *    |    ~2610k |       ~614k ✓ |       ~9k ✓ | ~31k ✓ |
| 0 12 31 * *  |    ~2349k |       ~516k ✓ |       ~8k ✓ | ~30k ✓ |
| */15 * * * * |    ~2565k |       ~292k ✓ |      ~58k ✓ | ~32k ✓ |
| 0 9 * * *    |    ~2629k |       ~398k ✓ |      ~51k ✓ | ~30k ✓ |
| 0 9 15 * 1   |    ~2412k |       ~629k ✓ |      ~70k ✓ | ~31k ✓ |
| 0 9 * * 1-5  |    ~2233k |       ~374k ✓ |      ~53k ✓ | ~31k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 254 ns / 276 ns | 5,175 ns / 5,820 ns |   27,635 ns / 37,917 ns | 30,868 ns / 41,459 ns |
| 0 0 1 * *    | 383 ns / 426 ns | 1,628 ns / 1,768 ns | 111,898 ns / 210,916 ns | 31,833 ns / 43,084 ns |
| 0 12 31 * *  | 426 ns / 442 ns | 1,937 ns / 2,009 ns | 122,154 ns / 239,875 ns | 32,879 ns / 48,167 ns |
| */15 * * * * | 390 ns / 454 ns | 3,419 ns / 3,533 ns |   17,196 ns / 21,000 ns | 31,078 ns / 42,708 ns |
| 0 9 * * *    | 380 ns / 412 ns | 2,514 ns / 2,614 ns |   19,716 ns / 28,292 ns | 33,181 ns / 57,875 ns |
| 0 9 15 * 1   | 415 ns / 437 ns | 1,589 ns / 1,641 ns |   14,308 ns / 17,500 ns | 32,147 ns / 48,250 ns |
| 0 9 * * 1-5  | 448 ns / 462 ns | 2,671 ns / 2,771 ns |   18,893 ns / 24,333 ns | 32,768 ns / 41,084 ns |

### Validation - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~16904k |       ~215k ✓ |      ~46k ✓ | ~35k ✓ |      ~1649k ✓ |
| 0 0 1 * *    |   ~11802k |       ~781k ✓ |     ~137k ✓ | ~34k ✓ |      ~1711k ✓ |
| 0 12 31 * *  |    ~9583k |       ~755k ✓ |     ~136k ✓ | ~34k ✓ |      ~1724k ✓ |
| */15 * * * * |   ~10864k |       ~329k ✓ |      ~70k ✓ | ~34k ✓ |      ~1539k ✓ |
| 0 9 * * *    |   ~12986k |       ~467k ✓ |      ~93k ✓ | ~33k ✓ |      ~1687k ✓ |
| 0 9 15 * 1   |    ~8591k |       ~901k ✓ |     ~158k ✓ | ~34k ✓ |      ~1721k ✓ |
| 0 9 * * 1-5  |    ~7715k |       ~467k ✓ |      ~97k ✓ | ~34k ✓ |      ~1559k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | --------------: |
| * * * * *    |   59 ns / 71 ns | 4,654 ns / 4,797 ns | 21,754 ns / 28,209 ns | 28,873 ns / 37,625 ns | 607 ns / 678 ns |
| 0 0 1 * *    |   85 ns / 95 ns | 1,281 ns / 1,320 ns |   7,312 ns / 7,815 ns | 29,518 ns / 39,167 ns | 585 ns / 610 ns |
| 0 12 31 * *  | 104 ns / 117 ns | 1,324 ns / 1,365 ns |   7,379 ns / 7,619 ns | 29,189 ns / 37,084 ns | 580 ns / 638 ns |
| */15 * * * * |  92 ns / 102 ns | 3,035 ns / 3,176 ns | 14,332 ns / 16,708 ns | 29,031 ns / 39,542 ns | 650 ns / 677 ns |
| 0 9 * * *    |   77 ns / 89 ns | 2,143 ns / 2,225 ns | 10,700 ns / 11,625 ns | 30,442 ns / 46,000 ns | 593 ns / 615 ns |
| 0 9 15 * 1   | 116 ns / 130 ns | 1,109 ns / 1,155 ns |   6,315 ns / 6,619 ns | 29,523 ns / 36,084 ns | 581 ns / 616 ns |
| 0 9 * * 1-5  | 130 ns / 143 ns | 2,139 ns / 2,189 ns | 10,362 ns / 11,958 ns | 29,520 ns / 37,875 ns | 641 ns / 673 ns |

### Parsing - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~17007k |       ~213k ✓ |      ~47k ✓ | ~33k ✓ |      ~1614k ✓ |
| 0 0 1 * *    |   ~11879k |       ~760k ✓ |     ~138k ✓ | ~34k ✓ |      ~1681k ✓ |
| 0 12 31 * *  |    ~9553k |       ~766k ✓ |     ~136k ✓ | ~34k ✓ |      ~1631k ✓ |
| */15 * * * * |   ~10578k |       ~327k ✓ |      ~70k ✓ | ~33k ✓ |      ~1522k ✓ |
| 0 9 * * *    |   ~13049k |       ~457k ✓ |      ~93k ✓ | ~34k ✓ |      ~1641k ✓ |
| 0 9 15 * 1   |    ~8671k |       ~906k ✓ |     ~160k ✓ | ~33k ✓ |      ~1709k ✓ |
| 0 9 * * 1-5  |    ~7572k |       ~467k ✓ |      ~96k ✓ | ~34k ✓ |      ~1581k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | --------------: |
| * * * * *    |   59 ns / 71 ns | 4,703 ns / 4,963 ns | 21,478 ns / 29,291 ns | 30,491 ns / 44,291 ns | 619 ns / 662 ns |
| 0 0 1 * *    |   84 ns / 94 ns | 1,315 ns / 1,360 ns |   7,265 ns / 7,479 ns | 29,571 ns / 41,000 ns | 595 ns / 629 ns |
| 0 12 31 * *  | 105 ns / 120 ns | 1,305 ns / 1,422 ns |   7,358 ns / 7,478 ns | 29,109 ns / 36,292 ns | 613 ns / 706 ns |
| */15 * * * * |  95 ns / 108 ns | 3,056 ns / 3,188 ns | 14,350 ns / 16,959 ns | 29,874 ns / 43,792 ns | 657 ns / 684 ns |
| 0 9 * * *    |   77 ns / 86 ns | 2,187 ns / 2,302 ns | 10,711 ns / 12,792 ns | 29,798 ns / 43,125 ns | 609 ns / 652 ns |
| 0 9 15 * 1   | 115 ns / 128 ns | 1,104 ns / 1,186 ns |   6,266 ns / 6,456 ns | 30,492 ns / 47,375 ns | 585 ns / 627 ns |
| 0 9 * * 1-5  | 132 ns / 149 ns | 2,141 ns / 2,217 ns | 10,385 ns / 13,000 ns | 29,776 ns / 40,292 ns | 632 ns / 671 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------- | --------: | ------------: | ----------: | -----: | ------------: |
| varied    |    ~9654k |       ~660k ✓ |     ~130k ✓ | ~34k ✓ |      ~1383k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case |       cron-fast |       cron-schedule |         cron-parser |                croner |   cron-validate |
| --------- | --------------: | ------------------: | ------------------: | --------------------: | --------------: |
| varied    | 104 ns / 119 ns | 1,514 ns / 1,595 ns | 7,668 ns / 8,003 ns | 29,079 ns / 36,167 ns | 723 ns / 768 ns |
