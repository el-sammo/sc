//PLAYER NAME,Pick 1,Pick 2,Pick 3,Pick 4,Pick 5
//
//	First, escape apostrophes
//	:1,$s/\\'/\\'/
//
//	Next, remove entries that contain no selections
//	/No Selections
//
//	Next, find double quotes and remedy (if needed)
//	/"
//
//	Next, add apostrophes where appropriate while building object
//	using qq


function updateEntryTotals() {
	var db = new Mongo().getDB('supercontest');
	var cursor = db.entries.find().sort({name: 1}).limit(250).skip(1999);
	while(cursor.hasNext()) {
		var entryData = cursor.next();
		getStandingsTotal(entryData);
	}
}

function getStandingsTotal(entryData) {
	var entryId = (entryData._id.toString()).substring(10,34);

	var db2 = new Mongo().getDB('supercontest');
	var cursor = db2.standings.find({entryId: entryId, week: 16, year: 2016});
	while(cursor.hasNext()) {
		var entryStandingData = cursor.next();
		updateEntriesTotal(entryStandingData);
	}
}

function updateEntriesTotal(entryStandingData) {
	var entryName = entryStandingData.name;
print(entryName +'-'+ entryStandingData.total);
	var db3 = new Mongo().getDB('supercontest');
	db3.entries.update(
		{name: entryName},
		{$set: {total: entryStandingData.total}},
		false
	);
}

updateEntryTotals();


