BEGIN;

SET @id = ?;
SET @name = ?;
SET @adress = ?;
SET @halls = ?;


INSERT INTO postes (id, name, adress) 
            VALUES (@id, @name, @adress);
INSERT INTO halls (id, number, seats) 
            VALUES @halls;

COMMIT;