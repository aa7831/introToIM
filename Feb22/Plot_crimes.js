//this program will plot the crimes in Atlanta according to their geographical coordinates of longitudes and longitudes.

let crimes = []; //array, it will save the data from the csv file

let latRange = []; //this array will save min and max latitude 

let longRange = []; //this array will save min and max longitude

let latitudes = []; //array of latitudes values

let longitudes = []; //array of longitudes values

//We define the last 2 arrays so that we only have to traverse the file once. This will make the program faster and avoid crashes.

function preload(){
  //preload the data set here
  crimes = loadStrings("/atlcrime.csv");
}

function setup() {
  createCanvas(400, 400);
  background(220);
  
  if(crimes === null){
    //data was not loaded
    print("Failed loading data. Stopping.")
    
    while(true){
      //Infinite loop
      //does nothing, stops the program here
    }
  }
  
  //printing a sucess message
  print("Data loaded sucessfully! Number of lines:",crimes.length);
  
  findMinMax(); //finds the range of lat and long values in order to map them to fit the canvas later
}

function findMinMax(){
  //this function finds the minimum and maximum values of the latitude and longitude
  
  let singleRow = []; //this array will hold a single line at a time
  
  for(let i = 1; i<crimes.length; i++){
    //we start i = 1 because the first row has field names
    
    //Each line is splitted by a comma and put into the array singleRow.
    singleRow = split(crimes[i], ","); 
    
    //latitude is at index 8
    //longitutde is at index 9
    //I know this because they are the last 2 fields in the spreadsheet.
    
    let long = float(singleRow[8]);
    let lat = float(singleRow[9]);
    
    latitudes.push(lat); //add latitude value to the array of latitudes
    longitudes.push(long);//add longitude value to the array of longitudes
    
    if(i === 1){
      //if it is the first record, we can say that the max and min are both the same values - those being read
      longRange = [long,long]; // [min,max]
      latRange = [lat,lat]; //[min,max]
    }
    else{
      //not the first record, so we compare
      if(long > longRange[0]){
        //new max found
        longRange[0] = long;
      }
      
      if(long < longRange[1]){
        //new min found
        longRange[1] = long;
      }
      if(lat > latRange[0]){
        //new max found
        latRange[0] = lat;
      }
      
      if(lat < latRange[1]){
        //new min found
        latRange[1] = lat;
      }
    }
  }
  
  //debugging purpose
  //printing the ranges of both longitude and latitude.
//   print("Latitude range = ("+latRange[0] + "," + latRange[1] + ")");
  
//   print("Longitude range = ("+longRange[0] + "," + longRange[1] + ")");
  
}

function draw() {
  for(let i =0; i<latitudes.length; i++){
    //traverse the latitudes and longitudes arrays. Both of them will be of the same size since each record has a latitude and a longitude
    
    //maps the values to fit on the canvas
    let xpos = map(longitudes[i], longRange[0], longRange[1], 0,width);

    let ypos = map(latitudes[i], latRange[0], latRange[1], 0,height);
    
    //place a point on this location
    
    point(xpos,ypos);
  }
  
  noLoop(); //we only need to do this once.
}
