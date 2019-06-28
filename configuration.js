const mongodb = {
    development: {
        /**
         * Development Database
         * here "test" after "/" is database name
         */
        url: "mongodb://localhost:27017/test"
    },
    production: {
        /**
         * Production Database
         */
        url: 'your-production-database-url'
    }
}

module.exports = mongodb

/**
 * write desired database name instead of test
 * mongodb will automatically create that database in localhost if it doesn't exist already
 */