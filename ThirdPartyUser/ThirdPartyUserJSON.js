var DatabaseHandlerModule = require('../DatabaseHandler.js')
var dbInstance = new DatabaseHandlerModule.DatabaseHandler()


function thirdPartyUserJSON(){

this.thirdPartyUsers=[];
var myInstance=this
this.initArray= function(){
    dbInstance.GetDocuments('ThirdPartyUsers',function(err,result){
        myInstance.thirdPartyUsers=result;
    })

}

this.resetCounter=function(){
    var i=[];
    console.log("entered thirdpartyuserjson reset coutner")
    dbInstance.updateDocuments('ThirdPartyUsers',{},{"counter":[0,0,0,0]},function(err,result){
        console.log("result",result)
        // for (i in result){
        //     result[i].counter=[0,0,0,0]
        //     console.log("i",result)
        // }
    })
        
    }
}



module.exports={
    thirdPartyUserJSON
}