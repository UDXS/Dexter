## Dexter UI Architecture

**Note:** Information from this document will likely be adapted for an upcoming __UI Development Guide__.

### Theory

Dexter's user interface emphasizes scrolling and swiping.

One can scroll up or down to see content and can swipe to "go back" or to bring up a side menu. Horizontally scrolling UI is heavily discouraged, but it is possible to implement a "slideshow" with explicit buttons. An app can open new pages and even choose how to animate their opening.

One of the best features of a touch-less watch like the Pebble series is their usability while one does not have the stability to tap on a small screen, such as when running. Dexter fixes this lack of buttons on modern watches with two things: large touch buttons, and slide buttons. The idea of large buttons is fairly basic: buttons, especially those that are used often, should have large touch surfaces and should have good margins between them. Slide buttons attempt to make actions explicit by requiring one to slide a button icon to perform an action, preventing accidental touch.

Currently, Dexter requires a touch screen and a physical "Home" button.

### Layout

UIs in Dexter are made up of pages. An application can push/pop pages onto the page stack, opening and closing them. Pages are vertically scrolling and can have multiple, possibly independently, scrolling layers. One should take care to not use layers where a page is more acceptable. Most pages will not need more than 1 or 2 layers.

Within each layer is a set of elements, with each element taking its own line. In some cases, one may wish to place two items next to each other, or even to have horizontal scrolling. This can be accomplished via layout elements. Layout elements are special elements that render their subelements in a specific order. There are a few system layouts available but it is possible to create a custom layout as well.

Dexter uses a version of the box model similar to the one available in CSS with margins, borders, and padding. Margins/padding are 0 by default, however.

 ![CSS Box Model](https://upload.wikimedia.org/wikipedia/commons/7/7a/Boxmodell-detail.png?download)

### Available Elements

- label
- paragraph
- icon
- image
- button
- slideButton
- slideshow
- vectorCanvas
- canvas
- layout
    - absolute
    - split

## [Refer to dexter.ui in the API Reference.](../api/ui.md)