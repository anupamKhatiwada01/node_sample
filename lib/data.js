// Library for storing and editing data

// Dependencies
const fs = require('fs');
const path = require('path');

// The library to export
const lib = {};

lib.baseDir = path.join(__dirname,'/../.data/');
// console.log(__dirname)

// Function to create a file
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

// Read data from file
lib.read = function(dir,file,callback){


    fs.readFile(lib.baseDir+dir+'/'+file+'.json','utf8',function(error,data){
        callback(error,data);
    })


}


// Update data in file
lib.update = function(dir,file,data,callback){
    // Open the file for writing
    fs.open(lib.baseDir+dir+'/'+file+'.json','r+',function(error,fileDescriptor){
        if(!error && fileDescriptor){
            
            const stringData = JSON.stringify(data);
            
            // Truncate the file 
            fs.truncate(fileDescriptor,function(err){
                if(!err){
                    // Write to the file and close it
                    fs.writeFile(fileDescriptor,stringData,function(err){
                        if(!error){
                            fs.close(fileDescriptor,function(err){
                                if(!err){
                                    callback(false);
                                } else callback("Error closing file.")
                            })
                        }else callback("Error writing to existing file.");
                    })
                }else callback('Error truncating file.');
            })


        }else callback("Could not open the file for updating. It does not exist yet.");
    })
}



lib.delete = function(dir,file,callback){
    fs.unlink(lib.baseDir+dir+'/'+file+'.json',function(err){
        if(!err) callback(false);
        else callback("There was a problem deleting the file.");
    })
}






module.exports = lib;
