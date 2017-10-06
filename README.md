# Unit Tests

A sample of unit tests for each slice of the NERDS stack. Try to pass them all! Solutions included.


# To run:

Setup a testing db, preferably using postgreSQL:
```
psql
(in psql shell): CREATE DATABASE expresstests;
```

Then install NPM dependencies and you're good to go:

```
npm i
npm t
```

If you'd prefer to run one set of tests at a time...
```
npm run test-frontend
npm run test-db
npm rubn test-routes
```
