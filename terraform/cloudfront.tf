resource "aws_cloudfront_origin_access_control" "fittrek_s3" {
  name                              = "fittrek-s3-oac"
  description                       = "CloudFront access to Fittrek S3 bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "fittrek" {
  enabled = true

  origin {
    domain_name              = aws_s3_bucket.fittrek_assets.bucket_regional_domain_name
    origin_id                = "fittrek-s3"
    origin_access_control_id = aws_cloudfront_origin_access_control.fittrek_s3.id
  }

  default_cache_behavior {
    allowed_methods = ["GET", "HEAD"]
    cached_methods  = ["GET", "HEAD"]

    target_origin_id       = "fittrek-s3"
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
data "aws_iam_policy_document" "fittrek_s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.fittrek_assets.arn}/*"]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.fittrek.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "fittrek_s3" {
  bucket = aws_s3_bucket.fittrek_assets.id
  policy = data.aws_iam_policy_document.fittrek_s3_policy.json
}
