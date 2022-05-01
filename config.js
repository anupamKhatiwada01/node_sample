// Lets define a couple of environments which will be production and staging
const environments = {}
// Each environment will have two properties, port and envName
environments.production = {
  'port':5000,
  'envName':'production'
}

environments.staging = {
  'port':3000,
  'envName':'staging'
}

// We need to first check what environment is being asked for and if nothing is asked we take staging to be the default environment

// To know what is being asked we need to check the command that was issued to start the node server
const askedEnv = process.env.NODE_ENV;
const chosenEnv = environments[askedEnv]?environments[askedEnv]:environments.staging;


module.exports = chosenEnv;



