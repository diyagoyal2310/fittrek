terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  region = "ap-south-1"
}

# Use an existing VPC.
# We are NOT creating a new VPC because the account has reached its VPC limit.
data "aws_vpc" "existing" {
  default = true
}
data "aws_subnets" "existing" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.existing.id]
  }
}
resource "aws_security_group" "fittrek_sg" {
  name        = "fittrek-security-group"
  description = "Security group for Fittrek application"
  vpc_id      = data.aws_vpc.existing.id

  ingress {
    description = "HTTP"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
resource "aws_instance" "fittrek" {
  ami           = "ami-0f918f7e67a3323f0"
  instance_type = "t3.micro"
  key_name      = "main-key"

  subnet_id = data.aws_subnets.existing.ids[0]

  vpc_security_group_ids = [
    aws_security_group.fittrek_sg.id
  ]

  user_data = <<-EOF
              #!/bin/bash

              apt-get update -y

              curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
              apt-get install -y nodejs git

              node -v
              npm -v
              EOF

  tags = {
    Name = "fittrek-server"
  }
}
