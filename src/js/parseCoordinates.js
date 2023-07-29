export function parseCoordinates(str) {
  let lat, lng;
  const regex = /-?\d+\.(\d){5}/g;
  const matches = str.match(regex);

  if (matches.length !== 2) return false;

  lat = parseFloat(matches[0]);
  lng = parseFloat(matches[1]);

  return { lat, lng };
}
