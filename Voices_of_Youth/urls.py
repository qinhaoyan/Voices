"""Voices_of_Youth URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from article import views
from django.views.static import serve
from django.conf import settings

urlpatterns = [
    url(r'^static/(?P<path>.*)/$', serve, {"document_root": settings.STATIC_ROOT}),   #在debug为false时   static文件的url
    url(r'^media/(?P<path>.*)/$', serve, {"document_root": settings.MEDIA_ROOT}),     #在debug为false时   media文件的url
    url(r'^admin/', admin.site.urls),
    url(r'^$',views.home),
    url(r'^login$',views.login),
    url(r'^alogin',views.alogin),
    url(r'^register$',views.register),
    url(r'^loginout$',views.loginout),
    url(r'^message$',views.message),
    url(r'^publish$',views.publish),
    url(r'^mine$',views.mine),
    url(r'^publish_article',views.publish_article),
    url(r'^mypublish',views.my_publish),
    url(r'^getmypublish',views.getmy_publish),
    url(r'^article/(.*)',views.article),
    url(r'^comment',views.comment),
    url(r'^gethome',views.gethome),
    url(r'^like',views.like),
    url(r'^isyou',views.isyou),
    url(r'^soveld',views.soveld),
    url(r'^getmessage',views.getmessage),
]
	