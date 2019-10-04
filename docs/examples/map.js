/*
UDXS Dexter Smartwatch Operating System
Copyright (C) 2019 Davit Markarian and Contributors.
Available under the MIT License.

Example: Map Watchface
This watchface displays the time along
with a street map centered on the user
in the background.
*/

let myPage = Dexter.Face.Page //Get the Watchface's page

let layout = new Dexter.Ui.AbsoluteLayout() //No fancy scrolling needed here, just pixel positions.
myPage.add(layout)

let time = new Dexter.Ui.TextLabel("@fonts/roboto", 28) //Make a text label with a 28px-sized Roboto system font
time.setAlignment(Dexter.Ui.Align.Center); //Horizontally align the text to the center.
time.setColor(new Dexter.Color(224, 224, 224)); // Set color to off-white.

//Get the current time and put it on our time label
let curTime = new Dexter.Time.getTime()
time.setText(curTime.hour + ":" + curTime.minute)

//position the label near the top. It is centered relative to it's positon (which is the center of the screen)
time.setPosition(Dexter.Screen.Width / 2, 10) //Position only works with certain layouts. The AbsoluteLayout supports it.

//add the time label to our layout.
layout.add(time)

//Declare a connection indicator using an icon
let connIndicator = new Dexter.Ui.VectorIcon("@icons/noHost") //Use a system icon that indicates no phone connected
connIndicator.setAlignment(Dexter.Ui.Align.Center); //Horizontally align icon to the center, important for centering icon.
connIndicator.setPosition(Dexter.Screen.Width / 2, Dexter.Screen.Height - 30) //Close to the bottom center
connIndicator.setSize(30, 30); //Again, this only works with certain layouts, like AbsoluteLayout.

//add the connection indicator to our layout
layout.add(connIndicator)

//As a Watchface, we need to update every minute
Dexter.Time.handleChange(Dexter.Time.Minutes, function() {
    time.setText(time.hour + ":" + time.minutes)
    Dexter.Phone.ensureConnection().then(function () { //Ensure that the phone is connected before running this code
        return Dexter.Phone.Data.localMap.get() //Ask the phone for the map data

    }).then(function (map) { //We've got the map from our phone, draw it.
        connIndicator.setVisible(false) //No connection error. Hide the indicator.
        mapVector.clear(new Dexter.Color(0, 4, 38)); //Clear to a really dark blue background.
        mapVector.setColor(new Dexter.Color(164, 166, 186)); //Set path/road color to a lighter bluish-gray.
        //the map the phone sent us is an array of paths with each path line looking like: [x0, y0, x1, y1, thickness, endCapped]
        for (let path of map) { //Get each path line from the map array
            mapVector.drawLine(path[0], path[1], path[2], path[3], path[4], Dexter.Vector.Cap.Square, path[5] ? Dexter.Vector.Cap.Rounded : Dexter.Vector.Cap.Square);
        }
    }).error(function (map) { //We couldn't retrieve the map. Currently, we'll just show a small indicator.
        connIndicator.setVisible(true)
    })

    myPage.draw(); //Though Dexter is pretty smart, we need to help it figure out when to redraw the screen
})