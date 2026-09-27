class Knight {
  constructor(coordinate = [0, 0]) {
    this.position = [coordinate[0], coordinate[1]];
    this.moveTypes = this.getMoves();
  }
  getMoves(position = this.position) {
    this.moveTypes = [
      [position[0] + 1, position[1] + 2],
      [position[0] + 1, position[1] - 2],
      [position[0] - 1, position[1] + 2],
      [position[0] - 1, position[1] - 2],
      [position[0] + 2, position[1] + 1],
      [position[0] + 2, position[1] - 1],
      [position[0] - 2, position[1] + 1],
      [position[0] - 2, position[1] - 1],
    ];
    let validMoves = [];
    this.moveTypes.forEach((move) => {
      if (move[0] >= 0 && move[0] <= 7 && move[1] >= 0 && move[1] <= 7) {
        validMoves.push(move);
      }
    });
    return validMoves;
  }
  move(x, y) {
    if (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
      this.position = [x, y];
      this.moveTypes = this.getMoves();
      return this.position;
    } else {
      return "Bad Move";
    }
  }
  knightMoves(end, start = this.position, queue = [[start]], stringList = []) {
    if (!(end[0] >= 0 && end[0] <= 7 && end[1] >= 0 && end[1] <= 7)) {
      throw new Error("Out of bounds end position");
    }
    if (!(start[0] >= 0 && start[0] <= 7 && start[1] >= 0 && start[1] <= 7)) {
      throw new Error("Out of bounds start position");
    }
    this.position = start;
    this.moveTypes = this.getMoves();
    stringList.push(start.toString());
    while (queue.length > 0) {
      const currentPath = queue.shift();
      const lastPosition = currentPath[currentPath.length - 1];
      if (lastPosition[0] === end[0] && lastPosition[1] === end[1]) {
        console.log(
          `=> You've made it in ${currentPath.length - 1} moves! Here's your path:`,
        );
        currentPath.forEach((move) => {
          console.log(move);
          this.move(move[0], move[1]);
        });
        return currentPath;
      }
      const possibleMoves = this.getMoves(lastPosition);
      possibleMoves.forEach((move) => {
        let add = true;
        stringList.forEach((string) => {
          if (string === move.toString()) {
            add = false;
          }
        });
        if (add === true) {
          stringList.push(move.toString());
          queue.push([...currentPath, move]);
        }
      });
    }
  }
}
const knight = new Knight();
console.log("Moving from [0, 0] to [4, 4]");
knight.knightMoves([4, 4]);
console.log("Moving from [4, 4] to [2, 2]");
knight.knightMoves([2, 2]);
console.log("Moving from [2, 2] to [3, 3]");
knight.knightMoves([3, 3]);
console.log("Moving from [3, 3] to [4, 3]");
knight.knightMoves([4, 3]);
console.log("Moving from [0, 0] to [4, 4] (reset position)");
knight.knightMoves([4, 4], [0, 0]);
console.log("Moving from [4, 3] to [8, 8] (invalid position)");
knight.knightMoves([8, 8]);
