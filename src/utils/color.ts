export function generateRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

export function generateRandomDarkColor() {
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 10);
  }
  return color;
}
