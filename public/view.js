$(document).ready(function () {
    var $newChatInput = $("#chatInput");
    var $scoreContainer = $("#score");
    var $playerInput = $("#playerName");
    var $playerScore = $("#playerScore");

    // $(document).on("click", "#submitChat", submitChat);


    getLeaderboards();


    function getLeaderboards() {
        console.log('getLeaderboards()');
        $.get("/api/leaderboards", function (data) {
            console.table(data);
            initializeTable(data);
        });
    }

    function initializeTable(leaderboards) {
        console.log('initializeTable()');
        $("#score").empty();
        console.log(leaderboards);

        
        for (var i = 0; i < leaderboards.length; i++) {
            //createNewRow(leaderboards[i]);
            
            var $newInputRow = 
                    "<tr class='display score-item'><td>" +
                    (i + 1) +
                    "</td><td>" +
                    leaderboards[i].player +
                    "</td><td>" +
                    leaderboards[i].score +
                    "</td></tr>";
            console.log(leaderboards[i]);
            console.log($newInputRow);
        
            //$newInputRow.data("leaderboards", leaderboards);
            $scoreContainer.append($newInputRow);
        }
    }

    //function createNewRow(leaderboards) {
    //}

    function insertLeaderboards(event) {
        console.log('insertLeaderboards()');
        event.preventDefault();
        var leaderboards = {
            player: $playerInput.val().trim(),
            score: $playerScore
        };

        $.post("/api/leaderboards", leaderboards, getLeaderboards);
        $playerInput.val("");
        $playerScore.val();
    }

});