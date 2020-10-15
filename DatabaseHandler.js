//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

var databaseIp = process.env.DB_IP;
var databaseName = process.env.DB_Name;
var url = process.env.DB_URL;
// Connection URL. This is where your mongodb server is running.
//var url = 'mongodb://localhost:27017/IOT;
//var url = 'mongodb://' + databaseIp + '/' + databaseName;

var  dbInst = null;
function DatabaseHandler() 
{

    /** The function used to connect the mongo db database. */
    this.connectDatabase = function (callBack) {

        if (dbInst == null) {
            // Use connect method to connect to the Server
            MongoClient.connect(url, function (err, db) {
                if (err) {

                    callBack(err, null);

                } else {
                    //HURRAY!! We are connected. :)

                    dbInst = db;
                    db.on("close", function (error) {
                        dbInst = null;
                        db = null;

                    });
                    callBack(null, dbInst);
                }
            });
        }
        else {
            callBack(null, dbInst);
        }
    }

	
	this.dropDataBase = function()
	{
	    this.connectDatabase(function (err, db)
		{
            if (err)
			{

                return false;
            } else 
			{
                //HURRAY!! We are connected. :)

                db.dropDatabase();
                return true;
            }
        });
	}

	this.timeWindow=function(collectionName,sortOptions,callback){
		this.connectDatabase(function(err,db){
			if(err){
				callback(1,null)
			}
			else{
				var collection=db.collection(collectionName)
				collection.find({},{'id':0,"epoch":1}).limit(1).sort(sortOptions).toArray(function(err,result){
					if(err){
						callback(1,null)
					}
					else{
						var result1={}
						if(result[0]){
							result1=result[0]["epoch"]
							callback(null,result1)
						}
						else{
							callback(null,null)
						}
					}
				})
			}
		})
	}
	this.autoIncrementFieldValue = function(collectionName,query,incValue,setData)
	{
	    this.connectDatabase.connect(function (err, db)
		{
            if (err)
			{
                return false;
            }else 
			{
                var collection = db.collection(collectionName);
				collection.update(query, {$inc: incValue,$set: setData}, {upsert: true});

            }
        });
	}
	
	this.updateUniqueDataInList = function(collectionName,query,listData)
	{
	    this.connectDatabase( function (err, db)
		{
            if (err)
			{
                return false;
            }else 
			{
                var collection = db.collection(collectionName);
				collection.update(query,{$addToSet: listData},{ upsert: true});

            }
        });
	}
	
	this.removeDataInList = function(collectionName,query,listData)
	{
	    this.connectDatabase( function (err, db) 
		{
            if (err)
			{
                return false;
            }else 
			{
                var collection = db.collection(collectionName);
				collection.update(query,{$pull: listData},{ upsert: false});

            }
        });
	}

	this.getDistinctDataList = function(collectionName,field,callback)
	{
	    this.connectDatabase(function (err, db)
	    {
	            if (err) {

	                callback(null);
	            }
	            var collection = db.collection(collectionName);
	            // not sure where the dom value comes from ?
	            collection.distinct(field, function (err, result)
	            {
	                if (err) {

	                    callback(null);
	                } else
	                {
	                    
	                    // call the callback here (err as the first parameter, and the value as the second)
	                    callback(result);

	                }

	                
	            });
	     });
	};
	
	

	this.insertDocument = function (collectionName, JsonData,callBack) {
	    // Use connect method to connect to the Server
	    this.connectDatabase(function (err, db) {
	        if (err) {

	            callBack(1);
	        } else {

	            var collection = db.collection(collectionName);
				try{
					collection.insert(JsonData, function (errData, result) {

						if (callBack == null)
							return;
							
						if (errData)
						{
							if(errData.message.indexOf("11000") != -1)
							{
								
								return callBack(2);
							}
							
							return callBack(1);
						} else
						{
							callBack(null);

						}

					});
				}
				catch(e)
				{
					if(e.message.indexOf("11000") != -1 || callBack!= null)
					{
						callBack(2);
					}
				}



	        }
	    });
	}

	this.insertOneDocument = function (collectionName, JsonData,callback) {
        // Use connect method to connect to the Server
        this.connectDatabase( function (err, db) {
            if (err) {

                return false;
            } else {



                var collection = db.collection(collectionName);
				JsonData['_id'] = mongodb.ObjectID();
				
				collection.insert(JsonData, function (err, result)
				{
                    if (err) {

						callback(null, null);
                    } else {
                     

                    }
									
					callback(null, result);
                });
				
				

            }
        });
    }
	
	this.removeOneDocument = function (collectionName,query) 
	{
        // Use connect method to connect to the Server
        this.connectDatabase( function (err, db) 
		{
            if (err) 
			{

                return false;
            }else 
			{


                var collection = db.collection(collectionName);
				
                collection.remove(query,{justOne : true} );
            }
        });
	};

	this.removeCollection = function (collectionName, callback) {

	    this.connectDatabase( function (err, db) {

	        if (err) {

	            callback(1);
	        }
	        else {

	            db.dropCollection(collectionName, function (err, result) {
	                callback(err);
	            });
	        }
	    });
	};

	this.removeDocument = function (collectionName,query,callback) 
	{
        // Use connect method to connect to the Server
        this.connectDatabase( function (err, db) 
		{
            if (err) 
			{

                return false;
            }else 
			{


                var collection = db.collection(collectionName);
				
                collection.remove(query, function(err, result)
				{
                    if (err)
					{

                    } else
					{
                       

                    }


					callback(null, result);
                });

            }
        });
	};

	this.updateDocument = function (collectionName, query, JsonData,callBack) {
	    // Use connect method to connect to the Server
	    this.connectDatabase( function (err, db) {
	        if (err) {

	            callBack(1);
	        } else {
	            var collection = db.collection(collectionName);
	            collection.update(query, { $set: JsonData }, function (err, result)
	            {
	                if (err)
	                {
	                    callBack(1);
	                }
	                else
	                {
	                    callBack(null);
	                }
	                
	                //callback(null, result);
	            });

	        }
	    });
    }
    
    this.insertOrUpdateDocument = function (collectionName, query, JsonData, callBack) {
	    // Use connect method to connect to the Server
	    this.connectDatabase( function (err, db) {
	        if (err) {

	            callBack(1);
	        } else {
	            var collection = db.collection(collectionName);
	            collection.update(query, { $set: JsonData }, { upsert: true }, function (err, result)
	            {
	                if (err)
	                {
	                    callBack(1);
	                } else {
	                    callBack(null);
	                }
	                
	                //callback(null, result);
	            });

	        }
	    });
    }
    
    this.findOneAndUpdate = function (collectionName, query, JsonData, sortOption, callBack) {
	    // Use connect method to connect to the Server
	    this.connectDatabase( function (err, db) {
	        if (err) {

	            callBack(1);
	        } else {
	            var collection = db.collection(collectionName);
	            collection.findOneAndUpdate(query, { $set: JsonData }, { sort: sortOption }, function (err, result)
	            {
	                if (err)
	                {
	                    callBack(1, null);
	                } else {
	                    callBack(null,result);
	                }	                
	            });

	        }
	    });
	}
	
	this.updateDocumentField = function (collectionName,query,field) {
        // Use connect method to connect to the Server
        this.connectDatabase( function (err, db) {
            if (err)
			{

                return false;
            }else 
			{

                var collection = db.collection(collectionName);
			
				collection.update(query,{ $set:field}, function (err, result)
				{
                    if (err)
					{

                    } else 
					{
                 

						return true;
                    }
					
					//callback(null, result);
                });

            }
        });
    }

	this.getDocumentCountByCriteria = function (collectionName,query, callback)
	{
        this.connectDatabase( function (err, db) {
            if (err)
			{

			return null;
			}
            var collection = db.collection(collectionName);
            // not sure where the dom value comes from ?
            collection.count(query, function (err, count) 
			{
				if (err)
				{

               	}
                // call the callback here (err as the first parameter, and the value as the second)
                callback(null, count);
            });
        });
	};

	this.GetAllDocumentByCriteria = function (collectionName, excludeFields,query,limit,offset, callback) {
	    // Use connect method to connect to the Server
	    this.connectDatabase( function (err, db) {
	        if (err) {

	            return null;
	        } else {

	            var collection = db.collection(collectionName);

	            collection.find(query, excludeFields, { sort: { _id: -1 }, limit: limit, skip: offset }).toArray(function (err, result)
	            {
	                if (err)
	                {

	                } else if (result.length > 0)
	                {
	                    callback(null, result);
	                } else
	                {
	                    callback(null, []);
	                }

	            });
	        }
	    });
	}

	
	this.GetDocumentByCriteria = function (collectionName, index,query,callback) 
	{
        // Use connect method to connect to the Server
        this.connectDatabase( function (err, db)
		{
            if (err) {

                return null;
            } else {
				
                var collection = db.collection(collectionName);
				
                collection.find(query ,{ sort: { _id : -1 }}).toArray(function (err, result)
                {
					if (err) {

                    } else if (result.length && result[index]!= null)
                    {
					

						callback( null, result[index]);
                    } else {

						callback(1, null);
                    }

                });
            }
        });
    }


    this.getDocumentCount = function (collectionName, callback) {
        this.connectDatabase( function (err, db) {
            if (err)
			{

			return null;
			}
            var collection = db.collection(collectionName);
            // not sure where the dom value comes from ?
            collection.count({}, function (err, count)
            {
				if (err)
				{

               	}

                // call the callback here (err as the first parameter, and the value as the second)
                callback(null, count);
            });
        });
    };


    this.GetFilteredDocumentSorted = function (collectionName, query, excludFields,sortOptions,limitRecords,skipRecords,callback) {
        // Use connect method to connect to the Server
        this.connectDatabase( function (err, db) {
            if (err) {
                callback(1, null);
            }
            else {
                var doc = null;
               

                var collection = db.collection(collectionName);
                var options = {};
                if (sortOptions != null)
                    options.sort = sortOptions;
                else
                    options.sort = { _id: -1 };

                collection.find(query, excludFields).limit(limitRecords).skip(skipRecords).sort(sortOptions).toArray(function (err, result) {

                    if (err) {
                        callback(1, null);
                    }
                    else  {
                        callback(null, result);
                    }
                });
            }
        });
    }

	
    this.GetFilteredDocument = function (collectionName, query, fields, callback) {

        this.GetFilteredDocumentSorted(collectionName, query, fields, null, callback);
        // Use connect method to connect to the Server
        //this.connectDatabase( function (err, db)
        //{
        //    if (err)
        //    {
        //        callback(1,null);
        //    }
        //    else
        //    {
        //        var doc = null;




        //        var collection = db.collection(collectionName);
        //        collection.find(query, fields, { sort: { _id: -1 } }).toArray(function (err, result)
        //        {
        //            if (err)
        //            {
        //                callback(1,null);
        //            }
        //            else if (result.length)
        //            {
        //                callback(null, result);
        //            } 
        //        });
        //    }
        //});
    }

		
	this.GetSelectedFields = function (collectionName,query,fields,callback) 
	{
        // Use connect method to connect to the Server
        this.connectDatabase( function (err, db) 
		{
            if (err) 
			{

                return null;
            } else 
			{
                var doc = null;
    

                var collection = db.collection(collectionName);
                collection.find(query, fields,{ sort: { _id : -1 }}).toArray(function (err, result)
                {
					if (err) {

                    } else if (result.length )
                    {
			
						callback( null, result);
                    } else {
						callback(new Error("No Data found"), null);
                    }


                });


            }
        });
    }

    this.GetDocument = function (collectionName, index,callback) 
	{
        // Use connect method to connect to the Server
        this.connectDatabase( function (err, db) {
            if (err) {

                return null;
            } else {
                var doc = null;
     

                var collection = db.collection(collectionName);
                collection.find().toArray(function (err, result)
                {
					if (err) {

                    } else if (result.length && result[index]!= null)
                    {
		
						callback( null, result[index]);
                    } else {
						callback(new Error("No Data found"), null);
                    }

                   

                });


            }
        });
    }
	
	
	this.GetDocuments = function (collectionName, callback) 
	{
        // Use connect method to connect to the Server
        this.connectDatabase( function (err, db) {
            if (err) {

                return null;
            } else {
                var doc = null;
                
                var collection = db.collection(collectionName);
                collection.find().toArray(function (err, result)
                {
					if (err) {

                    } else if (result.length && result!= null)
                    {
						callback( null, result);
                    } else {
						callback(new Error("No Data found"), null);
                    }


                });


            }
        });
    }
	
	this.GetAllDocument = function (collectionName, query,fields,callback) 
	{
        // Use connect method to connect to the Server
        this.connectDatabase( function (err, db)
		{
            if (err) 
			{

                callback( null);
            } else
			{
                var doc = null;
      
		        var collection = db.collection(collectionName);
				collection.find(query,{fields: [fields] }).toArray(function (err, result)
				{
					if (err) 
					{

						callback( null);
						
                    } else if (result.length && result!= null)
                    {
		         
						callback( result);
                    } else {
						callback(null);
                    }

                    

                });


            }
        });
    }

    this.GetDocumentByName = function (collectionName, query,callback) {
        // Use connect method to connect to the Server
        this.connectDatabase( function (err, db) {
            if (err) {

                return null;
            } else {
				
                var collection = db.collection(collectionName);
			
                collection.findOne(query, function (err, item)
                {
                    if (err)
					{

                    } else
                    {
                    
						callback(null, JSON.parse(JSON.stringify(item)));
                    }

                });
            }
        });
    }
	
	
	this.createUniqueIndex = function (collectionName, indexesClass,callback) 
	{
        // Use connect method to connect to the Server
        this.connectDatabase( function (err, db) 
		{
            if (err) {

                return null;
            } else 
			{
                
                var collection = db.collection(collectionName);
				collection.createIndex(indexesClass, { unique: true },function (err,nameIndex)
				{
                    if (err) {
						callback(1,null);
                    } 
					else
                    {
						callback(null,nameIndex);
                    }

                });
            }
        });
    }

    this.GetDocumentsGroupBy = function (collectionName, groupByField, callback) 
	{
        // Use connect method to connect to the Server
        this.connectDatabase( function (err, db) {
            if (err) {

                return null;
            } else {
                var doc = null;
                
                var collection = db.collection(collectionName);
                collection.aggregate([
                    {$match: {}},
                    {$group:
                      {_id: '$' + groupByField, records: { $push: "$$ROOT"}, "count": {$sum: 1} }
                    }
                ]).toArray(function (err, result)
                {
					if (err) {

                    } else if (result.length && result!= null)
                    {
						callback( null, result);
                    } else {
						callback(new Error("No Data found"), null);
                    }


                });
            }
        });
    }
	

	this.IsDocumentExist = function (collectionName, query,callback) 
	{
        // Use connect method to connect to the Server
        this.connectDatabase( function (err, db) 
		{
            if (err) {

                return null;
            } else 
			{

				
                
                var collection = db.collection(collectionName);
				collection.findOne(query, function (err, item)
				{
                    if (err) {

						callback(null, "database error");
                    } else
                    {
                      
						var response="success";
						if(item == null)
						{
							response = "failure" 
						}
						callback(null, response);
                    }

                });
            }
        });
    }



}


// export the class
module.exports =
 {
     DatabaseHandler
 };
