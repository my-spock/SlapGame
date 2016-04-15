    var Item = function (opt1, opt2, opt3) {
        this.name = opt1;
        this.modifier = opt2;
        this.description = opt3;
        this.draw = function() {
            return '<div class="item">'+ this.name +'</div>';
        };
    }

    var items = {
        helmet: new Item("helmet", 0.3, "Head protection!"),
        shield: new Item("shield", 0.3, "This is a great shield!"),
        armor: new Item("armor", 0.5, "Body armor!")
    }


    var player = {
        health: 100,
        victimName: "",
        slapCount: 0,
        kickCount: 0,
        punchCount: 0,
        equip: [],
        addMods: function(equipped) {
            var total = 1;
            
            for(var i = 0; i < player.equip.length; i++) {
                total -= player.equip[i].modifier;
            }
            
            if (total <= 0) {
                return 0;
            } else if (total <= 1) {
                return total;
            }

        }
    }

    function slap() {
        player.health -= (1 * player.addMods());
        
        player.slapCount++;
        
        document.getElementById("slap-count").innerText = player.slapCount + " Slaps";
        
        update();
        
        // return player;
    }

    function kick() {
        player.health -= (5 * player.addMods());
        
        player.kickCount++;
        
        document.getElementById("kick-count").innerText = player.kickCount + " Kicks";
        
        update();
        
        // return player;
    }

    function punch() {
        player.health -= (10 * player.addMods());
        
        player.punchCount++;
        
        document.getElementById("punch-count").innerText = player.punchCount + " Punches";
        
        update();
        
        // return player;
    }

    function healthCheck(health) {
        if (health <= 0) {
            alert("The victim has died!");
            return 0;
        }
    }

    function newName() {
        var newName = prompt("What is your victim's name?", "");
        
        if (newName != null) {
            document.getElementById("name").innerText = newName;
            document.getElementById("name-btn").style.visibility = "hidden";
        }
    }

    function update() {
        document.getElementById("health-count").innerText = "Health: " + player.health;
        
        if (player.health <= 0) {
            document.getElementById("player-panel").classList.remove("panel-primary");
            document.getElementById("player-panel").classList.add("panel-danger");
        }
        
        healthCheck(player.health);
        
            
            var weaponList = [];
            for (var i = 0; i < player.equip.length; i++) {
                weaponList.push(player.equip[i].name);
            }
            document.getElementById("player-items").innerHTML = "Items: " + weaponList.join(", ");
        }

    function equip(item) {
        player.equip.push(items[item]);
        
        if (player.equip.length >= 3) {
            player.equip.shift();
        }
        
        update();
    }
