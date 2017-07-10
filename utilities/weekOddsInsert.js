// First, eliminate all asterisks (*)
// :21,36s/*//
// Second, swap PK for 0 (if it exists)
// :21,36s/PK/0/
// Third, eliminate leading numbers
// :21,36s/[0-9]\s\|[1-9][0-9]\s//g
// Fourth, eliminate excess white space while adding commas and apostrophes
// :21,36s/^/'/
// :21,36s/\s/','/g
// :21,36s/,'\([0-9]\)/,\1/g
// Fifth, fix 49ers (if it exists)
// :21,36s/,49ERS/,'49ERS/
// Sixth, wrap the data in a function call
// :21,36s/^/insertWeekOdds(/
// :21,36s/$/,week,year);/
// Seventh, update the week/year variables

var week = 1;
var year = 2016;

insertWeekOdds('PANTHERS','BRONCOS',3,week,year);
insertWeekOdds('FALCONS','BUCCANEERS',2.5,week,year);
insertWeekOdds('VIKINGS','TITANS',1.5,week,year);
insertWeekOdds('EAGLES','BROWNS',4,week,year);
insertWeekOdds('BENGALS','JETS',2.5,week,year);
insertWeekOdds('SAINTS','RAIDERS',1.5,week,year);
insertWeekOdds('CHIEFS','CHARGERS',6.5,week,year);
insertWeekOdds('RAVENS','BILLS',3,week,year);
insertWeekOdds('TEXANS','BEARS',6,week,year);
insertWeekOdds('PACKERS','JAGUARS',5.5,week,year);
insertWeekOdds('SEAHAWKS','DOLPHINS',10.5,week,year);
insertWeekOdds('GIANTS','COWBOYS',1.5,week,year);
insertWeekOdds('COLTS','LIONS',3.5,week,year);
insertWeekOdds('CARDINALS','PATRIOTS',6,week,year);
insertWeekOdds('STEELERS','REDSKINS',3,week,year);
insertWeekOdds('RAMS','49ERS',2.5,week,year);

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

