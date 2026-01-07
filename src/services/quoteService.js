import Quote from '../models/Quotes.js'

export default {
    createQuote(quoteText) {
        return Quote.create(quoteText);
    },
    getRandomQuote() {
        return Quote.aggregate([
            { $sample: { size: 1 } }
        ])
    }
}