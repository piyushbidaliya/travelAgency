"""URL configuration for backend project."""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/vehicles/', include('apps.vehicles.urls')),
    path('api/guides/', include('apps.guides.urls')),
    path('api/languages/', include('apps.languages.urls')),
    path('api/inquiries/', include('apps.inquiries.urls')),
    path('api/currency/', include('apps.currency.urls')),
    path('api/testimonials/', include('apps.testimonials.urls')),
    path('api/faqs/', include('apps.faqs.urls')),
    path('api/settings/', include('apps.website_settings.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
