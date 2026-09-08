## Pack context (repomix)

Repo size measured after each step. Pack Summary1–8 labels match the original telemetry; only the metrics used below are kept.

| Pack | Tool | Step | Files | Tokens | Chars | Context |
|------|------|------|------:|-------:|------:|--------:|
| Summary1 | Composer 2.5 fast | Initial todo list generated | 97 | 65,615 | 262,721 | — |
| Summary2 | Composer 2.5 | Multi-list planned + built | 98 | 133,184 | 533,585 | — |
| Summary3 | Composer 2.5 Fast | Multi-list planned + built (old repomix still present) | 100 | 266,651 | 1,068,288 | — |
| Summary4 | Composer 2.5 Fast | Same as 3, then old repomix deleted | 97 | 67,607 | 271,249 | ~39.8K |
| Summary5 | Composer 2.5 | Multi-list planned + built, old repomix deleted | 97 | 67,580 | 271,098 | ~40.8K |
| Summary6 | Sonnet 4.6 Max + Thinking | Multi-list planned + built, old repomix deleted | 97 | 67,760 | 271,359 | ~60.2K |
| Summary7 | Composer 2.5 | Multi-list planned + built, old repomix deleted | 97 | 67,689 | 271,929 | ~43.1K |
| Summary8 | Composer 2.5 fast | Initial todo list; old repomix deleted | 97 | 65,615 | 262,721 | ~43.1K |

Key rows for the conclusions: Summary3 (largest pack with leftover repomix) vs Summary4 (after cleanup). Feature session cost below is billed model usage, not these pack totals.

Cost for multi lists fiture:
claude-4.6-sonnet-high-thinking (121 351 * 3$ / 1000000) + (945 783 * 0.3$ / 1000000) + (5551 * 15$ / 1000000) = 0.73$
composer-2.5 (461 280 * 0.5$ / 1000000) + (4 292 * 2.5$ / 1000000) = 0.24$

Legend (USD per 1,000,000 tokens):
- claude-4.6-sonnet-high-thinking: 121 351 input × $3, 945 783 cache read × $0.30, 5 551 output × $15
- composer-2.5: 461 280 input × $0.50, 4 292 output × $2.50
- Neither line includes cache write; composer-2.5 usage had no cache-read tokens.

Висновки:
1. claude-4.6-sonnet-high-thinking коштував $0.73 проти $0.24 у composer-2.5 (~утричі дорожче). Для планування та рефакторингу дешевше брати Composer 2.5.
2. Видалення старих repomix-файлів зменшило pack з 266 651 (Summary 3) до 67 607 токенів (Summary 4) — майже в 4 рази. Менший контекст знижує input-вартість наступних сесій.