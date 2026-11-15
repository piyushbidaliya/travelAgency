from rest_framework import generics, status
from rest_framework.response import Response
from .models import Inquiry
from .serializers import InquiryCreateSerializer

class InquiryCreateView(generics.CreateAPIView):
    queryset = Inquiry.objects.all()
    serializer_class = InquiryCreateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        inquiry = serializer.save()
        return Response({
            'success': True,
            'reference_code': inquiry.reference_code,
            'message': 'Your inquiry has been successfully received. Our India travel specialist will contact you within 24 hours.'
        }, status=status.HTTP_201_CREATED)
