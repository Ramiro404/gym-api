const boom = require('@hapi/boom');
const {config } = require('./../config/config')
function checkApiKey(req,res,next){
  const apiKey = req.headers["api"];
  if(apiKey === config.apiKey){
     next();
  }
  next(boom.unauthorized());
}

function checkAdminRole(req,res,next){
  const user=req.user;
  if(user.role === 'admin'){
      next();
  } else{
      next(boom.forbidden('You are not allowed to perform this action'));
  }
}

function checkRoles(...roles){
    return (req,res,next)=>{
        const user = req.user;
        if(roles.includes(user.role)){
            next();
        } else{
            next(boom.forbidden('You are not allowed to perform this action'));
        }
    }
}
/**
 * Se recomienda utilizar la librería accesscontrol
 * donde realmente y de forma explicita se gestionan
 * permisos de una forma más profunda y avanzada.
 */

module.exports = { checkApiKey, checkAdminRole,checkRoles}
