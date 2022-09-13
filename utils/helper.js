module.exports = {
  truncate: (string)=>{
    if (!string){
      return null;
    }
    return string.substring(0,100);
  },
};