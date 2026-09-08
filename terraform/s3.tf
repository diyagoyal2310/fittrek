resource "aws_s3_bucket" "fittrek_assets" {
  bucket_prefix = "fittrek-assets-"

  tags = {
    Name        = "Fittrek Assets"
    Project     = "Fittrek"
    Environment = "development"
  }
}

resource "aws_s3_bucket_public_access_block" "fittrek_assets" {
  bucket = aws_s3_bucket.fittrek_assets.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
