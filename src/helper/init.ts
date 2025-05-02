const fs=require('fs');
try{
fs.ensureDir("reports");
fs.emptyDir("reports");
}catch (error){
    console.log("Folder not created"+error);
}