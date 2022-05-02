// Library for storing and editing data

// Dependencies
const fs = require('fs');
const path = require('path');

// The library to export
const lib = {};

lib.baseDir = path.join(__dirname,'/../.data/');
console.log(__dirname)


lib.create = function(dir,file,data,callback){

    fs.open(lib.baseDir+dir+"/"+file+".json",'wx',function(error,fileDescriptor){

        if(!error && fileDescriptor){
            console.log("This is the file descriptor:",fileDescriptor);
            // We need to convert the data being fed in into string
            const stringData = JSON.stringify(data);
            fs.writeFile(fileDescriptor,stringData,function(err){
                if(!err){
                    fs.close(fileDescriptor,function(err){
                        if(!error){
                            callback(false);
                        }else{
                            callback("Error closing new file");
                        }
                    })
                }else{
                    callback("Error writing to new file");
                }
            })
        }else{
            console.log("This is the error",error);
            callback("Could not create a new file, it may alreasy exist.");
        }
        

    })


}

module.exports = lib;
