export default {
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-dev-bucket"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://koplkqzqbd.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_Ci4TQFG78",
    APP_CLIENT_ID: "3l1l81auk2ips2k4hmvlct5joh",
    IDENTITY_POOL_ID: "us-east-1:0cc40c8d-8d6f-49d1-b5ae-b9089b44da29"
  }
}