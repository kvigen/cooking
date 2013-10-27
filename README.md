This project is a cooking website that lets you manage recipes and gives you
chemistry-based advice on how to improve them.


Setup:
- Install django:
  - Right now using tar from https://www.djangoproject.com/download/
  - Extract and install it anywhere
  - Run 'django-admin.py startproject mysite' in the target directory under
     cooking (not the ideal thing, but will work for now). For more info
     see (https://docs.djangoproject.com/en/1.5/intro/tutorial01/)
  - Run the server: 'python manage.py runserver 0.0.0.0:80'
  - Disable the linux firewall (had to do this at least once)
    - yum install system-config-firewall
    - system-config-firewall

Deploying (for now really simple, but we will improve it):
  - cp src/resources/urls.py target/mysite/mysite/
  - Edit this file with the current paths
