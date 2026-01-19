provider "aws" {
  region = "us-east-1" 
}

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical (dueños de Ubuntu)

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
}

# FIREWALL (Security Group)
resource "aws_security_group" "sg_agenda" {
  name        = "sg_agenda_multicloud"
  description = "Permitir trafico HTTP"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
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

# LA MÁQUINA VIRTUAL (VM B)
resource "aws_instance" "vm_b" {
  ami           = data.aws_ami.ubuntu.id  # Usa el ID que encuentre el buscador
  instance_type = "t3.micro"
  vpc_security_group_ids = [aws_security_group.sg_agenda.id]

  tags = {
    Name = "AgendaPro-AWS-VM-B"
  }
}

output "ip_publica_aws" {
  value = aws_instance.vm_b.public_ip
}