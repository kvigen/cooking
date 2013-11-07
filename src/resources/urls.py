from django.conf.urls import patterns, include, url

import recipe

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
# According to the docs this should only be used in development mode
# https://docs.djangoproject.com/en/1.2/howto/static-files/
(r'^html/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': '/home/kyle/myCode/cooking/src/html'}),
(r'^scripts/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': '/home/kyle/myCode/cooking/src/scripts'}),
(r'^css/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': '/home/kyle/myCode/cooking/src/css'}),
# For some reason /static doesn't seem to work...
(r'^static_json/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': '/home/kyle/myCode/cooking/src/static'}),
url(r'recipe/(\w+)$', recipe.recipe_crud, name='recipe_crud')
)
