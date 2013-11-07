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

Deploying (for now really simple, but this will ultimately be automated):
  - cp src/resources/urls.py target/mysite/mysite/
  - Edit the urls file with the current paths
  - cp src/python/recipe.py target/mysite/mysite
  - cp src/resources/settings.py to target/mysite/mysite

Building the ingredient list:
- To generate the JSON object from the original CSV, run the /python script
on /resources/ingredients.csv
