output "s3_bucket_name" {
  value = aws_s3_bucket.fittrek_assets.bucket
}

output "cloudfront_url" {
  value = "https://${aws_cloudfront_distribution.fittrek.domain_name}"
}
