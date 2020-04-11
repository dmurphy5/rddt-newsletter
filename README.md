# rddt-newsletter
reddit newsletter for a code challenge

### NOTE: You will need a config file in order to run locally.  Email xdylanmurphyx@gmail.com for info.

## How to run
`npm install && npm start` will install all packages and run the app at localhost:7000

## API routes
#### All routes are behind localhost:7000/api

| URL                             | Method | Payload                    | Response                                                              |   |
|---------------------------------|--------|----------------------------|-----------------------------------------------------------------------|---|
| /users                          | GET    |                            | Returns all users                                                     |   |
| /users/:email                   | GET    |                            | Returns data for a specific user by email                             |   |
| /users/:email                   | POST   | {  subreddits: [String]  } | Creates a new user account.  Saves subreddits if provided in payload. |   |
| /users/:email/subreddits        | POST   | {  subreddits: [String] }  | Replaces users subreddits with subreddits in payload.                 |   |
| /users/:email/subreddits/add    | PATCH  | {  subreddits: [String] }  | Adds subreddits in payload to existing subreddits                     |   |
| /users/:email/subreddits/remove | PATCH  | {  subreddits: [String] }  | Removes subreddits in payload from existing subreddits                |   |
| /users/:email/subscribe         | POST   |                            | Sets users newsletter status to active                                |   |
| /users/:email/unsubscribe       | POST   |                            | Sets users newsletter status to inactive                              |   |
| /users/:email                   | DELETE |                            | Deletes a user                                                        |   |
