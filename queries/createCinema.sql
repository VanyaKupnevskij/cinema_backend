BEGIN;

SET @id = ?;
SET @name = ?;
SET @adress = ?;
SET @halls = ?;


INSERT INTO postes (id, name, adress, halls) 
            VALUES (@id, @name, @adress, @halls);

COMMIT;