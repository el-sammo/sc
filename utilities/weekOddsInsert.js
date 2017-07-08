// First, eliminate all asterisks (*)
// :19,34s/*//
// Second, eliminate leading numbers
// :19,34s/[0-9]\s\|[1-9][0-9]\s//g
// Third, eliminate excess white space while adding commas and apostrophes
// :19,34s/^/'/
// :19,34s/\s/','/g
// :19,34s/,'\([0-9]\)/,\1/g
// Fourth, fix 49ers (if it exists)
// :19,34s/,49ERS/,'49ERS/
// Now, wrap the data in a function call
// :19,34s/^/insertWeekOdds(/
// :19,34s/$/,week,year);/
// Last, update the week/year variables

var week = 14;
var year = 2016;

insertWeekOdds('CHIEFS','RAIDERS',3,week,year);
insertWeekOdds('TITANS','BRONCOS',1,week,year);
insertWeekOdds('PANTHERS','CHARGERS',1.5,week,year);
insertWeekOdds('COLTS','TEXANS',6,week,year);
insertWeekOdds('BENGALS','BROWNS',5.5,week,year);
insertWeekOdds('STEELERS','BILLS',1.5,week,year);
insertWeekOdds('DOLPHINS','CARDINALS',1,week,year);
insertWeekOdds('LIONS','BEARS',7.5,week,year);
insertWeekOdds('VIKINGS','JAGUARS',3,week,year);
insertWeekOdds('BUCCANEERS','SAINTS',2.5,week,year);
insertWeekOdds('REDSKINS','EAGLES',1,week,year);
insertWeekOdds('49ERS','JETS',2.5,week,year);
insertWeekOdds('SEAHAWKS','PACKERS',2.5,week,year);
insertWeekOdds('FALCONS','RAMS',6,week,year);
insertWeekOdds('COWBOYS','GIANTS',3,week,year);
insertWeekOdds('PATRIOTS','RAVENS',7,week,year);


function insertWeekOdds(favorite, dog, line, week, year) {
	db = new Mongo().getDB('supercontest');

	var teams = [];
	teams['TITANS'] = 'TEN';
	teams['TEXANS'] = 'HOU';
	teams['BILLS'] = 'BUF';
	teams['JETS'] = 'NYJ';
	teams['BENGALS'] = 'CIN';
	teams['RAVENS'] = 'BAL';
	teams['REDSKINS'] = 'WAS';
	teams['GIANTS'] = 'NYG';
	teams['PACKERS'] = 'GB';
	teams['LIONS'] = 'DET';
	teams['COLTS'] = 'IND';
	teams['JAGUARS'] = 'JAX';
	teams['EAGLES'] = 'PHI';
	teams['COWBOYS'] = 'DAL';
	teams['VIKINGS'] = 'MIN';
	teams['BEARS'] = 'CHI';
	teams['BUCCANEERS'] = 'TB';
	teams['PANTHERS'] = 'CAR';
	teams['STEELERS'] = 'PIT';
	teams['BROWNS'] = 'CLE';
	teams['FALCONS'] = 'ATL';
	teams['SAINTS'] = 'NO';
	teams['PATRIOTS'] = 'NE';
	teams['DOLPHINS'] = 'MIA';
	teams['CARDINALS'] = 'ARI';
	teams['RAMS'] = 'LA';
	teams['CHIEFS'] = 'KC';
	teams['CHARGERS'] = 'SD';
	teams['SEAHAWKS'] = 'SEA';
	teams['49ERS'] = 'SF';
	teams['BRONCOS'] = 'DEN';
	teams['RAIDERS'] = 'OAK';

	var favObject = {};
	favObject.team = teams[favorite];
	favObject.spread = (line * -1);
	favObject.week = week;
	favObject.year = year;

	var dogObject = {};
	dogObject.team = teams[dog];
	dogObject.spread = line;
	dogObject.week = week;
	dogObject.year = year;

print(favObject.team);
print(favObject.spread);

print(dogObject.team);
print(dogObject.spread);

	db.wodds.insert(favObject);
	db.wodds.insert(dogObject);
}

