export function getViewerSizeToFitWindow(bookWidth, bookHeight, windowWidth, windowHeight){

 let resizedWidth = bookWidth * (windowHeight / bookHeight);
 if (resizedWidth <= windowWidth) {
  var viewerHeight = windowHeight;
  var viewerWidth = (bookWidth * (viewerHeight / bookHeight));
 } else {
  var viewerWidth = windowWidth;
  var viewerHeight = (bookHeight * (viewerWidth / bookWidth));
 }
 return [viewerWidth, viewerHeight];
}