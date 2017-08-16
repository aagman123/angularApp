angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope, Details) {

    $scope.person = { name: "", smoke: '', price: '', date: 0 };
    var d = new Date();
    var currentTime = d.getTime();
    $scope.person.date = currentTime / (1000 * 60);
    $scope.isValue = false;
    var first = 0;


    var db = openDatabase("my.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);

    $scope.setDetails = function (person) {
        Details.setDetails(person);
        $scope.isValue = true;
        first++;
    }

    $scope.getDetails = function () {
        if (first != 0) {
            db.transaction(function (tx) {
                tx.executeSql("SELECT name, smoke, price FROM people", [], function (tx, results) {
                    if (results.rows.length > 0) {
                        for (var i = results.rows.length - 1; i <= results.rows.length - 1; i++) {
                            $scope.person.name = results.rows.item(i).name;
                            $scope.person.smoke = results.rows.item(i).smoke;
                            $scope.person.price = results.rows.item(i).price;
                        }
                    }
                })
            })
        }


        $scope.resetDetails = function () {
            person.name = "";
            person.price = '';
            person.smoke = '';
            $scope.isValue = false;
        }


    }
})
.controller('ChatsCtrl', function ($scope, Details,$timeout) {

    $scope.person1 = { name: "", moneySaved: 0, lifeSaved: 0,lastSmoke:0};
    var name = "";
    var db = openDatabase("my.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
    var hours = 0;
    var price = 0;
    var smoke = 0;
    var numberOfSmoke = 0;
    var time = 0;
    var CT = 0;
    var lifeSaved = 0;

    $scope.getDetails = function () {

        //  $scope.person1 = Details.getDetails();
            db.transaction(function (tx) {
                tx.executeSql("SELECT name, smoke, price, time FROM people", [], function (tx, results) {
                    if (results.rows.length > 0) {
                        for (var i = results.rows.length - 1; i <= results.rows.length - 1; i++) {
                            $scope.person1.name = results.rows.item(i).name;
                            smoke = results.rows.item(i).smoke;
                            price = results.rows.item(i).price;
                            time = results.rows.item(i).time;

                            //   console.log("Result -> " + results.rows.item(i).name + " " + results.rows.item(i).smoke + " " + results.rows.item(i).price + " " + results.rows.item(i).time);

                            var d = new Date();
                            var CT = d.getTime();
                            var CT = CT / (1000 * 60);
                            time = CT - time;
                            // console.log(time);

                            $scope.person1.lifeSaved = ((time) * smoke * 11).toFixed(0) + " " + "minutes";
                            //console.log(lifeSaved);

                            $scope.person1.moneySaved = ((time / 60) * price * smoke).toFixed(0);
                            //console.log(moneySaved);

                            $scope.person1.lastSmoke = time.toFixed(0) + " " + "minutes";

                        }
                    }

                });
            });
        
    }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  
});
