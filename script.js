document.addEventListener("DOMContentLoaded", function (event) {
  COLORS = { g: "green", y: "yellow", r: "red" };

  const calcTime = (valId, halfId) => {
    const el = document.querySelector(valId);
    const val = parseInt(el.options[el.selectedIndex].value, 10);
    const el2 = document.querySelector(halfId);
    const half = el2.options[el2.selectedIndex].value;

    if (half === "am") {
      return val === 12 && 0 || val;
    }
    
    return val + (half === "pm" && val !== 12 ? 12 : 0);
  };

  const getStart = () => calcTime("#start_hour", "#start_half");
  const getEnd = () => calcTime("#end_hour", "#end_half");
  const getColor = () => {
    const el = document.querySelector("#color");
    return COLORS[el.options[el.selectedIndex].value];
  };

  const getCells = (start, end) => {
    const cells = Array.from(document.querySelectorAll(".cell"));

    if (start !== undefined && end !== undefined) {
      return cells.slice(start, end);
    }

    return cells;
  };

  const colorCells = (cells, color) => {
    console.log(cells, color);
    switch (color) {
      case COLORS.g:
        cells.map((e) => e.classList.remove(COLORS.y, COLORS.r));
        break;
      case COLORS.r:
        cells.map((e) => e.classList.add(COLORS.r));
        break;
      case COLORS.y:
        cells.map((e) => {
          e.classList.remove(COLORS.r);
          e.classList.add(COLORS.y);
        });
        break;
      default:
        console.info("no color given");
    }
  };

  const draw = () => {
    const start = getStart();
    const end = getEnd();
    const color = getColor();
    const cells = getCells(start, end);
    console.log(start, end, color, cells);

    colorCells(cells, color);
  };

  const reset = () => {
    colorCells(getCells(), COLORS.g);
    document.querySelector("#start_hour").selectedIndex = 9;
    document.querySelector("#start_half").selectedIndex = 0;
    document.querySelector("#end_hour").selectedIndex = 2;
    document.querySelector("#end_half").selectedIndex = 1;
    document.querySelector("#color").selectedIndex = 1;
    draw();
  };

  draw();

  document.querySelector("#btn-draw").addEventListener("click", draw);
  document.querySelector("#btn-reset").addEventListener("click", reset);
});
