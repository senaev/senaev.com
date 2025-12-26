import {
    describe,
    expect,
    it,
} from 'vitest';
import { ensureEmptyLineAfterTables } from './ensureEmptyLineAfterTables';

describe('ensureEmptyLineAfterTables', () => {
    it('should add empty line after table when text follows immediately', () => {
        const input = `| Наречие | Русский перевод |
|---------|-----------------|
| más claramente | более ясно |
| menos claramente | менее ясно |
Иногда сравнительная степень наречий выражается оборотами:`;

        const expected = `| Наречие | Русский перевод |
|---------|-----------------|
| más claramente | более ясно |
| menos claramente | менее ясно |

Иногда сравнительная степень наречий выражается оборотами:`;

        expect(ensureEmptyLineAfterTables(input)).toEqual(expected);
    });

    it('should not add empty line if it already exists after table', () => {
        const input = `| Header 1 | Header 2 |
|----------|---------|
| Cell 1   | Cell 2  |

Some text after table.`;

        expect(ensureEmptyLineAfterTables(input)).toEqual(input);
    });

    it('should not modify text without tables', () => {
        const input = `This is just regular text.
No tables here.
Just paragraphs.`;

        expect(ensureEmptyLineAfterTables(input)).toEqual(input);
    });

    it('should handle table at the end of document', () => {
        const input = `| A | B |
|---|---|
| 1 | 2 |`;

        expect(ensureEmptyLineAfterTables(input)).toEqual(input);
    });

    it('should handle multiple tables with text between them', () => {
        const input = `| Table 1 Col 1 | Table 1 Col 2 |
|---------------|---------------|
| Value 1       | Value 2       |
Text between tables
| Table 2 Col 1 | Table 2 Col 2 |
|---------------|---------------|
| Value 3       | Value 4       |
Final text.`;

        const expected = `| Table 1 Col 1 | Table 1 Col 2 |
|---------------|---------------|
| Value 1       | Value 2       |

Text between tables
| Table 2 Col 1 | Table 2 Col 2 |
|---------------|---------------|
| Value 3       | Value 4       |

Final text.`;

        expect(ensureEmptyLineAfterTables(input)).toEqual(expected);
    });

    it('should handle table with empty lines inside table (should not break table)', () => {
        const input = `| Header 1 | Header 2 |
|----------|---------|
| Cell 1   | Cell 2  |

| Cell 3   | Cell 4  |
Text after table.`;

        const expected = `| Header 1 | Header 2 |
|----------|---------|
| Cell 1   | Cell 2  |

| Cell 3   | Cell 4  |

Text after table.`;

        expect(ensureEmptyLineAfterTables(input)).toEqual(expected);
    });
});
