INSERT INTO leaderboards (player, score)
VALUES
("XxVapeGod420xX", 20),
("KevinTheDude", 35),
("UkrainianKatya", 80);

SELECT 
    player, 
    score, 
    RANK() OVER (ORDER BY score DESC) score_rank
FROM 
    leaderboards;
    
SELECT * FROM leaderboards;