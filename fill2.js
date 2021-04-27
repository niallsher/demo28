

var fs = require('fs');

const { MongoClient } = require('mongodb');
const url = 
"mongodb+srv://niallsheridan:ryder56nbs@cluster0.ytcqd.mongodb.net/companies?retryWrites=true&w=majority";

const client = new MongoClient(url, { useUnifiedTopology: true });

async function read(err, data)
{
	if (err) throw err;
	//console.log(data);
	var arr = data.split("\r\n");
	var the_data = [];
	//console.log("length " + arr.length);
	for (var i = 1; i < arr.length - 1; i++) {
		var doc_arr = arr[i].split(",");
		var newData = {"name":doc_arr[0], "ticker":doc_arr[1]};
		console.log(newData);
		the_data.push(newData);
	}

	try {
		await client.connect();
		  
		var dbo = client.db("companies");
		var collection = dbo.collection('companies');

		console.log("Insert...");

		await collection.insertMany(the_data);
	} finally {
		await client.close();
	}
	console.log("Success");
}
function run()
{
	fs.readFile("companies.csv", "utf-8", function(err, data) {
		
		read(err, data);
	});
}

run();



