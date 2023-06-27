// Copyright (c) Microsoft.
// Licensed under the MIT license.

import { Client } from '@microsoft/microsoft-graph-client';
import { GraphAuthProvider } from './GraphAuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Set the authProvider to an instance
// of GraphAuthProvider
const clientOptions = {
  authProvider: new GraphAuthProvider(),
};

// Initialize the client
const graphClient = Client.initWithMiddleware(clientOptions);

export class GraphManager {
  static getUserAsync = async () => {
    // GET /me
    return await graphClient
      .api('/me')
      .select('displayName,givenName,mail,userPrincipalName')
      .get();
  };



}

export let Cli= Client.initWithMiddleware(clientOptions);


// export class GraphInit {

//   static getInit = async () => {
//     let token= await AsyncStorage.getItem("userToken")
//     //console.log("TOKENSSSSSS:",token)
//     return await  Client.init({
//       authProvider: (done) => {
//         done(null, "eyJ0eXAiOiJKV1QiLCJub25jZSI6Ik92WXVNT0FveTRZcS02VFptQl83OWxucHFuSXpVeDJqd2ZIdFNpcGlvLVEiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kNzA2MGJjYy1iYjI2LTQ3MDgtYTkxZC04ODM2MmE4NmFlMzUvIiwiaWF0IjoxNjg0MjYzNzI4LCJuYmYiOjE2ODQyNjM3MjgsImV4cCI6MTY4NDI2ODE0OCwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQUhrTERxQlhDMDRMS0d6bEtpNzFOV0MrZkt4cS9uTFJvQkxRcDFwcEh1OFd4dUcySXY3VDcyQzNsQUhYOGttTlAiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IkZvdG9FeGl0bzEiLCJhcHBpZCI6ImU4YjBkZmQxLTMwNDEtNDkzZS1iZTI0LWY4YTU1YzVlZjM3ZSIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoicGVyZXoiLCJnaXZlbl9uYW1lIjoiTHVpcyBQZXJleiIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjE5MS45OS4xNTEuMTEzIiwibmFtZSI6Ikx1aXMgUGVyZXogRTEgVXN1YXJpb3MgRmljdGljaW8iLCJvaWQiOiI2ZDlkODZhOC03NDM0LTQ3MTctOThmNC0wZTQ0OGQzNGM4ZjkiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtNTE4NzE2MTc0LTQwNTkxNDU0NzgtMTEzMzU0MDY5OC0yODk3OSIsInBsYXRmIjoiMSIsInB1aWQiOiIxMDAzN0ZGRTlCMkU1NEI2IiwicmgiOiIwLkFRb0F6QXNHMXlhN0NFZXBIWWcyS29hdU5RTUFBQUFBQUFBQXdBQUFBQUFBQUFBS0FCTS4iLCJzY3AiOiJDYWxlbmRhcnMuUmVhZFdyaXRlIE1haWxib3hTZXR0aW5ncy5SZWFkIG9wZW5pZCBwcm9maWxlIFVzZXIuUmVhZCBlbWFpbCIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6IkR1YU9mODduUHAzVHNCTi11OWxPS2p0TkZVWC10LUxEQl80U0l6azd2VmciLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiU0EiLCJ0aWQiOiJkNzA2MGJjYy1iYjI2LTQ3MDgtYTkxZC04ODM2MmE4NmFlMzUiLCJ1bmlxdWVfbmFtZSI6ImxwZXJlekBtb2Rlcm5hLmNvbS5lYyIsInVwbiI6ImxwZXJlekBtb2Rlcm5hLmNvbS5lYyIsInV0aSI6Im4xOGVPUjhKOUVhSzBLYU1JVVVxQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjRhNWQ4ZjY1LTQxZGEtNGRlNC04OTY4LWUwMzViNjUzMzljZiIsImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfc3QiOnsic3ViIjoiWlRMQmtiNUU2NEE4cndBYTQ2aW9feW9BY1pxMVlEZmg4ckJKMmYwV2MzcyJ9LCJ4bXNfdGNkdCI6MTQzODM1NzM5OX0.Yi-pmQhjSZic4aDqSO24tLf61BnNeT-F-j26IniEIL3fVls9aDFmHQZ5VC0AUNERzcp8rzOYiM6hP7O6eixMpwf9gfz2fee5ieftHQyhbB1UuIA_1pGZuQqwCoM3I2XEkPD49_wmNnfCbd5hMrDC_sgH-0B15--3PBkabre_vshLMyEyHszhVyHcNZ2LNf-jBUFbjkEfnHQaue5kzVG8ohcbDkNzyJxcG3mszbTooFbfRoUHtfNyu4_HdGk0aGpKygugF7Y4sRMhx0LGfinBhpV2dFE8iVKtyDVwiehZ14M5WF0NBenJaxmM18NwHM8Q38zkps3F7ZfcN7E-Kc_-8g");
//       },
//     });
//   }
// }
