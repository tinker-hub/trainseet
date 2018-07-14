function GeoService() {
  this.computeDistance = (coordinateA, coordinateB) => {
    return Math.sqrt(
      (
        (coordinateA[0] - coordinateB[0]) * (coordinateA[0] - coordinateB[0])
      ) 
        + 
      (
        (coordinateA[1] - coordinateB[1]) * (coordinateA[1] - coordinateB[1])
      )
    );
  };
  // this.computeETA = (speed, coordinateA, coordinateB) => {
  //   const distance = this.computeDistance(coordinateA, coordinateB);
  //   return distance / speed;
  // };
}

module.exports = new GeoService();
