from django.conf.urls import patterns, include, url

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
    # Examples:
    # url(r'^$', 'mysite.views.home', name='home'),
    # url(r'^mysite/', include('mysite.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
