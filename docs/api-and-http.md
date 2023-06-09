# API & HTTP

## API SDK
The project is using Aspida with Axios for generating API SDK. With the help of Aspida, the API SDK is properly typed so you can expect a better IDE autosuggestion.

The API SDK is located at the ~~/api directory.
Create directories inside ~~/api directory same as the endpoint and define the methods there. Once done, run `yarn api:build` and simply use it with the `useApi()` composable which is availble anywhere because it has support for auto import.


## HTTP 
Axios is configured as a service for internal API calls. It is located at the 
