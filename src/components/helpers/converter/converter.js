const Converter_V_RGB = (c) => {
  if (c.includes('#')) {
    let bigint = parseInt(c.split('#')[1], 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  } else return c;
};

export default Converter_V_RGB;
