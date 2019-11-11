INSERT INTO leaderboards (player, score)
VALUES
("XxVapeGod420xX", 5),
("KevinTheDude", 10),
("UkrainianKatya", 3);

SELECT 
    player, 
    score, 
    RANK() OVER (ORDER BY score DESC) score_rank
FROM 
    leaderboards;
    
SELECT * FROM leaderboards;

