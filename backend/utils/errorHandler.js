class ErrorHandler extends Error{
  constructor(message,status){
     super(message)
     this.status = status;
     Error.captureStackTrace(this,this.constructor)  // snapshot leta h , sequence btata h error ka ki kb kyi or kaha aui
  }
 
}

export {ErrorHandler};