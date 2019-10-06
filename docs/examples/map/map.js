/*
UDXS Dexter Smartwatch Operating System
Copyright (C) 2019 Davit Markarian and Contributors.
Available under the MIT License.

Example: Map Watchface

This watchface displays the time along
with a street map centered on the user
in the background.
*/


let myFace = new dexter.ui.page(); // New fullscreen page for our watchfaces

let layout = new dexter.ui.absoluteLayout() // No fancy positioning/scrolling needed here, just absolute pixel positions.
myFace.setLayout(layout)

/* 
	The VectorCanvas is a way to draw a set of shapes and lines through a series of drawing commands.
	It is most useful for maps, diagrams, and even background images.

	The VectorCanvas element can be thought of as a window into a possibly larger vector image.
	The constructor specifies the "window" (section) the VectorCanvas element will display.
*/

let mapVector = new Dexter.ui.vectorCanvas(0, 0, 240, 240) // Construct a Vector Canvas with a window the same size as the screen, with no offset

mapVector.x = 0
mapVector.y = 0

mapVector.width = myFace.width
mapVector.height = myFace.height

mapVector.background = new dexter.color(0, 4, 38)

layout.add(mapVector) // We need to add the mapVector first so it's on the bottom.


/* 
	Make a text label with a 48px-sized Bolded	Roboto

	Roboto is a system font and access to 
	shared system resources is available by
	placing '@' before a path to a system resource.
*/
let time = new dexter.ui.label("@fonts/roboto", 48, dexter.ui.bold)
time.alignment = dexter.ui.center // Horizontally align the text to the center.
time.color = new dexter.color(230, 230, 230) //  Set color to an off-white.

// Get the current time and put it on our time label
let curTime = dexter.time.now()
time.text = curTime.hour + ":" + curTime.minute

/* 
	Position the label near the top. It is centered relative to it's positon (which is normally the center of the screen)

	Note: the x/y position properties have different meanings with different layouts.
		With absoluteLayout, the position is numeric and represents pixels.
*/
time.x = myFace.width / 2
time.y = 20

// Add the time label to our layout.
layout.add(time)


// Declare a connection indicator using an icon
let connIndicator = new dexter.Ui.VectorIcon("@icons/noHostConnection") // Use a system icon that indicates no phone connected
connIndicator.setAlignment(dexter.ui.center) // Horizontally align icon to the center, important for centering icon.
// Position it close to the bottom center
connIndicator.x = myFace.width / 2
connIndicator.y = myFace.height - 30

// Again, this only works with certain layouts, like AbsoluteLayout.
connIndicator.width = 30
connIndicator.height = 30

// Add the connection indicator to our layout
layout.add(connIndicator)

// As a Watchface, we need to update every minute
dexter.time.handleChange(dexter.time.minutes, function (currentTime) {
	// Set the time to the current time
	time.text = currentTime.hour + ":" + currentTime.minutes

	/* 
		We want to ensure that we have a connection to the phone. This is not required but can help prevent 
		the time waste associated with attempting to communicate with a non-present device.
	*/
	dexter.host.ensureConnection() // Host is normally a phone
		.error(function () { // No connection to host.

			// Show "No Connection" indicator icon
			connIndicator.visible = true;
		})
		.then(function () { // We have a connection to the phone. Make a request
			return dexter.host.request("map", {}) // Just request current location map
		})
		.then(function (map) { // We've got the map from our phone, draw it.
			connIndicator.visible = false // No connection error. Hide the indicator icon.
			mapVector.clear() // Clear the vector map
			mapVector.setLineColor(new dexter.color(130, 130, 160)) // Set path/road color to a darker bluish-gray.

			/* 
				The map the phone sent us is an array of paths with each path line looking like: 
					[x0, y0, x1, y1, thickness]

				The phone has already formatted the map for our screen size,
				Taking care to ensure that some of the road lines go off screen
				for visual effect.
			*/
			for (let path of map) { // Get each path line from the map array
				mapVector.drawLine(path[0], path[1], path[2], path[3], path[4], dexter.ui.square, dexter.ui.square) //Draw lines with square caps (non-rounded)
			}
		})
		.error(function () { // We couldn't retrieve the map. Show the same "No Connection" indicator icon.
			connIndicator.visible = true;
		})

	myFace.draw() // Though Dexter is pretty smart, we need to help it figure out when to redraw the screen
})

// Give the Watchface page to Dexter so it can be rendered when the time comes.
return myFace