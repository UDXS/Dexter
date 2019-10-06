# System Basics

## Lifecycle

When an app starts up, it's code is run just as a normal program would be. During this time, it is expected to start up and start drawing to the screen in a timely manner.

Dexter will execute registered events for a variety of state changes, such as Exiting, or Suspending (e.g. putting wrist down) and will give the application ample time to execute before suspending it.

### Watchface Lifecycle
Watchfaces are expected to start fairly quickly and not need any human
intervention, at least after initial setup (normally on a phone).
Watchfaces are only exited when they are changed but are not suspended when other apps or screens are opened. They are not expected to do any
heavy processing; that should be reserved for the host phone.

## User Interface and Rendering

The core unit of UI in Dexter is the page. A page does not have to be fullscreen, but it usually is (It is also the default). When used as fullscreen "windows," pages are pushed and popped, normally by tapping to open a new page or swiping to go back, respectively. Otherwise, pages are
controlled by apps through their UIs.

Every page, fullscreen or not, contains a singular, root layout. Layouts determine the placement of elements and handle features such as scrolling
and touch. Layouts may contain other sub-layouts as well as elements.

**Note:** This document is currently incomplete.