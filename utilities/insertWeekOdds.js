// var teams = [
// 	{
// 		mascot:	TITANS,
// 		abbrev: TEN
// 	},
// 	{
// 		mascot:	TEXANS,
// 		abbrev: HOU
// 	},
// 	{
// 		mascot:	BILLS,
// 		abbrev: BUF
// 	},
// 	{
// 		mascot:	JETS,
// 		abbrev: NYJ
// 	},
// 	{
// 		mascot:	BENGALS,
// 		abbrev: CIN
// 	},
// 	{
// 		mascot:	RAVENS,
// 		abbrev: BAL
// 	},
// 	{
// 		mascot:	REDSKINS,
// 		abbrev: WAS
// 	},
// 	{
// 		mascot:	GIANTS,
// 		abbrev: NYG
// 	},
// 	{
// 		mascot:	PACKERS,
// 		abbrev: GB
// 	},
// 	{
// 		mascot:	LIONS,
// 		abbrev: DET
// 	},
// 	{
// 		mascot:	COLTS,
// 		abbrev: IND
// 	},
// 	{
// 		mascot:	JAGUARS,
// 		abbrev: JAX
// 	},
// 	{
// 		mascot:	EAGLES,
// 		abbrev: PHI
// 	},
// 	{
// 		mascot:	COWBOYS,
// 		abbrev: DAL
// 	},
// 	{
// 		mascot:	VIKINGS,
// 		abbrev: MIN
// 	},
// 	{
// 		mascot:	BEARS,
// 		abbrev: CHI
// 	},
// 	{
// 		mascot:	BUCCANEERS,
// 		abbrev: TB
// 	},
// 	{
// 		mascot:	PANTHERS,
// 		abbrev: CAR
// 	},
// 	{
// 		mascot:	STEELERS,
// 		abbrev: PIT
// 	},
// 	{
// 		mascot:	BROWNS,
// 		abbrev: CLE
// 	},
// 	{
// 		mascot:	FALCONS,
// 		abbrev: ATL
// 	},
// 	{
// 		mascot:	SAINTS,
// 		abbrev: NO
// 	},
// 	{
// 		mascot:	PATRIOTS,
// 		abbrev: NE
// 	},
// 	{
// 		mascot:	DOLPHINS,
// 		abbrev: MIA
// 	},
// 	{
// 		mascot:	CARDINALS,
// 		abbrev: ARI
// 	},
// 	{
// 		mascot:	RAMS,
// 		abbrev: LA
// 	},
// 	{
// 		mascot:	CHIEFS,
// 		abbrev: KC
// 	},
// 	{
// 		mascot:	CHARGERS,
// 		abbrev: SD
// 	},
// 	{
// 		mascot:	SEAHAWKS,
// 		abbrev: SEA
// 	},
// 	{
// 		mascot:	49ERS,
// 		abbrev: SF
// 	},
// 	{
// 		mascot:	BRONCOS,
// 		abbrev: DEN
// 	},
// 	{
// 		mascot:	RAIDERS,
// 		abbrev: OAK
// 	},
// ]


var odds = [
	{
		team: 'TEN',
		spread: -3.5
	},
	{
		team: 'HOU',
		spread: 3.5
	},
	{
		team: 'BUF',
		spread: -3.5
	},
	{
		team: 'NYJ',
		spread: 3.5
	},
	{
		team: 'CIN',
		spread: -2
	},
	{
		team: 'BAL',
		spread: 2
	},
	{
		team: 'WAS',
		spread: -7.5
	},
	{
		team: 'NYG',
		spread: 7.5
	},
	{
		team: 'GB',
		spread: -3.5
	},
	{
		team: 'DET',
		spread: 3.5
	},
	{
		team: 'IND',
		spread: -4.5
	},
	{
		team: 'JAX',
		spread: 4.5
	},
	{
		team: 'PHI',
		spread: -4
	},
	{
		team: 'DAL',
		spread: 4
	},
	{
		team: 'MIN',
		spread: -5
	},
	{
		team: 'CHI',
		spread: 5
	},
	{
		team: 'TB',
		spread: -6
	},
	{
		team: 'CAR',
		spread: 6
	},
	{
		team: 'PIT',
		spread: -6
	},
	{
		team: 'CLE',
		spread: 6
	},
	{
		team: 'ATL',
		spread: -6.5
	},
	{
		team: 'NO',
		spread: 6.5
	},
	{
		team: 'NE',
		spread: -9.5
	},
	{
		team: 'MIA',
		spread: 9.5
	},
	{
		team: 'ARI',
		spread: -6
	},
	{
		team: 'LA',
		spread: 6
	},
	{
		team: 'KC',
		spread: -6
	},
	{
		team: 'SD',
		spread: 6
	},
	{
		team: 'SEA',
		spread: -9.5
	},
	{
		team: 'SF',
		spread: 9.5
	},
	{
		team: 'DEN',
		spread: -1
	},
	{
		team: 'OAK',
		spread: 1
	},
];

function insertWeekOdds(odds) {
	db = new Mongo().getDB('supercontest');

	odds.forEach(function(odd) {
print(odd.team);
		db.weekOdds.insert({
			team: odd.team,
			spread: odd.spread,
			week: 17,
			year: 2016
		});
	});
}

insertWeekOdds(odds);

