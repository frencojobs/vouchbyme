const buckets = ['vouchedbyme80bc3466fb0848498adf85f3950f9b87234407-dev']

module.exports = {
  images: {
    domains: [
      'localhost',
      ...buckets.map((bucket) => `${bucket}.s3.us-east-1.amazonaws.com`),
    ],
  },
}
