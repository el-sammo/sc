// CONTESTANT,W,L,T,POINTS,W,L,T,POINTS

function fixOdds() {
	db = new Mongo().getDB('supercontest');

	var cursor = db.weekOdds.find();
	while(cursor.hasNext()) {
print('here');
		db2 = new Mongo().getDB('supercontest');
		var oddsData = cursor.next();
print(oddsData.team);

		db2.wodds.insert(
			oddsData
		);
	}
}

fixOdds();
