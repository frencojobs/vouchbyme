const host = 'd2mylahvc7nc1a.cloudfront.net'
const buckets = ['vouchedbyme80bc3466fb0848498adf85f3950f9b87234407-dev']

module.exports = {
  images: {
    domains: [
      'localhost',
      host,
      ...buckets.map((bucket) => `${bucket}.s3.us-east-1.amazonaws.com`),
    ],
  },
}
