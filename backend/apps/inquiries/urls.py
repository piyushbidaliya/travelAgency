from django.urls import path
from .views import InquiryCreateView, ContactSubmissionView

urlpatterns = [
    path('', InquiryCreateView.as_view(), name='inquiry-create'),
    path('contact/', ContactSubmissionView.as_view(), name='inquiry-contact'),
]
