angular.module('starter.services', [])
.factory("Details", function () {

    var factory = {}
    var person = { name: "", smoke: 0, price: 0, date: 0 };
    var person1 = { name: "", moneySaved: 0, lifeSaved: 0, lastSmoke: 0 };
    var name = "";
    var db = openDatabase("my.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
    var hours = 0;
    var price = 0;
    var smoke = 0;
    var numberOfSmoke = 0;
    var time = 0;
    var CT = 0;
    var lifeSaved = 0;
    var smoke = 0;
    var price = 0;
    var time = 0;
    var db = openDatabase("my.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);

    factory.setDetails = function(person)
    {
        var smokeperHour = person.smoke / 24;
        var pricePerCigg = person.price / 10;
            db.transaction(function (tx) {
                tx.executeSql("CREATE TABLE IF NOT EXISTS people (id integer primary key, name text, smoke integer, price integer,time integer)");
            });
            db.transaction(function (tx) {

                tx.executeSql("INSERT INTO people (name,smoke,price,time) VALUES (?,?,?,?)", [person.name, smokeperHour, pricePerCigg, person.date]);
            });
       
    }

    //factory.getDetails = function()
    //{
    //    db.transaction(function (tx) {
    //        tx.executeSql("SELECT name, smoke, price, time FROM people", [], function (tx, results) {
    //            if (results.rows.length > 0) {
    //                for (var i = results.rows.length - 1; i <= results.rows.length - 1; i++) {
    //                   person1.name = results.rows.item(i).name;
    //                    smoke = results.rows.item(i).smoke;
    //                    price = results.rows.item(i).price;
    //                    time = results.rows.item(i).time;

    //                    //   console.log("Result -> " + results.rows.item(i).name + " " + results.rows.item(i).smoke + " " + results.rows.item(i).price + " " + results.rows.item(i).time);

    //                    var d = new Date();
    //                    var CT = d.getTime();
    //                    var CT = CT / (1000 * 60);
    //                    time = CT - time;
    //                    // console.log(time);

    //                    person1.lifeSaved = ((time) * smoke * 11).toFixed(0) + " " + "minutes";
    //                    //console.log(lifeSaved);

    //                    person1.moneySaved = ((time / 60) * price * smoke).toFixed(0);
    //                    //console.log(moneySaved);

    //                    person1.lastSmoke = time.toFixed(0) + " " + "minutes";

    //                }
    //            }


    //        });
    //    });
    //}

    return factory;
});

