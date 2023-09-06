SELECT id, title FROM BOOK_INFO; 

SELECT
w.word, w.stem, l.usage
FROM LOOKUPS AS l
INNER JOIN
BOOK_INFO as b
ON l.book_key = b.id
LEFT JOIN
WORDS as w
ON l.word_key = w.id
WHERE b.title = '大事なことほど小声でささやく (幻冬舎文庫)'
;